import React, { Component } from 'react';

import NewsItem from './NewsItem';

class News extends Component {
  state = {
    loaded: false,
    data: []
  };

  async componentDidMount() {
    await this.props;
    this.setState({ data: this.props.newsObj, loaded: true });
  }

  content() {
    return (
      <ul className="list-group">
        {this.state.data.map((item, index) => {
          return <NewsItem key={item.id} oneNews={item} index={index + 1} />;
        })}
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? this.content() : null}
      </React.Fragment>
    );
  }
}

export default News;
