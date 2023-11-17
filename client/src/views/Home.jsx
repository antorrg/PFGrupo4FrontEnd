import React, { useEffect } from "react";
import styles from "./Home.module.css";
import NavBar from "../components/NavBar";
import Cards from "../components/Cards";
import { getGames } from "../redux/actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <div className={styles.filtros_container}>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
      </div>
      <div className={styles.cards}>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
