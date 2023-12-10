import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearDetails, getDetails, changeBg } from "../../redux/actions";
import ConsoleLogos from "../../components/ConsoleLogos/ConsoleLogos";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem('authToken');
  const detailGame = useSelector((state) => state.detailGame);

  useEffect(() => {
    dispatch(getDetails(id, token));
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
      <div>
        <Link to="/home">
          <h3>Atras</h3>
        </Link>
      </div>
      <div className="w-full h-full mb-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center flex-wrap w-full gap-2">
            <p className="bg-[#1F0A4D] text-white w-fit px-2 rounded-md">
              {detailGame?.released}
            </p>
            {detailGame?.Platforms && (
              <ConsoleLogos Platforms={detailGame.Platforms} />
            )}
          </div>
          <h1 className="text-4xl font-bold"> {detailGame?.name}</h1>
          <div>
            <img
              src={detailGame?.image}
              alt={detailGame?.name}
              className="w-full sm:w-[400px]"
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
              <h2 className="text-lg font-semibold">About</h2>
              <p className="text-[14px]">{detailGame?.description} </p>
            </div>

            {/* <p>Rating: {detailGame?.rating} </p> */}
          </div>
          <div className="w-full bg-[#5825CC] shadow-lg shadow-[rgb(0 0 0 / 26%)]  flex flex-col p-4">
            <div className="max-w-[400px]">
              <p className="font-extrabold text-white text-xl mb-2">
                ${detailGame?.price}{" "}
              </p>
              <button className="bg-[#fad318] w-full font-bold text-base min-h-[35px]">
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
