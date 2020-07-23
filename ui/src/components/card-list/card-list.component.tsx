import React from "react";
import { Card } from "../card/card.component";

import { FeedMessage } from "../../types/message";

import "./card-list.style.scss";
export const CardList = (props: { news: FeedMessage[] }) => {
  return (
    <div className="card-list">
      {props.news.map((message: any) => {
        return <Card key={message.link} message={message} />;
      })}
    </div>
  );
};
