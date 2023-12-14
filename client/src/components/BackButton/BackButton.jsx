import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={goBack}
      color="secondary"
      aria-label="Volver"
      startContent={<FaArrowLeft />}>
      Volver
    </Button>
  );
};

export default BackButton;
