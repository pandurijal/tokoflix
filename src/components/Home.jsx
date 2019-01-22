import React, { Component } from "react";
import NowPlaying from "./NowPlaying";
import Pagination from "./Pagination";
import "../App.css";

const API_KEY = "3210a5ea0268de0ce8488efd017058c1";

class App extends Component {
  state = {
    movLists: [],
    page: 1,
    totalPages: null,
    balance: 100000
  };

  render() {
    return (
      <div className="App">
        <NowPlaying movLists={this.state.movLists} loadMore={this.loadMore} />
        <Pagination
          page={this.state.page}
          totalPages={this.state.totalPages}
          onNext={this.goNext}
          onPrev={this.goPrev}
        />
      </div>
    );
  }

  componentDidMount() {
    this.fetchNowPlaying();
  }

  componentDidUpdate() {
    console.log("page", this.state);
    window.scrollTo(0, 0);
  }

  fetchNowPlaying = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${
      this.state.page
    }`;
    let req = await fetch(url);
    let res = await req.json();
    this.setState({ movLists: res.results, totalPages: res.total_pages });
  };

  goNext = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchNowPlaying
    );
  };

  goPrev = prevState => {
    this.setState(
      prevState => ({ page: prevState.page - 1 }),
      this.fetchNowPlaying
    );
  };
}

export default App;
