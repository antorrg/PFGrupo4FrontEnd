import React, { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";
import { getGames } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className="mt-4 flex items-start justify-center gap-8 w-[80%]">
      <div className="p-4 w-[220px] h-auto bg-[#5825cc]">
        <SearchBar />
        <br />
        <Filters />
        {/* <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div> */}
      </div>
      <div className="flex-1 h-auto">
        <Pagination />
        <Cards />
      </div>
    </div>
  );
};

export default Home;
