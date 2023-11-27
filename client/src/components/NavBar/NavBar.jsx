import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "./logo.png";
import { CartContext } from "../../context/contextCart";
import {
  HeartIcon,
  HomeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
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
  Badge,
} from "@nextui-org/react";
// import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = true;
  const admin = true;

  const { cart } = useContext(CartContext);

  const perfilItems = [
    {
      element: "Wishlist",
      to: "/wishlist",
      access: "all",
    },
    {
      element: "Pedidos",
      to: "/perfil/orders",
      access: "all",
    },
    {
      element: "Configuración",
      to: "/perfil/settings",
      access: "all",
    },
    {
      element: "List Games",
      to: "/perfil/create",
      access: "admin",
    },
    {
      element: "Create Game",
      to: "/perfil/",
      access: "admin",
    },
  ];
  const navItems = [
    {
      element: "Home",
      icon: HomeIcon,
      to: "/home",
    },
    {
      element: "Wishlist",
      icon: HeartIcon,
      to: "/wishlist",
    },
    {
      element: "Carrito",
      icon: ShoppingCartIcon,
      to: "/carrito",
    },
  ];

  return (
    <Navbar
      position="static"
      height="6rem"
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link to={"/"} className="cursor-pointer">
          <img src={logo} alt="logo" className="h-[50px] w-auto" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="hidden sm:flex gap-10 sm:mr-8">
        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link to={item.to}>
              {<item.icon className="w-8 hover:text-orange-400" />}
            </Link>
          </NavbarItem>
        ))}
        {/* <NavbarItem>
          <Link to="/home">
            <HomeIcon className="w-8 hover:text-orange-400" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/carrito" className="flex gap-2 cursor-pointer">
            <ShoppingCartIcon className="w-8 hover:text-orange-400" />
            {cart.length > 0 ? (
              <Badge
                content={cart.length}
                color="danger"
                shape="circle"
                placement="top-right"
              ></Badge>
            ) : (
              ""
            )}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/wishlist">
            <HeartIcon className="w-8 hover:text-orange-400" />
          </Link>
        </NavbarItem> */}
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
      </NavbarContent>
      <Dropdown>
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            name="Carl Johnsonn"
            description="Product Designer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          {perfilItems.map((item, index) =>
            admin === true ? (
              <DropdownItem key={`${item}-${index}`}>
                <Link to={item.to}>{item.element}</Link>
              </DropdownItem>
            ) : item.access === "all" ? (
              <DropdownItem key={`${item}-${index}`}>
                <Link to={item.to}>{item.element}</Link>
              </DropdownItem>
            ) : null
          )}

          {/* <DropdownItem key="copy">
                <Link to="/perfil/orders">Pedidos</Link>
              </DropdownItem>
              <DropdownItem key="edit">
                <Link to="/perfil/settings">Configuración</Link>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <Link to="/">Cerrar sesión</Link>
              </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
      <NavbarMenu className="mr-4">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}-Menu`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === perfilItems.length - 1
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
