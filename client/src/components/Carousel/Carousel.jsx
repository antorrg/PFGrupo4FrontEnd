import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner } from "@nextui-org/react";

const Carousel = () => {
  const [games, setGames] = useState({});
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
  console.log(games);

  useEffect(() => {
    const getGames = async () => {
      const { data } = await axios("/videogames?page=0&size=10");
      setGames(data);
    };
    getGames();
  }, []);

  return (
    <div>

      {games.videogames ? (
        <Slider {...settings} className="flex items-center justify-center">
          {games.videogames.map((game, index) => {
            return (
              <div
                className="h-[200px] sm:w-[300px] sm:h-[400px]"
                key={game.name}
              >
                <img
                  src={game.image}
                  alt={`imagen-${index}`}
                  className="object-cover h-full w-full"
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="">
          <Spinner color="secondary" size="lg" />
        </div>
      )}
    </div>
  );
};

export default Carousel;
