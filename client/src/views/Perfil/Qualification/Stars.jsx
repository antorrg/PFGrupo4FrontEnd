import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const StarRating = ({ setRating, rating, ratingErrors, setRatingErrors }) => {
  // Star maximum
  const maxStars = 5;

  // Función para manejar el clic en una estrella
  const handleStarClick = (starValue) => {
    setRatingErrors("");
    setRating(starValue);
  };

  // Array de posibles valores de estrellas
  const starValues = Array.from({ length: maxStars }, (_, index) => index + 1);

  return (
    <div className="text-center">
      <div className="flex h-fit">
        {starValues.map((starValue) => (
          <span
            key={starValue}
            className={`cursor-pointer ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleStarClick(starValue)}
          >
            <StarIcon className="w-7 h-7" />
          </span>
        ))}
      </div>
      <p className="text-xs text-danger">{ratingErrors}</p>
    </div>
  );
};

export default StarRating;
