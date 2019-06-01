import "./App.css";

import React, { Component } from "react";

import NavBar from "../NavBar/NavBar";
import News from "../News/News";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";

class App extends Component {
  state = {
    loaded: false,
    loading: false,
    prev: 0,
    next: 20,
    baseIndex: 0,
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
        this.fetchAllStories(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchAllStories(ids) {
    let { prev, next, baseIndex } = this.state;

    let stories = ids
      .slice(prev, next)
      .map((val, index) => this.fetchOneStory(val, index + baseIndex));

    Promise.all(stories).then(data => {
      this.setState({
        newStories: data,
        loaded: true,
        loading: false
      });
    });
  }

  async fetchOneStory(id, index) {
    return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(data => data.json())
      .then(data => {
        let item = data;

        item.index = index + 1;
        return item;
      })
      .catch(error => {
        console.log(error);
      });
  }

  refresh(e) {
    e.preventDefault();
    this.setState({ loaded: false });

    this.loadData();
  }

  next() {
    let { next, prev, baseIndex } = this.state;

    this.setState({
      next: next + 20,
      prev: prev + 20,
      loaded: false,
      baseIndex: baseIndex + 20
    });
    this.loadData();
  }

  prev() {
    let { next, prev, baseIndex } = this.state;

    this.setState({
      next: next - 20,
      prev: prev - 20,
      loaded: false,
      baseIndex: baseIndex - 20
    });
    this.loadData();
  }

  reLoadPage() {
    // TODO: Check if page number should be preserved when refreshing
    this.loadData();
    this.setState({ loaded: false });
  }

  render() {
    let { loaded, newStories, prev } = this.state;

    return (
      <div className="container">
        <NavBar refreshPage={e => this.refresh(e)} />

        {loaded ? (
          <main className="mt-2">
            <News newsObj={newStories} />
            <Footer
              prevValue={prev}
              onNext={() => this.next()}
              onPrev={() => this.prev()}
            />
          </main>
        ) : (
          <div className="spinner-class">
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default App;
