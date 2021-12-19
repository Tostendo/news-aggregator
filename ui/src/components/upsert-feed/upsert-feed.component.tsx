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

  useEffect(() => {
    if (props.match.params.feedId) {
      getData(props.match.params.feedId);
    } else {
      setFeeds("");
    }
  }, [props.match.params.feedId]);

  const handleChange = (e: any) => {
    setFeeds(e.target.value);
  };

  const getData = (feedId: string) => {
    fetch(`${getServerUrl()}/api/feeds/sources/${feedId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.info(data);
        setFeeds(data.feeds.join(","));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveData = () => {
    fetch(`${getServerUrl()}/api/feeds/sources`, {
      method: "POST",
      body: JSON.stringify({
        feeds: feeds,
      }),
    })
      .then((response) => response.json())
      .then((data) => props.history.push(`/feed/${data.feed_id}`))
      .catch((err) => {
        console.error(err);
      });
  };
  const updateData = () => {
    fetch(`${getServerUrl()}/api/feeds/sources/${props.match.params.feedId}`, {
      method: "POST",
      body: JSON.stringify({
        feeds: feeds,
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
      <p className="note">
        Comma separated list of rss feeds. Save the resulting link to get back
        your feed any time.
      </p>
      <textarea onChange={handleChange} rows={10} value={feeds} />
      <CustomButton
        onClick={() => (props.match.params.feedId ? updateData() : saveData())}
      >
        Save
      </CustomButton>
    </div>
  );
};

export default withRouter(UpsertFeed);
