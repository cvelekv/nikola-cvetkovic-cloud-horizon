import '../styles/NewsItem.css';

import moment from 'moment';
import React, { Component } from 'react';

class NewsItem extends Component {
  state = {
    index: this.props.index,
    item: this.props.oneNews
  };
  render() {
    let hoursA = moment(this.state.item.time).hours();
    let commentsNum = this.state.item.kids ? this.state.item.kids.length : null;
    return (
      <li className="list-group-item">
        <p>
          <span className="gray-text">{this.state.item.rank}. </span>
          {this.state.item.title}
        </p>
        <p>
          {this.state.item.score} <span> points</span>
          <span className="gray-text"> by </span>
          {this.state.item.by}{" "}
          <span className="gray-text">{hoursA} hours ago</span> |{" "}
          {commentsNum ? commentsNum + " comments" : "no comments"}
        </p>
      </li>
    );
  }
}

export default NewsItem;
