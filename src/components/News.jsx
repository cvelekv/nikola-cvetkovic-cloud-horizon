import React, { Component } from "react";
import NewsItem from "./NewsItem";

class News extends Component {
  state = {
    loaded: false,
    data: []
  };

  async componentDidMount() {
    await this.props;
    // console.log("AWAIT", this.props);
    this.setState({ data: this.props.newsObj, loaded: true });
  }

  content() {
    return (
      <ul className="list-group">
        {this.state.data.map(item => {
          return <NewsItem key={item.id} oneNews={item} />;
        })}
      </ul>
    );
  }

  render() {
    console.log("STATE", this.state);
    return (
      <React.Fragment>
        {this.state.loaded ? this.content() : null}
      </React.Fragment>
    );
  }
}

export default News;
