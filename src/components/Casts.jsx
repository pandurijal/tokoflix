import React from "react";
import Slider from "react-slick";

const Casts = props => {
  var settings = {
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    infinite: true,
    adaptiveHeight: true
  };

  return (
    <Slider {...settings} className="cast-slider">
      {props.casts.map(c => {
        return (
          <div className="cast-box" key={c.cast_id}>
            <div className="img-box">
              <img
                src={"http://image.tmdb.org/t/p/w500/" + c.profile_path}
                alt={`Poster` + c.name}
              />
            </div>
            <p className="name">{c.name}</p>
            <p className="char">{c.character}</p>
          </div>
        );
      })}
    </Slider>
  );
};

export default Casts;
