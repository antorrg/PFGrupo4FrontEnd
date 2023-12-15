import img from "../../Landing/all_games.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import setAuthHeader from "../../../utils/AxiosUtils";
import { Spinner } from "@nextui-org/react";
import { useContext } from "react";
import { CartContext } from "../../../context/contextCart";

const SuccesfullPage = () => {
  const token = localStorage.getItem("validToken");

  const searchParams = new URLSearchParams(window.location.search);
  const paymentId = searchParams.get("payment_id");
  const arrayExternalData = searchParams.get("external_reference").split("-_");
  const externalReference = arrayExternalData[0];

  const [paymentResult, setPaymentResult] = useState({});
  const { clearCart } = useContext(CartContext);

  const showResultHandler = (auxPaymentResult) => {
    setPaymentResult(auxPaymentResult);
  };

  const validePaymentResult = async () => {
    try {
      const data = await axios.get(
        `/getParchuseOrder?payment_id=${paymentId}&external_reference=${externalReference}`,
        setAuthHeader(token)
      );

      if (data.data.orderData.status === "waiting") {
        const waitTime = setTimeout(() => {
          validePaymentResult();
        }, 2000);
      } else {
        showResultHandler(data.data);
      }

      //return () => clearTimeout(waitTime);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    validePaymentResult();
    localStorage.removeItem("cart");
    clearCart();
  }, []);

  return (
    <div className="max-w-[1200px] h-full flex-1 flex flex-col">
      <div className="flex-1 min-h-full flex flex-col text-left items-center justify-center lg:flex-row lg:gap-16 overflow-hidden">
        <div className="h-[300px] w-full lg:w-[50%] lg:h-[1050px]">
          <img
            src={img}
            alt="img_orders"
            className="h-full w-full object-cover"
          />
        </div>
        {paymentResult.orderData ? (
          <div className="flex flex-col max-w-[42rem] h-full flex-1 py-16 px-4 ">
            <div>
              <h1 className="text-[#5825CC] font-bold text-3xl">
                Pago exitoso
              </h1>
              <p className="font-bold text-4xl mt-2 sm:text-5xl">
                Gracias por comprar
              </p>
              <p className="text-base text-gray-500 mt-2">
                Agradecemos su pedido, ya hemos procesado tu pedido. Disfruta
                del producto y Gracias por Comprar!
              </p>
              <dt className="mt-16">
                <dt className="font-medium">Numero de Transacción</dt>
                <dd className="mt-2 text-[#5825CC] font-medium">
                  {paymentResult.orderData.transactionId}
                </dd>
              </dt>
              <ul>
                <div>
                  {paymentResult.videogamesData.map((game) => {
                    return (
                      <li
                        className="flex gap-4 py-6 justify-between border-t"
                        key={game.name}
                      >
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-[96px] h-[96px] object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{game.name}</h3>
                          <p className="text-accent">
                            {game.physicalGame ? "FISICO" : "DIGITAL"}
                          </p>
                          <p>{game.quantity} unidades</p>
                        </div>
                        <p className="font-medium">{`$${
                          game.unitPrice * game.quantity
                        } ${game.currencyId}`}</p>
                      </li>
                    );
                  })}
                </div>
              </ul>
              <dl className="pt-6 border-t">
                <div className="flex justify-between items-center pt-6 mt-6 border-t">
                  <dt className="font-bold text-lg">Total</dt>
                  <dd className="font-bold text-lg">
                    {`$${paymentResult.orderData.totalCost} 
                      ${paymentResult.videogamesData[0].currencyId}`}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 w-full items-center justify-center h-full">
            <Spinner color="secondary" size="lg" className="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccesfullPage;
