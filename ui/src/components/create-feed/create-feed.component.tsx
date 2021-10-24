import { useState } from "react";
import { withRouter } from "react-router";

import "./create-feed.style.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { getServerUrl } from "../../utils/server.utils";

type Props = {
  history: any;
};

const CreateFeed = (props: Props) => {
  const [feeds, setFeeds] = useState("");

  const handleChange = (e: any) => {
    setFeeds(e.target.value);
  };

  const saveData = () => {
    fetch(`${getServerUrl()}/api/feeds/create`, {
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
    <div className="create-feed">
      <h1>Create Feed</h1>
      <p className="note">
        Comma separated list of rss feeds. Save the resulting link to get back
        your feed any time.
      </p>
      <textarea onChange={handleChange} rows={10} value={feeds} />
      <CustomButton onClick={() => saveData()}> Save</CustomButton>
    </div>
  );
};

export default withRouter(CreateFeed);
