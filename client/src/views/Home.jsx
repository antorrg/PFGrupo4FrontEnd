import React from "react";
import styles from "./Home.module.css";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.filtros_container}>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
        <div className={styles.filtros}></div>
      </div>
      <div className={styles.cards}>
        <div className={styles.cards}></div>
      </div>
    </div>
  );
};

export default Home;
