// import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

const navigation = [
  {
    name: "Configuración",
    to: "/perfil/",
    current: false,
    access: "all",
  },
  {
    name: "Pedidos",
    to: "/perfil/orders",
    current: false,
    access: "all",
  },
  { name: "Juegos", to: "/perfil/", current: false, access: "admin" },
  {
    name: "Ingresar Juego",
    to: "/perfil/create",
    current: false,
    access: "admin",
  },
];

const PerfilNavbar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Navbar className="hidden sm:flex bg-[#0B0120]">
      <NavbarContent className="flex gap-10" justify="center">
        {navigation.map((navItem) => {
          return (
            <NavbarItem key={navItem.name}>
              <Link color="foreground" href={navItem.to}>
                <p className="text-white">{navItem.name}</p>
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
    </Navbar>
  );
};

export default PerfilNavbar;
