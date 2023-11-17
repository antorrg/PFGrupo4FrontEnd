import React, { useEffect } from "react";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";
import { getGames } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Filters from "../../components/Filters/Filters";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <div className={styles.filtros_container}>
        <SearchBar />
        <br />
        <Filters />
        {/* <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div> */}
      </div>
      <div className={styles.cards}>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
