import '../styles/NewsItem.css';

import moment from 'moment';
import React, { Component } from 'react';

class NewsItem extends Component {
  state = {
    index: this.props.index,
    item: this.props.oneNews
  };
  render() {
    // let currentTimeHours = moment(new Date()).hours();
    let hoursA = moment(this.state.item.time).hours();
    // console.log("Time" currentTimeHours);

    return (
      <li className="list-group-item">
        <p>
          <span className="gray-text">{this.state.index}. </span>
          {this.state.item.title}
        </p>
        <p>
          {this.state.item.score} <span> points</span>
          <span className="gray-text"> by </span>
          {this.state.item.by}{" "}
          <span className="gray-text">{hoursA} hours ago</span> | 4 comments
          <b>TYPE:{this.state.item.type}</b>
        </p>
      </li>
    );
  }
}

export default NewsItem;
