import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 flex-1">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Pagina no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
          Lo siento, no pudimos encontrar la pagina que estas buscando.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
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
    </main>
  );
};

export default NotFound;
