#!/usr/bin/env python3

from bottle import hook, run, get, post, request, response,  abort, delete

import os
import json
import dateparser
from datetime import datetime
import random
import uuid
import time
import argparse
from newsapi import NewsApiClient
import feedparser
import requests
from html.parser import HTMLParser


class FeedHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.data = None

    def handle_data(self, data):
        self.data = data


news_client = None
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


all_feeds = [
    'https://www.nachdenkseiten.de/?feed=rss2',
    'https://norberthaering.de/en/feed/',
    'https://feeds.feedburner.com/feedburner/ZYYQ',
    'https://makroskop.eu/feed/',
    'https://news.ycombinator.com/rss',
    'https://www.heise.de/tp/news-atom.xml',
    'https://feeds2.feedburner.com/wmo/apqD',
    'https://www.lobbycontrol.de/feed/',
    'https://www.cicero.de/rss.xml',
    'https://www.theverge.com/rss/index.xml',
    'https://www.infosperber.ch/inc/rss.cfm?id=106',
    'https://theintercept.com/feed/?lang=en'
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


def _transform_feed(parsed_feed):
    try:
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
        print("Could not transform feed: ", error)
        return []


@get('/api/headlines')
def get_headlines():
    global news_client
    query_params = request.query
    query = query_params.get('q')
    country = query_params.get('country', 'de')
    language = query_params.get('language', 'de')
    try:
        headlines = news_client.get_top_headlines(
            q=query, country=country, language=language)
        return headlines
    except Exception as error:
        print("Error while fetching headlines: ", error)
        abort(500, "Could not fetch headlines")


@get('/api/sources')
def get_sources():
    global news_client
    try:
        return news_client.get_sources(country='de')
    except Exception as error:
        print("Could not fetch sources: ", error)
        abort(500, "Could not fetch sources")


@get('/api/feeds')
def get_feeds():
    all_entries = []
    try:
        for feed in all_feeds:
            try:
                tmp = _transform_feed(feedparser.parse(feed))
                all_entries.extend(tmp)
            except Exception as error:
                print(f'Feed {feed} could not be parsed correctly: ', error)
        all_entries.sort(key=lambda entry:
                         _parse_date(entry['published']), reverse=True)
        return {
            'count': len(all_entries),
            'entries': all_entries
        }
    except Exception as error:
        print("Could not read all feeds: ", error)
        abort(500, "Could not fetch all feeds")


@get('/api/feed')
def get_feed():
    query_params = request.query
    feed_url = query_params.get('feed_url')
    try:
        all_entries = _transform_feed(feedparser.parse(feed_url))
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
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", default=5000)
    args = parser.parse_args()
    try:
        news_client = NewsApiClient(api_key=os.environ.get(
            'NEWS_API_KEY', '3e8fa870c789473db6f68b03586d1f9d'))
    except:
        print("Error while initializing news client. Fix this!!!")

    run(port=int(os.environ.get('PORT', args.port)), host=args.host)
