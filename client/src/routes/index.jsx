import { Route } from "react-router-dom";
import { lazy } from "react";

export const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    return (
      <Route path={route.path} key={index} element={<route.element />}></Route>
    );
  });
};

export const routes = [
  {
    path: "/",
    element: lazy(async () => await import("../views/Landing/Landing")),
  },
  {
    path: "/home",
    element: lazy(async () => await import("../views/Home/Home")),
  },
  {
    path: "/detail/:id",
    element: lazy(async () => await import("../views/Detail/Detail")),
  },
  {
    path: "/carrito",
    element: lazy(async () => await import("../views/Carrito/Carrito")),
  },
  {
    path: "/wishlist",
    element: lazy(async () => await import("../views/Wishlist/Wishlist")),
  },
  {
    path: "/perfil/*",
    element: lazy(async () => await import("../views/Perfil/Perfil.jsx")),
  },
  {
    path: "/checkout/*",
    element: lazy(async () => await import("../views/Checkout/Checkout")),
  },
  {
    path: "*",
    element: lazy(async () => await import("../views/NotFound/NotFound")),
  },
];
