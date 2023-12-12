import React from "react";
import GenresTable from "./GenresTable/GenresTable";

const Genres = () => {
  return (
    <div className="w-full my-6">
      <div className="max-w-[42rem] mx-auto px-6 text-left lg:max-w-[56rem]">
        <GenresTable />
      </div>
    </div>
  );
};

export default Genres;
