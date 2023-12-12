import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { limpiarLogin } from "../../redux/actions";

const LogoutButton = () => {
  const { logout } = useAuth0();
 const dispatch = useDispatch()
  return (
      <Link 
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } })
        dispatch(limpiarLogin())
        //limpiar el localStorage:
        localStorage.removeItem('validToken');
      }
        
      }
      className="text-danger flex" color="danger"
      >
        Salir
      </Link>
  );
};

export default LogoutButton;
