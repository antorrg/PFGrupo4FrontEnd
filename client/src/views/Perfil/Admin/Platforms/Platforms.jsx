import React from "react";
import PlatformTable from "./PlatformTable/PlatformTable";
import FormPlatform from "../../../../components/Form/FormPlatForm";
const Platforms = () => {
  return (
    <div className="w-full my-6">
      <div className="max-w-[42rem] mx-auto px-6 text-left lg:max-w-[56rem] flex flex-col gap-4">
        <div className="dark:bg-secondary rounded-2xl">
         <FormPlatform/>
        </div>
        <PlatformTable />
      </div>
    </div>
  );
};

export default Platforms;
