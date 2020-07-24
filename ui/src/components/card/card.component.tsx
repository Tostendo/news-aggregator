import React from "react";
import "./card.style.scss";
import { formatDate } from "../../utils/date.utils";
import { FeedMessage } from "../../types/message";

type Props = {
  message: FeedMessage;
};

export const Card = (props: Props) => {
  return (
    <a
      className="card-container"
      target="_blank"
      rel="noopener noreferrer"
      href={props.message.link}
    >
      <div className="feed-name">{props.message.feed_name}</div>
      <h2>{props.message.title}</h2>
      <div className="card-meta">
        <span>{props.message.author}</span>
        <span>{formatDate(props.message.published)}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: props.message.summary }}></p>
    </a>
  );
};
