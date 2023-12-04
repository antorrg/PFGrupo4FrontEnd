import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";
import {
  UserIcon
} from "@heroicons/react/24/outline";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="p-0"
      href="#"
      variant="invisible"
    >
      {
        <div className="text-primary flex items-center gap-1 hover:text-accent">
          <UserIcon className="w-7"></UserIcon>
          <p>Ingresar/Registrarse</p>
        </div>
      }
    </Button>
  );
};

export default LoginButton;
