import { Link } from "react-router-dom";
import LogoutButton from "../Auth0/LogoutButton";
import LoginButton from "../Auth0/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
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
  DropdownSection,
} from "@nextui-org/react";
// import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const auth = true;
  const admin = "1";

  const { user, isAuthenticated } = useAuth0();

  const { cart } = useContext(CartContext);

  const perfilItems = [
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
      element: "Lista de Juegos",
      to: "/perfil/",
      access: "admin",
    },
    {
      element: "Ingresar Juego",
      to: "/perfil/create",
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
          <img src={logo} alt="logo" className="h-[70px] w-auto" />
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
        {!isAuthenticated ? (
          <NavbarItem>
            <LoginButton />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <LogoutButton />
          </NavbarItem>
        )}
      </NavbarContent>
      {isAuthenticated && (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user.picture,
              }}
              className="transition-transform"
              name={user.given_name}
              description={user.nickname && user.nickname}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection>
              {isAuthenticated &&
                perfilItems.map((item) => (
                  <DropdownItem key={item.element}>
                    <Link to={item.to}>{item.element}</Link>
                  </DropdownItem>
                ))}
            </DropdownSection>
            {admin === "1" && (
              <DropdownSection title="Admin zone" className="border-t">
                {perfilItems.map(
                  (item) =>
                    item.access === "admin" && (
                      <DropdownItem key={item.element}>
                        <Link to={item.to}>{item.element}</Link>
                      </DropdownItem>
                    )
                )}
              </DropdownSection>
            )}
          </DropdownMenu>
        </Dropdown>
      )}
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
