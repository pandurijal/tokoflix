import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ProgressBar,
  Modal,
  Button,
  Badge
} from "react-bootstrap";
import Casts from "./Casts";
import RelatedMovie from "./RelatedMovie";

const API_KEY = "3210a5ea0268de0ce8488efd017058c1";

class Movie extends Component {
  state = {
    id: "",
    title: "",
    tagline: "",
    year: "",
    overview: "",
    runtime: null,
    genres: [],
    poster: "",
    backdrop: "",
    casts: [],
    rating: null,
    voters: null,
    price: "",
    purchaseModal: false,
    similar: [],
    recommend: []
  };

  render() {
    const {
      id,
      title,
      tagline,
      year,
      overview,
      runtime,
      genres,
      rating,
      voters,
      price,
      poster
    } = this.state;
    let purchasingStatus = this.props.purchased.filter(b => b.id === id);
    let purchasingBalance = this.props.balance - this.state.price < 0;
    return (
      <div>
        <Grid className="movie-box">
          <Row className="show-grid">
            <Col xs={4} md={4} className="xs-to-1">
              <div className="poster">
                <div className="img-box">
                  <img
                    src={"http://image.tmdb.org/t/p/w500/" + poster}
                    alt={`Poster` + title}
                  />
                  <div className="purchase">
                    <div className="genres">
                      {genres.map(g => {
                        return <Badge key={g.id}>{g.name}</Badge>;
                      })}
                    </div>
                    <p className="runtime">
                      Durasi{" "}
                      <span>
                        {Math.trunc(runtime / 60)} jam {runtime % 60} menit
                      </span>
                    </p>
                    <p className="price">Harga = {price}</p>
                    <button
                      className="btn btn-primer btn-purchase"
                      disabled={purchasingStatus.length || purchasingBalance}
                      onClick={this.showPurchaseModal}
                    >
                      BELI FILM
                    </button>
                    <p style={{ color: `#e74c3c` }}>
                      <b hidden={!purchasingStatus.length}>
                        Anda telah membeli film ini
                      </b>
                    </p>
                    <Modal
                      className="purchase-modal"
                      show={this.state.purchaseModal}
                      onHide={this.hidePurchaseModal}
                    >
                      <Modal.Header>
                        <Modal.Title>Konfirmasi Pembelian</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        Saat ini Anda memiliki saldo sebesar{" "}
                        <b>{this.props.balance}</b>
                        <br />
                        Apakah Anda yakin ingin membeli film <b>{title}</b>{" "}
                        seharga <b>{price}</b>?
                      </Modal.Body>

                      <Modal.Footer>
                        <Button onClick={this.hidePurchaseModal}>Batal</Button>
                        <Button
                          className="btn btn-primer"
                          onClick={() => {
                            this.props.onBuying(id, price);
                            this.hidePurchaseModal();
                          }}
                        >
                          Beli
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={8} md={8} className="xs-to-1">
              <div className="detail">
                <div className="rating">
                  <ProgressBar now={rating * 10} />
                  <span>{rating}</span> dari {voters} orang
                </div>
                <p className="title">
                  {title}
                  <span>({year.slice(0, 4)})</span>
                </p>
                {tagline ? <p className="tagline">"{tagline}"</p> : null}
                <p className="overview">{overview}</p>
                <Casts casts={this.state.casts} />
              </div>
            </Col>
          </Row>
        </Grid>
        <RelatedMovie
          similar={this.state.similar}
          recommend={this.state.recommend}
        />
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
    this.setState({
      id: res.id,
      title: res.title,
      tagline: res.tagline,
      year: res.release_date,
      overview: res.overview,
      runtime: res.runtime,
      genres: res.genres,
      poster: res.poster_path,
      backdrop: res.backdrop_path,
      rating: res.vote_average,
      voters: res.vote_count
    });
    this.calcPrice();
    this.fetchCasts();
    this.fetchSimilar();
    this.fetchRecommend();
  };

  fetchCasts = async () => {
    let id = this.state.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    let req = await fetch(url);
    let res = await req.json();
    let casts = res.cast.slice(0, 10);
    this.setState({ casts });
  };

  fetchSimilar = async () => {
    let id = this.state.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`;
    let req = await fetch(url);
    let res = await req.json();
    let similar = res.results.slice(0, 4);
    this.setState({ similar });
  };

  fetchRecommend = async () => {
    let id = this.state.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`;
    let req = await fetch(url);
    let res = await req.json();
    let recommend = res.results.slice(0, 4);
    this.setState({ recommend });
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

  showPurchaseModal = () => {
    this.setState({ purchaseModal: true });
  };

  hidePurchaseModal = () => {
    this.setState({ purchaseModal: false });
  };
}

export default Movie;
