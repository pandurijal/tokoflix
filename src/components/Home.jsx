import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import Pagination from "./Pagination";
import "../App.css";

const API_KEY = "3210a5ea0268de0ce8488efd017058c1";

class App extends Component {
  state = {
    movLists: [],
    prices: [],
    page: 1,
    totalPages: null
  };

  render() {
    return (
      <div className="App">
        <Grid>
          <h2 className="sub-header">Film yang sedang tayang</h2>
          <Row className="row-eq-height">
            {this.state.movLists.map(m => {
              let id = m.id;
              let title = m.title;
              title = title.toLowerCase();
              title = title.replace(/\s/g, "-");
              let slug = "".concat(id, "-", title);

              let purchasingStatus = this.props.state.purchased.filter(
                p => p.id === id
              );
              return (
                <Col sm={2} md={3} key={m.id}>
                  <Link
                    to={{
                      pathname: `/movie/${slug}`,
                      state: { id: id }
                    }}
                    className="link-movie"
                  >
                    <div className="list-box">
                      <div className="rating">{m.vote_average}</div>
                      <div className="img-box">
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w500/` + m.poster_path
                          }
                          alt={`Poster` + title}
                        />
                      </div>
                      <div className="detail">
                        <p className="title">
                          {m.title.length < 20
                            ? `${m.title}`
                            : `${m.title.substring(0, 25) + "..."}`}
                        </p>
                        <p>
                          {m.overview.length < 50
                            ? `${m.overview}`
                            : `${m.overview.substring(0, 70) + "..."}`}
                        </p>
                        <div className="purchase">
                          <p className="price">
                            Harga = {this.calcPrice(m.vote_average)}
                          </p>
                        </div>
                        <p style={{ color: `#e74c3c` }}>
                          <b hidden={!purchasingStatus.length}>
                            Anda telah membeli film ini
                          </b>
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Grid>
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

  calcPrice = rating => {
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
    return price;
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
