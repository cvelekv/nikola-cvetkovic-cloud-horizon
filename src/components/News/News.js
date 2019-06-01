import React from "react";

import NewsItem from "../NewsItem/NewsItem";

function News(props) {
  let { newsObj } = props;

  return (
    <ul className="list-group">
      {newsObj.map(item => {
        return <NewsItem key={item.id} oneNews={item} />;
      })}
    </ul>
  );
}

export default News;
