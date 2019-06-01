import "./NewsItem.css";

import moment from "moment";
import React from "react";

function NewsItem(props) {
  let { oneNews } = props;

  let hoursA = moment(oneNews.time).hours();
  let commentsNum = oneNews.kids ? oneNews.kids.length : null;
  let commentsLink = "https://news.ycombinator.com/item?id=" + oneNews.id;

  //creating a tag so I could extract the hostname from it (dodged  the usage of regex )
  let temp = document.createElement("a");
  temp.href = oneNews.url;
  let hostName = temp.hostname;

  return (
    <li className="list-group-item">
      <p className="title-font-size">
        <span className="gray-text">{oneNews.index}. </span>
        {oneNews.title} <span className="gray-text">({hostName})</span>
      </p>

      <p className="info-font">
        {oneNews.score} <span> points</span>
        <span className="gray-text"> by </span>
        {oneNews.by}
        <span className="gray-text"> {hoursA} hours ago</span> |{" "}
        {commentsNum ? (
          <a target="_blank" rel="noopener noreferrer" href={commentsLink}>
            {commentsNum} comments
          </a>
        ) : (
          "no comments"
        )}
      </p>
    </li>
  );
}

export default NewsItem;
