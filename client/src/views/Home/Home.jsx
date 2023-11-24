import React from "react";
//import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getGames, updateFilterObj } from "../../redux/actions";
import { useState, useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const [filters, setFilters] = useState({
    page: 0,
    platforms: "",
    genres: "",
    minPrice: -1,
    maxPrice: -1,
    name: ""
  });

  const onApplyFiltersHandlers = (auxFilters) => {
    setFilters(auxFilters);
  }

  const onPageChangeHandler = (pageNumber) => {
    /*const auxFilter  = {
      page: pageNumber
    }
    dispatch(updateFilterObj(auxFilter));*/
    //dispatch(getGames(filtersObj));

    setFilters({...filters, page: pageNumber});

    /*dispatch(getGames({
      page: pageNumber,
      platforms: "",
      genres: "",
      minPrice: -1,
      maxPrice: -1,
      name: ""
    }));*/
  }

  useEffect(() => {
    console.log("Actualio estado!!!")
    dispatch(getGames(filters));
  }, [filters, dispatch]);

  return (
    <div className="mt-4 flex items-start justify-center gap-8 w-[80%]">
      <div className="p-4 w-[220px] h-auto bg-[#5825cc]">
        {/*<SearchBar />
        <br />*/}
        <Filters
        onApplyFilters={onApplyFiltersHandlers}
        />
        {/* <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div> */}
      </div>
      <div className="flex-1 h-auto">
        {games.videogames ? (
          <>
            <Cards
              videogames={games.videogames}
            />
            <Pagination
              PaginationData={games.PaginationData}
              onPageChange={onPageChangeHandler}
            />
          </>
        ) : console.log("NO CARGO")}
      </div>
    </div>
  );
};

export default Home;
