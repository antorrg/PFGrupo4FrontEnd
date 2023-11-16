import { NavLink, Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const auth = true;
  return (
    <div className={styles.navBar}>
      <Link to={"/"}>
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.views_container}>
        <NavLink to={"/home"}>home</NavLink>
        {auth && <Link to={"/carrito"}>carrito</Link>}
        {auth && <Link to={"/wishlist"}>wishlist</Link>}
      </div>
    </div>
  );
}
