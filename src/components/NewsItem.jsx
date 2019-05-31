import React, { Component } from "react";

class NewsItem extends Component {
  state = {
    item: this.props.oneNews
  };
  render() {
    return (
      <li className="list-group-item">
        <p>{this.state.item.title}</p>
        <p>
          {this.state.item.score} <span> points</span>
          <span> by </span>
          {this.state.item.by} 2 hours ago | 4 comments
          <b>TYPE:{this.state.item.type}</b>
        </p>
      </li>
    );
  }
}

export default NewsItem;
