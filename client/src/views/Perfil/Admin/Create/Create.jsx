import Formulario from "../../../../components/Form/Form";
const Create = () => {
  return (
    <div className="sm:border dark:border-none sm:dark:bg-[#0B0120] max-w-[42rem] lg:max-w-[50rem] w-full sm:my-8 rounded-3xl">
      <header className="dark:text-white mx-auto w-fit my-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-secondary">
            Creación
          </h1>
      </header>
      <main>
        <div className="mx-auto pb-6 sm:px-6 lg:px-8">
          <Formulario />
          {/* volver a poner el formulario despues de provar*/}
        </div>
      </main>
    </div>
  );
};

export default Create;
