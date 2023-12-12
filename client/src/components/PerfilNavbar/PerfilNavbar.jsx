// import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import {
  HeartIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Configuración",
    to: "/perfil/",
    access: "all",
    icon: Cog6ToothIcon,
  },
  {
    name: "Pedidos",
    to: "/perfil/orders",
    access: "all",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Calificar",
    to: "/perfil/qualification",
    access: "all",
    icon: SparklesIcon,
  },
  {
    name: "Lista de Juegos",
    to: "/perfil/games",
    access: "admin",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Ingresar Juego",
    to: "/perfil/create",
    access: "admin",
    icon: PlusIcon,
  },
];

const PerfilNavbar = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { user, isAuthenticated } = useAuth0();

  return (
    <Navbar
      className="hidden sm:flex bg-[#0B0120]"
      classNames={{
        base: "hidden sm:flex bg-[#0B0120] px-20",
        wrapper: "max-w-[1536px] p-0",
      }}
    >
      <NavbarContent className="flex gap-10" justify="center">
        {(loginUser.role === 0 || loginUser.role === 1) &&
          navigation.map((navItem) => {
            return (
              navItem.access === "all" && (
                <NavbarItem key={navItem.name}>
                  <Link
                    color="foreground"
                    href={navItem.to}
                    className="flex items-center"
                  >
                    <navItem.icon className="w-6 h-6 text-accent" />
                    <p className="text-white ml-4">{navItem.name}</p>
                  </Link>
                </NavbarItem>
              )
            );
          })}
      </NavbarContent>
      <NavbarContent className="flex gap-10" justify="center">
        {loginUser.role === 0 && (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" color="success">
                Administrador
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Admin Actions">
              {navigation.map((navItem) => {
                return (
                  navItem.access === "admin" && (
                    <DropdownItem
                      key={navItem.name}
                      startContent={<navItem.icon className="w-5 h-5" />}
                    >
                      {navItem.name}
                    </DropdownItem>
                  )
                );
              })}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default PerfilNavbar;
