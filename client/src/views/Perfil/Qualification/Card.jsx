import { useState } from "react";
import Stars from "./Stars.jsx";
import { Chip, Textarea, Button } from "@nextui-org/react";
import axios from "axios";

const Card = ({
  name,
  image,
  description,
  Platforms,
  Genres,
  itemID,
  userID,
  handlerUpdateView,
}) => {
  const [rating, setRating] = useState(0);
  const [ratingErrors, setRatingErrors] = useState("");

  const [comment, setComment] = useState("");
  const [commentErrors, setCommentErrors] = useState("");

  const validateComment = (text) => {
    setComment(text);
    if (text.length < 100) {
      setCommentErrors(
        "La descripción tiene que contar con al menos 100 caracteres."
      );
      return true;
    }
    if (text.length > 500) {
      setCommentErrors(
        "La descripción tiene que contar con aun maximo de 500 caracteres."
      );
      return true;
    }
    setCommentErrors("");
    return false;
  };

  const validateRating = () => {
    if (rating === 0) {
      setRatingErrors("Debes puntuar");
      return true;
    }
    return false;
  };

  const submitRatingAndCommentDB = async () => {
    console.log(userID, itemID, comment, rating);
    try {
      const data = await axios.post(
        `http://localhost:3001/post/postUserRated`,
        {
          userID,
          itemID,
          comment,
          score: rating,
        }
      );
      handlerUpdateView();
    } catch (error) {
      //   window.alert("error calificacion juego");
      console.log(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const isCommentValid = validateComment(comment); //true si esta mal
    const isRatingValid = validateRating(); //true si esta mal

    if (isCommentValid === false && isRatingValid === false) {
      submitRatingAndCommentDB();
      console.log("formulario aprobado y enviado");
    }
  };

  return (
    <li className="text-sm sm:border sm:rounded-lg dark:bg-secondary dark:border-none sm:text-base overflow-hidden">
      <div className="w-full p-4 dark:bg-[#0B0120] bg-secondary text-white">
        <div className="font-medium">
          <div className="sm:flex justify-between items-center ">
            <h5 className="text-xl">{name}</h5>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="border-b sm:border-none border-primary flex items-center sm:items-start">
          <div className="w-20 h-20 sm:h-40 sm:w-40 flex flex-col">
            <img
              src={image}
              className="w-full h-full object-cover rounded-lg"
              alt={name}
            />
          </div>
          <div className="flex-1 ml-6">
            <div className="h-20 sm:h-40 overflow-auto">
              <p className="text-gray-500 dark:text-white hidden sm:flex">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <>
            <p className="ml-2 text-sm">Plataformas</p>
            <div className="flex flex-wrap gap-2">
              {Platforms.map((platform) => {
                return <Chip className="bg-accent">{platform}</Chip>;
              })}
            </div>
          </>
          <>
            <p className="ml-2 text-sm">Generos</p>
            <div className="flex flex-wrap gap-2">
              {Genres.map((genre) => {
                return <Chip className="bg-accent">{genre}</Chip>;
              })}
            </div>
          </>
        </div>
        <form
          className="w-full my-4 border-t py-4 flex justify-evenly border-primary bg-[#0B0120] sm:rounded-lg"
          onSubmit={submit}
        >
          <Textarea
            isInvalid={(e) => validateComment(e.target.value)}
            // isRequired
            variant="bordered"
            label="Comentario"
            onChange={(e) => validateComment(e.target.value)}
            value={comment}
            placeholder="Ingresa tu comentario acerca del juego"
            errorMessage={commentErrors}
            className="max-w-[40rem]"
          />
          <div className="flex flex-col justify-evenly">
            <Stars
              setRating={setRating}
              rating={rating}
              ratingErrors={ratingErrors}
              setRatingErrors={setRatingErrors}
            />
            <Button type="submit">Calificar</Button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default Card;
