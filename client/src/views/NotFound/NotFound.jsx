import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Pagina no encontrada
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          Lo siento, no pudimos encontrar la pagina que estas buscando.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/home"
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ir hacia Home
          </Link>
          <a href="#" class="text-sm font-semibold text-gray-900">
            Contactar con soporte <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
