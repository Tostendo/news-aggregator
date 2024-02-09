#!/usr/bin/env python3

from bottle import hook, run, get, post, request, response,  abort

import os
from dotenv import load_dotenv
import json
import dateparser
from datetime import datetime
import uuid
import time
import sys
import feedparser
import requests
import multiprocessing as mp
from html.parser import HTMLParser

import pymongo
from pymongo.errors import OperationFailure

MAX_NUMBER_TRIES = 4

db_client = None

feed_map = {}


def init_db():
    global db_client
    load_dotenv()
    connect_string = os.environ.get(
        'MONGO_DB_CONNECT_URL', 'wrong-url')
    db_client = pymongo.MongoClient(connect_string)
    for i in range(0, MAX_NUMBER_TRIES):
        try:
            db_client.list_database_names()
            print('Data Base Connection Established........')
            break
        except OperationFailure as err:
            print(f"Data Base Connection failed. Error: {err}")
            if i == MAX_NUMBER_TRIES - 1:
                print("Could not reach database. Exit.")
                sys.exit(1)
            time.sleep(1)
            continue


def timeit(method):

    def timed(*args, **kw):
        ts = time.time()
        result = method(*args, **kw)
        te = time.time()
        print('%r %2.2f sec' % (method.__name__, te-ts))
        return result
    return timed


class FeedHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.data = None

    def handle_data(self, data):
        self.data = data


my_parser = FeedHTMLParser()


@hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


all_feeds = []
if os.environ.get('SOURCES', None) is not None:
    all_feeds = json.loads(os.environ.get('SOURCES'))
else:
    all_feeds = [
        'https://www.nachdenkseiten.de/?feed=rss2',
        'https://www.eat-this.org/feed/',
        'https://nutritionstripped.com/feed/',
        'https://feeds.feedburner.com/feedburner/ZYYQ',
        'https://news.ycombinator.com/rss',
        'https://www.heise.de/tp/news-atom.xml',
        'https://feeds2.feedburner.com/wmo/apqD',
        'https://www.lobbycontrol.de/feed/',
        'https://theintercept.com/feed/?lang=en',
        'https://www.freitag.de/@@RSS',
        'https://krass-und-konkret.de/feed/'
    ]


def _parse_date(date_string):
    global my_parser
    date = dateparser.parse(date_string)
    if date is not None:
        return date.date()

    my_parser.feed(date_string)
    if date is not None:
        return date.date()

    return datetime.now().date()


def _transform_feed(feed_url):
    try:
        parsed_feed = feedparser.parse(feed_url)
        feed_name = dict(parsed_feed)['feed']['title']
        entries = [
            {
                'feed_name': feed_name,
                'title': entry.get('title', 'no_title'),
                'published': entry.get('published', None),
                'link': entry.get('link', None),
                'author': entry.get('author', None),
                'summary': entry.get('summary', None)

            } for entry in parsed_feed['entries']
        ]
        return entries
    except Exception as error:
        print("Could not transform feed: ", error, feed_url)
        return []


@post('/api/feeds/sources')
def create_feed_sources():
    postdata = json.loads(request.body.read())
    global db_client
    feeds_collection = db_client["news-aggregator"].feeds
    feeds_str = postdata["feeds"]
    if feeds_str is None or feeds_str == '':
        abort(400, "no feeds given")
    result = [x.strip() for x in feeds_str.split(',')]
    feed_id = uuid.uuid4()
    postdata["_id"] = str(feed_id)
    postdata["feeds"] = result
    try:
        mongo_id = feeds_collection.insert_one(postdata).inserted_id
        print("insert success " + mongo_id)
        feed_map[str(feed_id)] = result
        return {
            'feed_id': mongo_id
        }
    except Exception as err:
        print("Could not save feed: ", err)
        abort(500, "Could not save feed")


@post('/api/feeds/sources/<feed_id>')
def update_feed_sources(feed_id):
    updatedata = json.loads(request.body.read())
    global db_client
    feeds_collection = db_client["news-aggregator"].feeds
    feeds_str = updatedata["feeds"]
    if feeds_str is None or feeds_str == '':
        abort(400, "no feeds given")
    result = [x.strip() for x in feeds_str.split(',')]
    updatedata["_id"] = str(feed_id)
    updatedata["feeds"] = result
    try:
        feeds_collection.update_one(
            {'_id': feed_id}, {'$set': updatedata})
        print("patch success")
        feed_map[str(feed_id)] = result
        return {
            'feed_id': feed_id
        }
    except Exception as err:
        print("Could not update feed: ", err)
        abort(500, "Could not update feed")


@get('/api/feeds/sources/<feed_id>')
def get_feed_sources(feed_id):
    global db_client
    feeds_collection = db_client["news-aggregator"].feeds
    try:
        data = feeds_collection.find_one(
            {'_id': feed_id})
        print("get success")
        return data
    except Exception as err:
        print("Could not fetch feed: ", err)
        abort(500, "Could not fetch feed")


@get('/api/feeds/<feed_id>')
@timeit
def get_user_feeds(feed_id):
    global db_client
    all_entries = []
    pool = mp.Pool(mp.cpu_count())
    try:
        feeds_collection = db_client["news-aggregator"].feeds
        mongo_document = feeds_collection.find_one({"_id": feed_id})
        user_feeds = mongo_document["feeds"]
        if user_feeds is None or user_feeds == '':
            abort(404, "Could not find feeds for user.")
        results = pool.map(
            _transform_feed, [row for row in user_feeds])
        [all_entries.extend(one_result) for one_result in results]
        all_entries.sort(key=lambda entry:
                         _parse_date(entry['published']), reverse=True)
        return {
            'count': len(all_entries),
            'entries': all_entries,
            'sources': list(set([entry['feed_name'] for entry in all_entries])),
            'description': mongo_document['description'],
            'title': mongo_document['title']
        }
    except Exception as error:
        print("Could not read all user feeds: ", error)
        abort(500, "Could not fetch all feeds")
    finally:
        pool.close()


@get('/api/feeds')
@timeit
def get_feeds():
    all_entries = []
    pool = mp.Pool(mp.cpu_count())
    try:
        results = pool.map(
            _transform_feed, [row for row in all_feeds])
        [all_entries.extend(one_result) for one_result in results]
        all_entries.sort(key=lambda entry:
                         _parse_date(entry['published']), reverse=True)
        return {
            'count': len(all_entries),
            'entries': all_entries,
            'sources': list(set([entry['feed_name'] for entry in all_entries]))
        }
    except Exception as error:
        print("Could not read all feeds: ", error)
        abort(500, "Could not fetch all feeds")
    finally:
        pool.close()


@get('/api/feed')
def get_feed():
    query_params = request.query
    feed_url = query_params.get('feed_url')
    try:
        all_entries = _transform_feed(feed_url)
        return {
            'count': len(all_entries),
            'entries': all_entries
        }
    except Exception as error:
        print("Could not read feed: ", error)
        abort(500, "Could not fetch feed")


@get('/api/entertainment')
def get_entertainment():
    try:
        r = requests.get(
            'https://hamburg.mitvergnuegen.com/api/v1/posts/page/1')
        if r:
            data = list(
                map(lambda post: {'url': post['url'], 'title': post['title']}, r.json()['posts']))
            print(data)
            return {'data': data}
    except Exception as error:
        print("Could not read entertainment: ", error)
        abort(500, "Could not fetch entertainment")


@get('/api/events')
def get_events():
    try:
        r = requests.get(
            'https://ohschonhell.de/ajax/data_cache.php?load=initial&osh_page=hamburg')
        return r.json()
    except Exception as error:
        print("Could not read events: ", error)
        abort(500, "Could not fetch events")


if __name__ == "__main__":
    init_db()
    run(port=int(os.environ.get('PORT', 5000)), host=os.environ.get('HOST', '0.0.0.0'))

