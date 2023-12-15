import Filters from "../../../components/Filters/Filters";
import Pagination from "../../../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getGames } from "../../../redux/actions";
import { useState, useEffect } from "react";
import GamesTable from "./GamesTable/GamesTable";

const AdminHome = () => {
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
    <div className="mt-4 flex items-start justify-center gap-8 w-[80%]">
      <div className="p-4 w-[220px] h-auto bg-[#5825cc] hidden sm:flex">
        <Filters onApplyFilters={onApplyFiltersHandlers} />
      </div>
      <div className="flex-1 h-auto">
        {games.videogames ? (
          <>
            <GamesTable videogames={games.videogames} filters={filters} />
            <Pagination
              PaginationData={games.PaginationData}
              onPageChange={onPageChangeHandler}
            />
          </>
        ) : (
          console.log("NO CARGO")
        )}
      </div>
    </div>
  );
};

export default AdminHome;
