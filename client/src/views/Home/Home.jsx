import React from "react";
//import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/Filters/Filters";
import Orders from "../../components/Orders/Orders.jsx";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getGames, updateFilterObj } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const [filters, setFilters] = useState({
    page: 0,
    platforms: "",
    genres: "",
    minPrice: -1,
    maxPrice: -1,
    name: "",
  });

  const onApplyFiltersHandlers = (auxFilters) => {
    setFilters(auxFilters);
  };

  const onPageChangeHandler = (pageNumber) => {
    setFilters({ ...filters, page: pageNumber });
  };

  useEffect(() => {
    dispatch(getGames(filters));
  }, [filters, dispatch]);

  return (
    <div className="mt-4 flex items-start justify-center gap-8 w-[80%] flex-1">
      <div className="w-[220px] h-auto bg-[#5825cc] hidden sm:flex">
        <Filters onApplyFilters={onApplyFiltersHandlers} />
      </div>
      <div className="flex-1 h-auto">
        {/* {games.videogames ? ( */}
          <div className="flex flex-col">
            <Orders onApplyFilters={onApplyFiltersHandlers} filters={filters} />
            <Cards videogames={games.videogames} />
            <Pagination
              PaginationData={games.PaginationData}
              onPageChange={onPageChangeHandler}
            />
          </div>
        {/* ) : (
          <div className="w-full h-[250px] flex items-center justify-center">
            <Spinner color="secondary" size="lg" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
