import React from "react";
import iconsPlatforms from "./iconsPlatforms.js";

const ConsolesLogos = ({ Platforms }) => {
  const consoles = Platforms.map((p) => {
    return iconsPlatforms(p.name);
  }).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return (
    <div className="flex w-full items-center justify-evenly mt-2">
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

export default ConsolesLogos;
