import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RelatedMovie = props => {
  return (
    <Grid className="related" fluid>
      <Row>
        <Col md={6}>
          <div className="related-box">
            <p className="header">Film Serupa</p>
            <Row>
              {props.similar.map(s => {
                let id = s.id;
                let title = s.title;
                title = title.toLowerCase();
                title = title.replace(/\s/g, "-");
                let slug = "".concat(s.id, "-", title);
                return (
                  <Col md={3} key={id}>
                    <Link
                      to={{
                        pathname: `/movie/${slug}`,
                        state: { id: id }
                      }}
                    >
                      <div className="related-item">
                        <div className="img-box">
                          <img
                            src={
                              "http://image.tmdb.org/t/p/w500/" + s.poster_path
                            }
                            alt={s.title}
                          />
                        </div>
                        <div className="detail">
                          <p className="title">
                            {s.title.length < 15
                              ? `${s.title}`
                              : `${s.title.substring(0, 20) + "..."}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className="related-box">
            <p className="header">Film Rekomendasi</p>
            <Row>
              {props.recommend.map(r => {
                let id = r.id;
                let title = r.title;
                title = title.toLowerCase();
                title = title.replace(/\s/g, "-");
                let slug = "".concat(r.id, "-", title);
                return (
                  <Col md={3} key={id}>
                    <Link
                      to={{
                        pathname: `/movie/${slug}`,
                        state: { id: id }
                      }}
                    >
                      <div className="related-item">
                        <div className="img-box">
                          <img
                            src={
                              "http://image.tmdb.org/t/p/w500/" + r.poster_path
                            }
                            alt={r.title}
                          />
                        </div>
                        <div className="detail">
                          <p className="title">
                            {r.title.length < 15
                              ? `${r.title}`
                              : `${r.title.substring(0, 20) + "..."}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default RelatedMovie;
