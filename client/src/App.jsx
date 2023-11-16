import { Routes, Route } from "react-router-dom";
// Views ----------------------------
import Landing from "./views/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import Carrito from "./views/Carrito";
import Wishlist from "./views/Wishlist";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/carrito" element={<Carrito/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
