import './App.css';

import React, { Component } from 'react';

import NavBar from './components/NavBar';
import News from './components/News';
import Spinner from './components/Spinner';

function fetchSingleStory(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(data => data.json())
    .then(data => {
      let item = data;
      return item;
    });
}

class App extends Component {
  state = {
    loaded: false,
    loading: false,
    prev: 0,
    next: 20,
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

    let actions = storyIds.slice(prev, next).map(val => fetchSingleStory(val));
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
        <div className="row">
          <button className="btn btn-primary btn-sm">Prev</button>
          <button className="btn btn-primary btn-sm">Next</button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
