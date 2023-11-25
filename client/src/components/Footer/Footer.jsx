import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-[#5825cc] w-full h-[100px] flex items-center justify-center text-center">
      <div className="flex items-center justify-between w-[80%] text-[#9f9f9f]">
        <Link to="#">politíca de privacidad</Link>
        <Link to="#">Términos y condiciones</Link>
        <p>Copyright © GameWorld</p>
      </div>
    </div>
  );
};

export default Footer;
