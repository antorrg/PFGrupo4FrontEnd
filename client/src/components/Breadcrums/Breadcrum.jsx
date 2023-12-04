import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

const Breadcrum = () => {
  let url = "/";
  const currentLocation = useLocation().pathname;
  const locations = useLocation()
    .pathname.split("/")
    .map((e) => {
      if (url !== "/") {
        url = url + "/" + e;
      } else {
        url = url + e;
      }

      if (e === "" && url === "/") {
        return {
          name: "Home",
          path: "/home",
        };
      } else {
        return {
          name: e,
          path: url,
        };
      }
    });
  return (
    <div className="max-w-[1536px] flex items-center w-full px-5 sm:px-20">
      {currentLocation === "/home" || currentLocation === "/" ? null : (
        <Breadcrumbs className="w-full pb-2 self-start">
          {locations.map((items, index) => (
            <BreadcrumbItem
              key={index}
              href={items.path}
              isDisabled={items.name === "detail"}
            >
              {items.name === "Home" ? (
                <HomeIcon className="w-6 text-accent" />
              ) : (
                <p className="text-white/80 hover:text-accent">{items.name}</p>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      )}
    </div>
  );
};

export default Breadcrum;
