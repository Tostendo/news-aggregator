import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServerUrl } from "../../utils/server.utils";
import "./feed-list.style.scss";

type FeedData = {
  id: string;
  title: string;
};

const FeedList = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const getAllFeeds = () => {
    const fetchUrl = `${getServerUrl()}/api/feeds`;
    const result = fetch(fetchUrl)
      .then((response) => response.json())
      .then((feeds) => {
        console.info(feeds);
        setFeeds(feeds.feeds);
      })
      .catch((err) => {
        console.error(err);
      });
    return result;
  };
  useEffect(() => {
    getAllFeeds();
  }, []);
  return (
    <div className="feed-list">
      <ul>
        {feeds.length &&
          feeds.map((feed) => {
            return (
              <li key={feed.id}>
                <Link to={`/feed/${feed.id}`}>{feed.title}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default FeedList;
