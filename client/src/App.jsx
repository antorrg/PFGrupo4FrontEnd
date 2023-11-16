import { Routes, Route } from "react-router-dom";
// Views ----------------------------
import Landing from "./views/Landing/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import Carrito from "./views/Carrito";
import Wishlist from "./views/Wishlist";
import NotFound from "./views/NotFound";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
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
