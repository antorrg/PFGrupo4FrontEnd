import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearDetails, getDetails, changeBg } from "../../redux/actions";
import ConsoleLogos from "../../components/ConsoleLogos/ConsoleLogos";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailGame = useSelector((state) => state.detailGame);

  useEffect(() => {
    dispatch(getDetails(id));
    dispatch(changeBg(detailGame.image));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div className="overflow-hidden w-screen flex-1 ">
      <div>
        <div>
          <h1> {detailGame?.name}</h1>
          <img src={detailGame?.image} alt={detailGame?.name} />
          <p>Descripción: {detailGame?.description} </p>
          {/* <p>Plataformas: {detailGame?.Platforms?.map((p) => p).join(", ")} </p> */}
          {detailGame?.Platforms && (
            <ConsoleLogos Platforms={detailGame.Platforms} />
          )}
          <p>Géneros: {detailGame?.Genres?.map((g) => g).join(", ")} </p>
          <p>Fecha de lanzamiento: {detailGame?.released} </p>
          <p>Precio: {detailGame?.price} </p>
          {/* <p>Rating: {detailGame?.rating} </p> */}
        </div>
        <div>
          <Link to="/home">
            <h3>Atras</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Detail;
