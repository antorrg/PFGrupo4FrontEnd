import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector } from "react-redux";

const Carousel = () => {
  const games = useSelector((state) => state.games);
  const { videogames } = games;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings} className="flex items-center justify-center">
      {videogames.slice(0, 10).map((game, index) => {
        return (
          <div className="w-[300px] h-[400px]">
            <img
              src={game.image}
              alt={`imagen-${index}`}
              className="object-cover h-full w-full"
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default Carousel;
