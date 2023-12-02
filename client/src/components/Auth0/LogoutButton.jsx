import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@nextui-org/react";

const LogoutButton = ({element, to}) => {
  const { logout } = useAuth0();
1
  return (
      <Link 
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="text-danger" color="danger"
      >
      {element}
      </Link>
  );
};

export default LogoutButton;
