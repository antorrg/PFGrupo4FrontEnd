import React from "react";
import iconsPlatforms from "./iconsPlatforms.js";

const ConsoleLogos = ({ Platforms }) => {
  const consoles = Platforms.map((p) => {
    return iconsPlatforms(p);
  }).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return (
    <div className="flex w-full items-center justify-start gap-2 p-2 bg-[#1F0A4D]">
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
