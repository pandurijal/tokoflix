import React, { Component } from "react";

const API_KEY = "3210a5ea0268de0ce8488efd017058c1";

class Movie extends Component {
  state = {
    movie: [],
    id: "",
    rating: null,
    price: ""
  };

  render() {
    const id = this.state.id;
    const price = this.state.price;
    let boughtStatus = this.props.bought.filter(b => b.id === id);
    let bought = boughtStatus.length ? (
      <p>bought</p>
    ) : (
      <button onClick={() => this.props.onBuying(id, price)}>Beli</button>
    );
    return (
      <div>
        <p>Movie</p>
        <p>Harga = {price}</p>

        {bought}
      </div>
    );
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie = async () => {
    let id = this.props.location.state.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    let req = await fetch(url);
    let res = await req.json();
    this.setState({ id: res.id, rating: res.vote_average });
    this.calcPrice();
  };

  calcPrice = () => {
    let rating = this.state.rating;
    let price = null;
    if (rating > 1 && rating <= 3) {
      price = 3500;
    } else if (rating > 3 && rating <= 6) {
      price = 8250;
    } else if (rating > 6 && rating <= 8) {
      price = 16350;
    } else if (rating > 8 && rating <= 10) {
      price = 21250;
    }
    this.setState({ price });
  };
}

export default Movie;
