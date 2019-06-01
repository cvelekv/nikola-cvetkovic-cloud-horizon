export default function loadData(prev, next, baseIndex) {
  // this.setState({ loading: true });
  const URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
  let result;

  fetch(URL)
    .then(data => data.json())
    .then(data => {
      result = fetchAllStories(data, prev, next, baseIndex);
    })
    .catch(error => {
      console.log(error);
    });

  return result;
}

async function fetchAllStories(ids, prev, next, baseIndex) {
  // let prev = this.state.prev;
  // let next = this.state.next;
  // let baseIndex = this.state.index;

  let stories = ids
    .slice(prev, next)
    .map((val, index) => fetchSingleStory(val, index + baseIndex));

  let results = Promise.all(stories);

  results.then(data => {
    return data;
    // this.setState(
    //   Object.assign({}, this.state, {
    //     newStories: data,
    //     loaded: true,
    //     loading: false
    //   })
    // );
  });
}

async function fetchSingleStory(id, index) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(data => data.json())
    .then(data => {
      let item = data;

      item.rank = index + 1;
      return item;
    })
    .catch(error => {
      console.log(error);
    });
}
