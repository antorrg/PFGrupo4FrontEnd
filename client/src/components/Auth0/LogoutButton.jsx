import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { limpiarLogin } from "../../redux/actions";

const LogoutButton = ({element, to}) => {
  const { logout } = useAuth0();
 const dispatch = useDispatch()
  return (
      <Link 
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } })
        dispatch(limpiarLogin())
      }
        
      }
      className="text-danger" color="danger"
      >
      {element}
      </Link>
  );
};

export default LogoutButton;
