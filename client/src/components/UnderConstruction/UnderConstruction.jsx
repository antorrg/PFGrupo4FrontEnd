import React from "react";
import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[42rem] my-8">
      <img
        src={`./Mario.png`}
        alt="Under Construction"
        className="mb-4 h-[300px] w-[300px] object-contain"
      />
      <h3 className="text-4xl font-bold text-secondary">¡En Construcción!</h3>
      <p className="text-center w-[300px] mt-4">
        Estamos trabajando en esta sección y estará disponible próximamente.
        Gracias por tu paciencia.
      </p>
      <div class="mt-5 flex items-center justify-center gap-x-6">
        <Link
          to="/home"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Ir hacia Home
        </Link>
        <a
          href="#"
          className="text-sm font-semibold text-gray-900 dark:text-white"
        >
          Contactar con soporte <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default UnderConstruction;
