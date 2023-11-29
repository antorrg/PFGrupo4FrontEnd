import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      color="primary"
      href="#"
      variant="flat"
    >
      Salir
    </Button>
  );
};

export default LogoutButton;
