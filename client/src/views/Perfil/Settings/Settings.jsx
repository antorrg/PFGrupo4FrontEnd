import React from "react";
import UserEdit from "../../../components/Form/UserEdit";
import PasswordEdit from "../../../components/Form/PasswordEdit";
const Settings = () => {
  return (
   <div className="w-full my-6 ">
    <div className="max-w-[42rem] mx-auto p-8 text-left lg:max-w-[56rem] dark:bg-[#0B0120] rounded-3xl">
    <UserEdit/>
    {/* <PasswordEdit/> */}
    </div>
   </div>
  );
};

export default Settings;
