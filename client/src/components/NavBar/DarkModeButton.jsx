import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const DarkModeButton = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handlerClick = () => {
    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
  };

  useEffect(() => {
    if(localStorage.theme === "dark"){
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  },[])

  return (
    <Switch
      isSelected={isSelected}
      className="cursor-pointer"
      onValueChange={setIsSelected}
      onClick={handlerClick}
      size="sm"
      color="primary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    ></Switch>
  );
};

export default DarkModeButton;
