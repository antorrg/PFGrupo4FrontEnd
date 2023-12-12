import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const CommentsAndRatingsBox = ({ rated }) => {
  const starRating = (totalStars, rating) => {
    const stars = Array.from({ length: totalStars }, (_, index) => index + 1);
    return (
      <div className="flex h-fit">
        {stars.map((star) => (
          <span key={`star-${star}`}>
            <StarIcon
              className={`w-5 h-5 ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
            />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full ">
      <div className="dark:text-white dark:bg-[#0B0120] py-16 px-4 text-black max-w-[42rem] mx-auto lg:grid lg:max-w-[80rem] lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold">Puntuaciones</h2>
          <div className="flex items-center mt-3">
            {starRating(5, rated.avgScore)}
            <p className="ml-2 text-sm">{rated.avgScore}</p>
          </div>
          <div className="mt-6">
            {rated.scorePercentajes.map((star) => {
              return (
                <div className="flex items-center">
                  <dt className="flex-1 flex items-center">
                    <p>{star.score}</p>
                    <div className="flex flex-1 items-center ml-1">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <div className="ml-3 flex-1 relative">
                        <div className="bg-gray-300 h-3 border rounded-full"></div>
                        <div
                          className="bg-yellow-500 border border-yellow-500 absolute rounded-full top-0 bottom-0"
                          style={{ width: `${star.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </dt>
                  <dd className="text-sm text-right w-10 ml-3">
                    {star.percent}%
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h2 className="text-2xl font-bold">Comentarios</h2>
          {rated.lastTenRatings.map((rating) => {
            return (
              <div className="py-12 border-b">
                <div className="flex items-center">
                  <img
                    src={rating.picture}
                    alt={rating.nickname}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-bold">{rating.nickname}</h4>
                    <div className="mt-1">{starRating(5, rating.score)}</div>
                  </div>
                </div>
                <div className="text-base text-gray-800 mt-4 dark:text-white">
                  <p>{rating.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentsAndRatingsBox;
