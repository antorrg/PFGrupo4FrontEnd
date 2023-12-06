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
  Link
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
    access: "all" 
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
    <Navbar className="hidden sm:flex">
      <NavbarContent className="flex gap-10" justify="center">
        {
          navigation.map(navItem => {
            return <NavbarItem>
                      <Link color="foreground" href={navItem.to}>
                        {navItem.name}
                      </Link>
                    </NavbarItem> 
          })
        }
      </NavbarContent>
    </Navbar>
  );
};

export default PerfilNavbar;
