// hooks ----------------------------------------
import { Routes, Route } from "react-router-dom";
// views ----------------------------------------
import {
  Landing,
  Home,
  Detail,
  Carrito,
  Wishlist,
  NotFound,
  Footer,
  NavBar,
} from "./views/index";
import "./app.css";

function App() {
  return (
    <div className="app_container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
