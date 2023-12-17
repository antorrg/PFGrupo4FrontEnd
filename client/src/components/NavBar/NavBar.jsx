import LogoutButton from "../Auth0/LogoutButton";
import LoginButton from "../Auth0/LoginButton";
import DarkModeButton from "./DarkModeButton";
import SearchBar from "../SearchBar/SearchBar";
import PopoverCart from "./PopoverCart";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { useState, useContext } from "react";
import logo from "./logo.png";
import FormularioLogin from "../Form/FormLogin";
import Modal from "../../Modal/Modal";
import { CartContext } from "../../context/contextCart";
import {
  HeartIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  PlusIcon,
  SparklesIcon,
  ListBulletIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userLogin = useSelector((state) => state.loginUser);
  const userInfo = userLogin;

  const { isAuthenticated } = useAuth0();
  const { cart } = useContext(CartContext);

  const perfilItems = [
    {
      element: "Deseados",
      to: "/wishlist",
      access: "all",
      icon: HeartIcon,
    },
    {
      element: "Pedidos",
      to: "/perfil/orders",
      access: "all",
      icon: CurrencyDollarIcon,
    },
    {
      element: "Calificar",
      to: "/perfil/qualification",
      access: "all",
      icon: SparklesIcon,
    },
    {
      element: "Configuración",
      to: "/perfil/",
      access: "all",
      icon: UserIcon,
    },
    {
      element: "Salir",
      to: "/",
      access: "all",
      icon: ArrowLeftOnRectangleIcon,
    },
    {
      element: "Lista de Juegos",
      to: "/perfil/games",
      access: "admin",
      icon: BuildingStorefrontIcon,
    },
    {
      element: "Lista de Generos",
      to: "/perfil/genres",
      access: "admin",
      icon: ListBulletIcon,
    },
    {
      element: "Lista de Plataformas",
      to: "/perfil/platforms",
      access: "admin",
      icon: ListBulletIcon,
    },
    {
      element: "Lista de Usuarios",
      to: "/perfil/users",
      access: "admin",
      icon: UsersIcon,
    },
    {
      element: "Ingresar Juego",
      to: "/perfil/create",
      access: "admin",
      icon: PlusIcon,
    },
  ];

  const navItems = [
    {
      element: "Home",
      icon: HomeIcon,
      to: "/home",
    },
    {
      element: "Deseados",
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
      height="5rem"
      maxWidth="2xl"
      classNames={{
        base: "px-5 sm:px-20 ",
        wrapper: "p-0",
      }}
      onMenuOpenChange={setIsMenuOpen}
      className="dark:bg-primary"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand className="justify-start">
        <Link href={"/"} className="cursor-pointer">
          <img src={logo} alt="logo" className="h-[60px] w-auto" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-10">
        <NavbarContent justify="end" className="hidden sm:flex gap-10">
          {navItems.map((item, index) => {
            return item.element === "Carrito" ? (
              <NavbarItem key={`${item}-${index}`}>
                {cart.length > 0 ? (
                  <Link href={item.to} className="flex">
                    <item.icon className="w-7 hover:text-accent dark:text-secondary dark:hover:text-orange-400" />
                    <p className="absolute -top-1 -right-3 bg-red-300 rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-semibold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                  </Link>
                ) : (
                  <PopoverCart
                    icon={
                      <item.icon className="w-7 hover:text-accent dark:text-secondary dark:hover:text-orange-400" />
                    }
                  />
                )}
              </NavbarItem>
            ) : (
              <NavbarItem key={`${item}-${index}`}>
                <Link href={item.to} className="flex">
                  {
                    <item.icon className="w-7 hover:text-accent dark:text-secondary dark:hover:text-orange-400" />
                  }
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        {userInfo.length === 0 ? (
          <>
            <Modal
              textButton="Ingresar/Registrarse"
              title="Bienvenido inicie secion "
              body={({ onClose }) => <FormularioLogin onClose={onClose} />}
            />
          </>
        ) : (
          <Dropdown backdrop="blur ">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: userInfo.picture && userInfo.picture,
                }}
                className="transition-transform"
                name={userInfo.given_name && userInfo.given_name}
                description={userInfo.nickname && userInfo.nickname}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection aria-label="Dark Mode">
                <DropdownItem
                  key="Dark mode button"
                  className="cursor-default"
                  isReadOnly
                  endContent={<DarkModeButton />}
                >
                  <p className="text-base text-primary dark:text-white">Tema</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="client role" className="border-t">
                {perfilItems.map((item) => {
                  return (
                    item.access === "all" && (
                      <DropdownItem
                        key={item.element}
                        startContent={<item.icon className="w-5" />}
                      >
                        {item.element !== "Salir" ? (
                          <Link href={item.to} className="dark:text-white">
                            {item.element}
                          </Link>
                        ) : (
                          <LogoutButton element={item.element} to={item.to} />
                        )}
                      </DropdownItem>
                    )
                  );
                })}
              </DropdownSection>
              {userInfo.role === 0 && (
                <DropdownSection
                  title="Admin zone"
                  className="border-t"
                  aria-label="roll admin"
                >
                  {perfilItems.map(
                    (item) =>
                      item.access === "admin" && (
                        <DropdownItem
                          key={item.element}
                          startContent={<item.icon className="w-5" />}
                        >
                          <Link href={item.to} className="dark:text-white">
                            {item.element}
                          </Link>
                        </DropdownItem>
                      )
                  )}
                </DropdownSection>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarMenu className="mr-4">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}-Menu`}>
            <Link
              className="w-full dark:text-white"
              href={item.to}
              size="lg"
            >
              <item.icon className="w-5 mr-2" /> {item.element}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
