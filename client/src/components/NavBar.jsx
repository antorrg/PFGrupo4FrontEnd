import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to={"/"}>GameWorld </Link>
      <NavLink to={"/home"}>Home</NavLink>
    </div>
  );
}
