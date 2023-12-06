import React from "react";
import iconsPlatforms from "./iconsPlatforms.js";

const ConsoleLogos = ({ Platforms }) => {
  const consoles = Platforms.map((p) => {
    return iconsPlatforms(p);
  }).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return (
    <div className="flex w-fit items-center justify-start gap-2 mb-2">
      {consoles.map((plat) => {
        return (
          <img
            key={plat}
            className="w-4 h-auto"
            src={`/consoles/${plat}.svg`}
            alt={plat}
          />
        );
      })}
    </div>
  );
};

export default ConsoleLogos;
