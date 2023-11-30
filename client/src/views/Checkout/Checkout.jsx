import { Routes, Route } from "react-router-dom";
import Pending from "./PendingPage/PendingPage";
import Succesfull from "./SuccesfullPage/SuccesfullPage";
import Failure from "./FailurePage/FailurePage";
import NotFound from "../NotFound/NotFound";

const Checkout = () => {
  return (
    <>
      <Routes>
        <Route path="/Pending" element={<Pending />} />
        <Route path="/Succesfull" element={<Succesfull />} />
        <Route path="/Failure" element={<Failure />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Checkout;
