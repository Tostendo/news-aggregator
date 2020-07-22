import React from "react";
import "./card.style.scss";

export const Card = (props: any) => {
  return (
    <div className="card-container">
      <h2>{props.message.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.message.summary }}></p>
    </div>
  );
};
