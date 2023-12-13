import { Routes, Route } from "react-router-dom";
import PendingPage from "./PendingPage/PendingPage";
import SuccesfullPage from "./SuccesfullPage/SuccesfullPage";
import FailurePage from "./FailurePage/FailurePage";
import NotFound from "../NotFound/NotFound";

const Checkout = () => {
  return (
    <>
      <Routes>
        <Route path="/Pending" element={<PendingPage />} />
        <Route path="/Succesfull" element={<SuccesfullPage />} />
        <Route path="/Failure" element={<FailurePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Checkout;
