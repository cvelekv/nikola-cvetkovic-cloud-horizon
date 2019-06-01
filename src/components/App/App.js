import "./App.css";

import React, { Component } from "react";

import NavBar from "../NavBar/NavBar";
import News from "../News/News";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";
import SnackBar from "../SnackBar/SnackBar";

class App extends Component {
  state = {
    loaded: false,
    loading: false,
    prev: 0,
    next: 20,
    baseIndex: 0,
    newStories: []
  };

  snackbarRef = React.createRef();
  _showSnackbarHandler = msg => {
    this.snackbarRef.current.openSnackBar(msg);
  };

  componentDidMount() {
    this.loadData();

    //page refreshes every 30s
    setInterval(() => {
      this.reloadPage();
    }, 30000);
  }

  //loading all stories ids from hacher news API
  loadData() {
    this.setState({ loading: true });

    const URL = "https://hacker-news.firebaseio.com/v0/topstories.json";

    fetch(URL)
      .then(data => data.json())
      .then(data => {
        //passing stories ids to this method so each story will be loaded
        this.fetchAllStories(data);
      })
      .catch(error => {
        console.log(error);
        this._showSnackbarHandler(error);
      });
  }

  fetchAllStories(ids) {
    let { prev, next, baseIndex } = this.state;

    //handled prev and next buttons selection by using slice method on array so I have stories ids properly (20 per page)
    //with map operator I'm calling a method that will call API for getting one story, I'm passing ID of story and index (which will be the order number)
    //map will return all requested stories, since there promises are returned, I use Promise.all to get a single promise from it and set state with returned data

    let stories = ids
      .slice(prev, next)
      .map((val, index) => this.fetchOneStory(val, index + baseIndex));

    Promise.all(stories).then(data => {
      this.setState({
        newStories: data,
        loaded: true,
        loading: false
      });
      this._showSnackbarHandler("News loaded...");
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
        this._showSnackbarHandler(error);
      });
  }

  //when button refresh is clicked
  refresh(e) {
    e.preventDefault();

    //setting defaults when refreshing the page manually
    this.setState({
      next: 20,
      prev: 0,
      baseIndex: 0,
      loaded: false
    });

    this.loadData();
  }

  //when next button is clicked
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

  //when previous button is clicked
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

  //automatically called every 30s
  reloadPage() {
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
        <SnackBar ref={this.snackbarRef} />
      </div>
    );
  }
}

export default App;
