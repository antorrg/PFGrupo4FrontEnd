import { Routes, Route } from "react-router-dom";
import Create from "./Create/Create";
import AdminHome from "./AdminHome/AdminHome";
import PerfilNavbar from "../../components/PerfilNavbar/PerfilNavbar";
import Orders from "./Orders/Orders";

export default function Admin() {
  return (
    <>
      <div className="min-h-full min-w-full flex-1 flex flex-col items-center">
        <PerfilNavbar />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </>
  );
}
