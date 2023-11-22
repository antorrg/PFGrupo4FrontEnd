import { NavLink, Link } from "react-router-dom";
import logo from "./logo.png";
// import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const auth = true;
  const admin = true;
  return (
    <div className="p-2 w-[80%] h-[10vh] max-h-[100px] flex justify-between items-center">
      <Link to={"/"} className=" h-full font-bold cursor-pointer">
        <img src={logo} alt="logo" className="h-full w-auto" />
      </Link>
      <div className="hidden font-semibold sm:flex gap-16 items-center justify-between">
        <NavLink to={"/home"} className="font-bold cursor-pointer">
          home
        </NavLink>
        {auth && (
          <Link to={"/carrito"} className="font-bold cursor-pointer">
            carrito
          </Link>
        )}
        {auth && (
          <Link to={"/wishlist"} className="font-bold cursor-pointer">
            wishlist
          </Link>
        )}
        {admin && (
          <Link to={"/admin"} className="font-bold cursor-pointer">
            admin
          </Link>
        )}
        {auth === false && (
          <Link to={"/login"} className="font-bold cursor-pointer">
            Login | Join
          </Link>
        )}
        {/* <SearchBar /> */}
      </div>
    </div>
  );
}
