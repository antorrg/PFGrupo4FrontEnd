import { Chip, Textarea, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "./Stars.jsx";

const Qualification = () => {
  const [ratedPending, setRatedPending] = useState({});
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const [validateComment, setValidateComment] = useState("");

  const searchGamesPurchaseDB = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/getRatedPendingItemsByUserId?userID=3102ebab-8b0c-4953-808a-98f43ada165b&page=0&size=100"
    );
    setRatedPending(data);
  };

  useEffect(() => {
    searchGamesPurchaseDB();
  }, []);

  const submitRatingAndComment = () => {
    e.preventDefault();
    // Call the API endpoint to save the rating and comment to the database.
    console.log("envio de formulario");
  };

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
              <ul>
                {ratedPending.ratedPendingItems.map((game) => {
                  return (
                    <li className="text-sm sm:border sm:rounded-lg dark:bg-secondary dark:border-none sm:text-base overflow-hidden">
                      <div className="w-full p-4 dark:bg-[#0B0120] bg-secondary text-white">
                        <div className="font-medium">
                          <div className="sm:flex justify-between items-center ">
                            <h5 className="text-xl">{game.name}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="border-b sm:border-none border-primary flex items-center sm:items-start">
                          <div className="w-20 h-20 sm:h-40 sm:w-40 flex flex-col">
                            <img
                              src={game.image}
                              className="w-full h-full object-cover rounded-lg"
                              alt={game.name}
                            />
                          </div>
                          <div className="flex-1 ml-6">
                            <div className="h-20 sm:h-40 overflow-auto">
                              <p className="text-gray-500 dark:text-white hidden sm:flex">
                                {game.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <>
                            <p className="ml-2 text-sm">Plataformas</p>
                            <div className="flex flex-wrap gap-2">
                              {game.Platforms.map((platform) => {
                                return (
                                  <Chip className="bg-accent">{platform}</Chip>
                                );
                              })}
                            </div>
                          </>
                          <>
                            <p className="ml-2 text-sm">Generos</p>
                            <div className="flex flex-wrap gap-2">
                              {game.Genres.map((genre) => {
                                return (
                                  <Chip className="bg-accent">{genre}</Chip>
                                );
                              })}
                            </div>
                          </>
                        </div>
                        {/* <div>
                          <h3>Rating and Comment</h3>
                          <form onSubmit={submitRatingAndComment}>
                            <input
                              type="range"
                              min="0"
                              max="5"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            />
                            <span>{rating}</span>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <button type="submit">Calificar</button>
                          </form>
                        </div> */}
                        <form
                          className="w-full my-4 border-t py-4 flex justify-evenly border-primary bg-[#0B0120] sm:rounded-lg"
                          onSubmit={submitRatingAndComment}
                        >
                          <Textarea
                            isInvalid={false}
                            isRequired
                            variant="bordered"
                            label="Comentario"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder="Ingresa tu comentario acerca del juego : )"
                            // errorMessage={
                            //   isInvalid
                            //     ? "La descripción tiene que contar con al menos 255 caracteres."
                            //     : null
                            // }
                            className="max-w-[40rem]"
                          />
                          <div className="flex flex-col justify-evenly">
                            <Stars setRating={setRating} rating={rating} />
                            <Button type="submit">Calificar</Button>
                          </div>
                        </form>
                      </div>
                    </li>
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
