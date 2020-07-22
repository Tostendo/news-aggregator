import React from "react";
import { Card } from "../card/card.component";
import "./card-list.style.scss";
export const CardList = (props: any) => {
  return (
    <div className="card-list">
      {props.news.map((message: any) => {
        return <Card key={message.link} message={message} />;
      })}
    </div>
  );
};
