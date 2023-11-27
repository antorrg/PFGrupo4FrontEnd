import axios from "axios";
import Swal from "sweetalert2";
import Formulario from "../../../components/Form/Form";
import Modal from "../../../Modal/Modal";
import { useState } from "react";

const ElementGame = ({ game }) => {
  const {
    id,
    name,
    image,
    price,
    physicalGame,
    description,
    platforms,
    genres,
    released,
    stock,
  } = game;
  const propsGame = {
    name,
    image,
    price,
    physicalGame,
    description,
    stock,
    platforms,
    genres,
    released,
  };
  const [form, setForm] = useState(false);

  const handlerDelete = () => {
    try {
      axios.delete(`/games/${id}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Videojuego eliminado con exito !!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  const handlePortal = () => {
    setForm(!form);
  };
  return (
    <div className="border p-4 my-4 flex items-center">
      <div className="flex-shrink-0">
        <h4 className="text-xl font-bold mb-2">{name}</h4>
        <h4 className="text-lg mb-2">{price}</h4>
        {physicalGame ? (
          <h4 className="text-green-500"> Juego Fisico  Stock: {stock} </h4>
        ) : (
          <h4 className="text-blue-500"> Juego Digital </h4>
        )}
      </div>

      <div className="ml-auto flex items-center">
        {form && (
          <Modal>
            <Formulario props={propsGame} handlePortal={handlePortal} id={id} />
          </Modal>
        )}
        <button
          onClick={handlePortal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Editar Juego
        </button>
        <button
          onClick={handlerDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
export default ElementGame;
