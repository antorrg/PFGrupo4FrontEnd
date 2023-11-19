import { Link } from "react-router-dom";
import ConsolesLogos from "../ConsolesLogos/ConsolesLogos";

const Card = ({ game }) => {
  const { id, Platforms, name, image, price } = game;
  return (
    <div className="w-[220px] h-[400px] bg-[#1F0A4D] text-white flex flex-col">
      <img className="w-full h-[250px] object-cover" src={image} alt={name} />
      <ConsolesLogos Platforms={Platforms} />
      <div className="text-left p-2 flex-1">
        <Link to={`/detail/${id}`}>
          <h3 className="text-sm font-bold">{name}</h3>
        </Link>
        <h4 className="text-2xl font-extrabold">{price}</h4>
      </div>
    </div>
  );
};

export default Card;
