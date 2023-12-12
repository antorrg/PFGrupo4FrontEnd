import React from "react";
import PlatformTable from "./PlatformTable/PlatformTable";
const Platforms = () => {
  return (
    <div className="w-full my-6">
      <div className="max-w-[42rem] mx-auto px-6 text-left lg:max-w-[56rem]">
        <PlatformTable />
      </div>
    </div>
  );
};

export default Platforms;
