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
import Platforms from "./Admin/Platforms/Platforms";
import Genres from "./Admin/Genres/Genres";
import Users from "./Admin/Users/Users";

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
          {userInfo.role === 0 && (
            <>
              <Route path="/games" element={<AdminHome />} />
              <Route path="/create" element={<Create />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/users" element={<Users />} />
            </>
          )}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
