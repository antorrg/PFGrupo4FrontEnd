
// import { Link } from "react-router-dom";
import LogoutButton from "../Auth0/LogoutButton";
import LoginButton from "../Auth0/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useContext } from "react";
import logo from "./logo.png";
import FormularioLogin from "../Form/FormRegister";
import Modal from "../../Modal/Modal";
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
  Link,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
// import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {

  const loginUser = useSelector((state) => state.loginUser);
  const userLocal = loginUser.result
  console.log(userLocal)
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  const admin = "1";

  const { user, isAuthenticated } = useAuth0();
  const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(false);
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
  const url =
    "https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg";
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
        <Link href={"/"} className="cursor-pointer">
          <img src={logo} alt="logo" className="h-[70px] w-auto" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="hidden sm:flex gap-10 sm:mr-8">
        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link href={item.to}>
              {<item.icon className="w-8 hover:text-orange-400" />}
              {item.element === "Carrito" && cart.length > 0 && (
                <p className="absolute -top-1 -right-3 bg-red-300 rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-semibold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              )}
            </Link>
          </NavbarItem>
        ))}
        {!isAuthenticated && !isAuthenticatedLocal ? (
          <>
            <Modal
              textButton="Ingresar/Registrarse"
              title="Ingrese su Email y Passsword"
              body={
                <FormularioLogin
                  setIsAuthenticatedLocal={setIsAuthenticatedLocal}
                />
              }
            />
          </>
        ) : (
          <NavbarItem>
            <LogoutButton />
          </NavbarItem>
        )}
      </NavbarContent>
      {(isAuthenticated || isAuthenticatedLocal) && (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: isAuthenticated ? user.picture : loginUser.picture,
              }}
              className="transition-transform"
              name={isAuthenticated ? user.given_name : loginUser.given_name}
              description={isAuthenticated ? user.nickname : loginUser.nickname}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection>
              {perfilItems.map(
                (item) =>
                  item.access === "all" && (
                    <DropdownItem key={item.element}>
                      <Link href={item.to}>{item.element}</Link>
                    </DropdownItem>
                  )
              )}
            </DropdownSection>
            {admin === "0" && (
              <DropdownSection title="Admin zone" className="border-t">
                {perfilItems.map(
                  (item) =>
                    item.access === "admin" && (
                      <DropdownItem key={item.element}>
                        <Link href={item.to}>{item.element}</Link>
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
              href={item.to}
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
