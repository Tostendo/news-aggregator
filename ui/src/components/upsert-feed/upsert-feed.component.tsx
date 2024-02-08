import { useState, useEffect } from "react";

import "./upsert-feed.style.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { getServerUrl } from "../../utils/server.utils";
import { useNavigate, useParams } from "react-router-dom";

const UpsertFeed: React.FC = () => {
  const { feedId } = useParams();
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState("");
  const [feedTitle, setFeedTitle] = useState("");
  const [feedDescription, setFeedDescription] = useState("");

  useEffect(() => {
    if (feedId) {
      getData(feedId);
    } else {
      setFeeds("");
      setFeedDescription("");
    }
  }, [feedId]);

  const handleChange = (e: any) => {
    setFeeds(e.target.value);
  };

  const handleFeedDescriptionChange = (e: any) => {
    setFeedDescription(e.target.value);
  };

  const handleFeedTitleChange = (e: any) => {
    setFeedTitle(e.target.value);
  };

  const getData = (feedId: string) => {
    fetch(`${getServerUrl()}/api/feeds/sources/${feedId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFeeds(data.feeds.join(","));
        setFeedDescription(data.description || "");
        setFeedTitle(data.title || "");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const upsertData = () => {
    let url = `${getServerUrl()}/api/feeds/sources`;
    if (feedId) {
      url += `/${feedId}`;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        feeds: feeds,
        description: feedDescription,
        title: feedTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate(`/feed/${data.feed_id}`))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="upsert-feed">
      <h1>{feedId ? "Update Feed" : "Create Feed"}</h1>
      <label className="note">Feed title (optional)</label>
      <input onChange={handleFeedTitleChange} value={feedTitle} />
      <label className="note">Feed description (optional)</label>
      <textarea
        onChange={handleFeedDescriptionChange}
        rows={4}
        value={feedDescription}
      />
      <p className="note">
        Comma separated list of rss feeds. Save the resulting link to get back
        your feed any time.
      </p>
      <textarea onChange={handleChange} rows={10} value={feeds} />
      <CustomButton onClick={() => upsertData()}>Save</CustomButton>
    </div>
  );
};

export default UpsertFeed;
