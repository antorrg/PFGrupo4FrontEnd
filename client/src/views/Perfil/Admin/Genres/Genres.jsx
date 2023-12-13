import React from "react";
import GenresTable from "./GenresTable/GenresTable";
import FormGenres from "../../../../components/Form/FormGenres";

const Genres = () => {
  return (
    <div className="w-full my-6">
      <div className="max-w-[42rem] mx-auto px-6 text-left lg:max-w-[56rem] flex flex-col gap-4">
        <div className="dark:bg-secondary rounded-2xl">
        <FormGenres/>
        </div>
        <GenresTable />
      </div>
    </div>
  );
};

export default Genres;
