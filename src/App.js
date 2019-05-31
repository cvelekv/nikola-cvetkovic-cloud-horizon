import './App.css';

import React, { Component } from 'react';

import NavBar from './components/NavBar';
import News from './components/News';
import Spinner from './components/Spinner';

class App extends Component {
  state = {
    loaded: false,
    loading: false,
    prev: 0,
    next: 20,
    index: 0,
    newStories: []
  };

  refresh(e) {
    e.preventDefault();
    this.setState({ loaded: false });
    this.loadData();
  }

  fetchNewStories(storyIds) {
    let prev = this.state.prev;
    let next = this.state.next;
    let baseIndex = this.state.index;

    let actions = storyIds
      .slice(prev, next)
      .map((val, index) => this.fetchSingleStory(val, index + baseIndex));
    let results = Promise.all(actions);
    results.then(data => {
      this.setState(
        Object.assign({}, this.state, {
          newStories: data,
          loaded: true,
          loading: false
        })
      );
    });
  }

  fetchSingleStory(id, index) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(data => data.json())
      .then(data => {
        let item = data;

        item.rank = index + 1;
        return item;
      });
  }

  loadData() {
    this.setState({ loading: true });
    const URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
    fetch(URL)
      .then(data => data.json())
      .then(data => {
        this.fetchNewStories(data);
      });
  }
  componentDidMount() {
    this.loadData();
  }

  next() {
    let newNext = this.state.next + 20;
    let newPrev = this.state.prev + 20;
    let newIndex = this.state.index + 20;
    this.setState({
      next: newNext,
      prev: newPrev,
      loaded: false,
      index: newIndex
    });
    this.loadData();
  }
  prev() {
    let newNext = this.state.next - 20;
    let newPrev = this.state.prev - 20;
    let newIndex = this.state.index - 20;
    this.setState({
      next: newNext,
      prev: newPrev,
      loaded: false,
      index: newIndex
    });
    this.loadData();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar refreshPage={e => this.refresh(e)} />

        <main className="container mt-2">
          {this.state.loaded ? (
            <News newsObj={this.state.newStories} />
          ) : (
            <div className="spinner-class">
              <Spinner />
            </div>
          )}
        </main>
        {this.state.loaded ? (
          <div className="row button-align">
            {this.state.prev > 0 && (
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => this.prev()}
              >
                Prev
              </button>
            )}
            <button
              className="btn btn-primary btn-sm mt-2 ml-2"
              onClick={() => this.next()}
            >
              Next
            </button>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default App;
