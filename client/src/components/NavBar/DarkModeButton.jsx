import React from 'react'
import {Switch} from "@nextui-org/react";
import {
    MoonIcon,
    SunIcon,
  } from "@heroicons/react/24/outline";
  import { useState } from "react";

const DarkModeButton = () => {
    const [isSelected, setIsSelected] = useState(true)
    console.log(isSelected)
    const handlerClick = () => {
        document.documentElement.classList.toggle("dark")
    }
  return (
    <Switch
    //   defaultSelected
      className="cursor-pointer"
      onValueChange={setIsSelected}
      onClick={handlerClick}
      size="sm"
      color="primary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    >
    </Switch>
  )
}

export default DarkModeButton
