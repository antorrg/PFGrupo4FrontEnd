import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearDetails, getDetails, changeBg } from "../../redux/actions";
import ConsoleLogos from "../../components/ConsoleLogos/ConsoleLogos";
import CommentsAndRatingsBox from "./CommentsAndRatingsBox";
import { useContext } from "react";
import { CartContext } from "../../context/contextCart";
import { showSuccess, showError } from "../../utils/Notifications";
import BackButton from "../../components/BackButton/BackButton";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const detailGame = useSelector((state) => state.detailGame);

  const isProductInCart = cart.some((item) => item.id === detailGame.id);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(clearDetails());
      dispatch(changeBg(""));
    };
  }, [dispatch, id]);

  if (detailGame.image) {
    dispatch(changeBg(detailGame.image));
  }

  return (
    <div className="overflow-hidden w-full flex-1 ">
      <div className="w-full h-full mb-4 max-w-[64rem] mx-auto my-0">
        <BackButton/>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center flex-wrap w-full gap-2">
            {detailGame?.Platforms && (
              <ConsoleLogos Platforms={detailGame.Platforms} />
            )}
          </div>
          <h1 className="text-4xl font-bold"> {detailGame?.name}</h1>
          <div className="w-full">
            <img
              src={detailGame?.image}
              alt={detailGame?.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="flex w-full items-center p-2 pb-0">
              {detailGame.Genres?.map((genre) => {
                return (
                  <p
                    className="mr-2 bg-[#4618AC] px-2 rounded-lg text-[#b3aac9] font-semibold"
                    key={genre}
                  >
                    {genre}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="w-full p-2 pt-0 flex flex-col gap-4">
            <div className="">
              <h2 className="text-lg font-semibold">Descripción</h2>
              <p className="text-[14px]">{detailGame?.description} </p>
              <h2 className="text-lg font-semibold bg-[#1F0A4D] text-white w-fit rounded-md">Fecha de Lanzamiento: {detailGame?.released}</h2>
            </div>

            {/* <p>Rating: {detailGame?.rating} </p> */}
          </div>
          <div className="w-full bg-[#5825CC] shadow-lg shadow-[rgb(0 0 0 / 26%)]  flex flex-col p-4">
            <div className="max-w-[400px]">
              <p className="font-extrabold text-white text-xl mb-2">
                ${detailGame?.price}{" "}
              </p>
              <button
                className="bg-accent w-full font-bold text-base min-h-[35px]"
                onClick={() => {
                  isProductInCart
                    ? (removeFromCart({ id: detailGame.id }),
                      showError(
                        `El Video Juego ${detailGame.name} se ha eliminado del carrito`
                      ))
                    : (addToCart({ id: detailGame.id }),
                      showSuccess(
                        `El Video Juego ${detailGame.name} se ha agregado al carrito`
                      ));
                }}
              >
                {isProductInCart ? "Remover del carrito" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>
        {detailGame.rated && <CommentsAndRatingsBox rated={detailGame.rated} />}
        {/* {detailGame.rated && (
          <div>
            {detailGame.rated.scorePercentajes.length > 0 && (
              <div>
                <p className="text-[14px]">
                  {"Puntaje Promedio: " + detailGame.rated.avgScore}{" "}
                </p>
                <br></br>
                {detailGame.rated.scorePercentajes.map((rated) => {
                  return (
                    <p className="text-[14px]" key={rated.score}>
                      {"Puntaje " + rated.score + " = " + rated.percent + "%"}
                    </p>
                  );
                })}
                {detailGame.rated.lastTenRatings.map((rating) => {
                  return (
                    <div>
                      <br></br>
                      <p className="text-[14px]" key={rating.id}>
                        {"Comentario: " + rating.comment}
                      </p>
                      <p className="text-[14px]" key={rating.id}>
                        {"Score: " + rating.score}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}
export default Detail;
