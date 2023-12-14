import React from "react";
import UserEdit from "../../../components/Form/UserEdit";
import PasswordEdit from "../../../components/Form/PasswordEdit";
const Settings = () => {
  return (
    <div className="sm:border dark:border-none sm:dark:bg-[#0B0120] max-w-[42rem] lg:max-w-[50rem] w-full sm:my-8 rounded-3xl">
  <header className="dark:text-white mx-auto w-fit my-8">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-secondary">
      Editar Usuario
    </h1>
  </header>
  <main>
    <div className="w-full my-6 flex-1 flex items-center">
      <div className="max-w-[42rem] w-full mx-auto p-8 text-left lg:max-w-[56rem] dark:bg-[#0B0120] rounded-3xl flex h-fit flex-col">
        <UserEdit />
        <PasswordEdit />
      </div>
    </div>
  </main>
</div>

  );
};

export default Settings;
