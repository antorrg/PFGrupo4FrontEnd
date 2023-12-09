import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// components -------------------------------------------------
import PerfilNavbar from "../../components/PerfilNavbar/PerfilNavbar";
import Orders from "./Orders/Orders";
import Settings from "./Settings/Settings";
import Create from "./Admin/Create/Create";
import AdminHome from "./Admin/AdminHome";
import NotFound from "../NotFound/NotFound";
import Qualification from "./Qualification/Qualification";

export default function Perfil() {
  const userInfo = useSelector((state) => state.loginUser);
  console.log(userInfo);
  return (
    <>
      <div className="min-h-full min-w-full flex-1 flex flex-col items-center">
        <PerfilNavbar />
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/qualification" element={<Qualification />} />
          {userInfo.role === 1 && (
            <>
              <Route path="/games" element={<AdminHome />} />
              <Route path="/create" element={<Create />} />
            </>
          )}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
