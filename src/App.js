import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

function fetchSingleStory(id, index) {
  const rank = index + 1;
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(data => data.json())
    .then(data => {
      let item = data;
      // console.log("EACH ITEM", item);
      // add the rank since it does not exist yet
      item.rank = rank;
      return item;
    });
}

class App extends Component {
  state = {
    loaded: false,
    newStories: []
  };

  // getTopStories() {
  //   const URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
  //   axios(URL)
  //     .then(result => {
  //       let obj = this.getSingleStoryObject(result.data);
  //       this.setState({ newsObj: obj, loaded: true });
  //     })
  //     .catch(error => console.error(error));
  // }

  // getSingleStoryObject(ids) {
  //   let results = [];
  //   ids.slice(0, 20).map(val => {
  //     fetch(`https://hacker-news.firebaseio.com/v0/item/${val}.json`)
  //       .then(data => data.json())
  //       .then(data => {
  //         results.push(data);
  //       });
  //   });

  //   return results;
  // }
  fetchNewStories(storyIds) {
    let actions = storyIds.slice(0, 10).map(val => fetchSingleStory(val, 0));
    let results = Promise.all(actions);
    // console.log("results", results);
    results.then(data => {
      this.setState(
        Object.assign({}, this.state, {
          newStories: data,
          loaded: true
        })
      );
    });
  }

  componentDidMount() {
    const URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
    fetch(URL)
      .then(data => data.json())
      .then(data => {
        this.fetchNewStories(data);
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          {this.state.loaded ? <News newsObj={this.state.newStories} /> : null}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
