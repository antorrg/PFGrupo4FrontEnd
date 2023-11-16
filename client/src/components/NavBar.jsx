import { NavLink, Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const auth = false;
  return (
    <div className={styles.navBar}>
      <Link to={"/"}>
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.views_container}>
        <NavLink to={"/home"}>Home</NavLink>
        {auth && <Link to={"/carrito"}>Carrito</Link>}
        {auth && <Link to={"/wishlist"}>Wishlist</Link>}
        {auth === false && <Link to={"/login"}>Login | Join</Link>}

      </div>
    </div>
  );
}
