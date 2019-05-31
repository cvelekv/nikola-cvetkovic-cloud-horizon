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

  componentDidMount() {
    this.loadData();

    setInterval(() => {
      this.reLoadPage();
    }, 30000);
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

  fetchNewStories(ids) {
    let prev = this.state.prev;
    let next = this.state.next;
    let baseIndex = this.state.index;

    let actions = ids
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

  refresh(e) {
    e.preventDefault();
    this.setState({ loaded: false });
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

  reLoadPage() {
    // TODO: Check if page number should be preserved when refreshing
    this.loadData();
    this.setState({ loaded: false });
  }

  render() {
    return (
      <div className="container">
        <NavBar refreshPage={e => this.refresh(e)} />

        <main className="mt-2">
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
                className="btn btn-primary prevButtonAlign btn-sm mt-2 mr-3"
                onClick={() => this.prev()}
              >
                Prev
              </button>
            )}
            <button
              className="btn btn-primary nextButtonAlign btn-sm mt-2 ml-3"
              onClick={() => this.next()}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
