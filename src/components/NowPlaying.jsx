import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";

const NowPlaying = props => {
  return (
    <div>
      <h2 className="sub-header">Film yang sedang tayang</h2>
      <Grid>
        <Row className="row-eq-height">
          {props.movLists.map(m => {
            let id = m.id;
            let title = m.title;
            title = title.toLowerCase();
            title = title.replace(/\s/g, "-");
            let slug = "".concat(id, "-", title);
            return (
              <Col sm={2} md={3} key={m.id}>
                <Link
                  to={{
                    pathname: `/movie/${slug}`,
                    state: { id: id }
                  }}
                  className="link-movie"
                >
                  <div className="movie-box">
                    <div className="rating">
                      {" "}
                      {m.vote_average}
                      {/* {m.vote_average.length < 2
                        ? `${m.vote_average}`
                        : `${m.vote_average + ".0"}`} */}
                    </div>
                    <div className="img-box">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/` + m.poster_path}
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
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Grid>
    </div>
  );
};

export default NowPlaying;
