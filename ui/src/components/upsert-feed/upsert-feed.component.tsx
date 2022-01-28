import { useState, useEffect } from "react";
import { withRouter } from "react-router";

import "./upsert-feed.style.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { getServerUrl } from "../../utils/server.utils";

interface UpsertProps {
  history: any;
  match?: any;
}

const UpsertFeed: React.FC<UpsertProps> = (props: UpsertProps) => {
  const [feeds, setFeeds] = useState("");
  const [feedTitle, setFeedTitle] = useState("");
  const [feedDescription, setFeedDescription] = useState("");

  useEffect(() => {
    if (props.match.params.feedId) {
      getData(props.match.params.feedId);
    } else {
      setFeeds("");
      setFeedDescription("");
    }
  }, [props.match.params.feedId]);

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
    if (props.match.params.feedId) {
      url += `/${props.match.params.feedId}`;
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
      .then((data) => props.history.push(`/feed/${data.feed_id}`))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="upsert-feed">
      <h1>{props.match.params.feedId ? "Update Feed" : "Create Feed"}</h1>
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

export default withRouter(UpsertFeed);
