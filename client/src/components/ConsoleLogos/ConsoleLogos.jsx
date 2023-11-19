import React from "react";
import iconsPlatforms from "./iconsPlatforms.js";

const ConsoleLogos = ({ platforms }) => {
  const consoles = platforms
    .map((p) => {
      return iconsPlatforms(p);
    })
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  return (
    <div className="flex w-full items-center justify-start gap-2 p-2">
      {consoles.map((c) => {
        return (
          <img
            key={c}
            className="w-4 h-auto"
            src={`./consoles/${c}.svg`}
            alt={c}
          />
        );
      })}
    </div>
  );
};

export default ConsoleLogos;
