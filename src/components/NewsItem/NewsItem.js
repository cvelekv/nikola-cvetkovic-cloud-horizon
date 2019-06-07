import "./NewsItem.css";

import moment from "moment";
import React from "react";

function NewsItem(props) {
  const { oneNews } = props;
  // console.log("HOURS", moment.utc(oneNews.time).minutes());
  // let currentTime = moment().unix();
  // console.log("current time", moment().unix());
  // console.log("ONE NEWS ", oneNews.time);
  // let hoursA1 = Math.abs(currentTime - oneNews.time);
  //NOTE: BUG time is not good
  // console.log("Hours", moment.utc(hoursA1).minutes());
  let hoursA = moment(oneNews.time).hours();
  const commentsNum = oneNews.kids ? oneNews.kids.length : null;
  const commentsLink = `https://news.ycombinator.com/item?id=${oneNews.id}`;

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
