import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const PopoverCart = ({ icon }) => {
  return (
    <Popover
      placement="bottom-end"
      showArrow={true}
      backdrop="blur"
      classNames={{
        base: [
          // arrow color
          "before:bg-default-200",
          "w-[350px]",
        ],
        content: [
          "h-[150px]",
          "bg-secondary text-white",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}
    >
      <PopoverTrigger>{icon}</PopoverTrigger>
      <PopoverContent>
        <div className="text-center h-full flex flex-col">
          {/* <h3 className="text-2xl font-bold text-left pt-4">
            Mi carrito de compras
          </h3> */}

          <div className="flex-1 flex items-center justify-center flex-col">
            <InformationCircleIcon className="w-10 h-10" />
            <h3 className="text-xl font-bold my-3">
              Tu carrito de compras está vacío
            </h3>
            <p className="text-sm mb-2">
              Parece que aún no has elegido tus productos.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCart;
