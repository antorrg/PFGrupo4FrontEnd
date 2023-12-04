import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { useLocation} from "react-router-dom";

const Breadcrum = () => {
    let url = "/";
    const currentlocation = useLocation().pathname
    const locations = useLocation().pathname.split("/").map(e => {
        if(url !== "/"){
            url = url + "/" + e
        } else {
            url = url + e
        }

        if(e === ""){
            return {
                name: "Home",
                path: "/home",
            }
        } else {
            return {
                name: e,
                path: url,
            }
        }
    })
  return (
  <>
  {
        currentlocation === "/home"|| currentlocation === "/"?
        null:
        <Breadcrumbs className="w-full ml-[10%] pb-2 self-start">
    {locations.map(items => {
      return <BreadcrumbItem href={items.path}>{items.name}</BreadcrumbItem>
    })}
    </Breadcrumbs>
    }
  </> )
}

export default Breadcrum
