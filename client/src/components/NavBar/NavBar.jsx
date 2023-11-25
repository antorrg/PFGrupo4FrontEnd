import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  User,
  DropdownItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";
// import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = true;
  const admin = true;

  const menuItems = [
    {
      element: "Favoritos",
      to: "/wishlist",
    },
    {
      element: "Pedidos",
      to: "/perfil/orders",
    },
    {
      element: "Configuración",
      to: "/perfil/settings",
    },
    {
      element: "Cerrar sesión",
      to: "/",
    },
  ];

  return (
    <Navbar
      position="static"
      height="5rem"
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Link to={"/"} className="cursor-pointer">
          <img src={logo} alt="logo" className="h-[50px] w-auto" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="hidden sm:flex gap-8">
        <NavbarItem>
          <Link to="/carrito">Carrito</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/home">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/wishlist">Wishlist</Link>
        </NavbarItem>
        {auth === false && (
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
        )}
        {auth === false && (
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="new">
                <Link to="/perfil/wishlist">Favoritos</Link>
              </DropdownItem>
              <DropdownItem key="copy">
                <Link to="/perfil/orders">Pedidos</Link>
              </DropdownItem>
              <DropdownItem key="edit">
                <Link to="/perfil/settings">Configuración</Link>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <Link to="/">Cerrar sesión</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarMenu className="mr-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              to={item.to}
              size="lg"
            >
              {item.element}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

{
  /* <div className="p-2 w-[80%] h-[10vh] max-h-[100px] flex justify-between items-center">
<nav className="font-semibold ">
  <ul className="hidden sm:flex gap-16 items-center justify-between">
    <li>
      <NavLink to={"/home"} className="font-bold cursor-pointer">
        home
      </NavLink>
    </li>
    <li>
      <Link to={"/carrito"} className="font-bold cursor-pointer">
        carrito
      </Link>
    </li>
    {auth && (
      <li>
        <Link to={"/wishlist"} className="font-bold cursor-pointer">
          wishlist
        </Link>
      </li>
    )}
    <li className="font-bold cursor-pointer">
      <Perfil />
    </li>
    {auth === false && (
      <li>
        <Link to={"/login"} className="font-bold cursor-pointer">
          Login | Join
        </Link>
      </li>
    )}
    <SearchBar />
  </ul>
</nav>
</div> */
}
