import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import setAuthHeader from '../../../utils/AxiosUtils.jsx'

const Qualification = () => {
  const token = localStorage.getItem('validToken');
  const loginUser = useSelector((state) => state.loginUser);
  const [ratedPending, setRatedPending] = useState({});
  const [updateView, setUpdateView] = useState(false);

  const searchGamesPurchaseDB = async () => {
    const { data } = await axios.get(
      `/getRatedPendingItemsByUserId?userID=${loginUser.id}&page=0&size=100`,
      setAuthHeader(token)
    );
    setRatedPending(data);
  };

  const handlerUpdateView = () => {
    setUpdateView(!updateView);
  };

  useEffect(() => {
    searchGamesPurchaseDB();
  }, [updateView]);

  return (
    <>
      {ratedPending.ratedPendingItems && (
        <div className="w-full my-6">
          <div className="max-w-[42rem] mx-auto px-6 text-left lg:max-w-[56rem]">
            <h1 className=" text-2xl md:text-3xl font-bold">Calificacion</h1>
            <p className="mt-3 text-gray-500">
              Consulta la informacion del estado de tus pedidos, con informacion
              relevante, precio, cantidad, valor total, etc
            </p>
          </div>
          <div className="w-full mt-16">
            <div className="max-w-[42rem] mx-auto sm:px-4 flex flex-col gap-8 lg:max-w-[56rem]">
              <ul className="gap-8 flex flex-col">
                {ratedPending.ratedPendingItems.map((game) => {
                  return (
                    <Card
                      name={game.name}
                      image={game.image}
                      description={game.description}
                      Platforms={game.Platforms}
                      Genres={game.Genres}
                      itemID={game.id}
                      userID={loginUser.id}
                      handlerUpdateView={handlerUpdateView}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Qualification;
