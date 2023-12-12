import img from "../../Landing/all_games.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import setAuthHeader from '../../../utils/AxiosUtils.jsx'


const FailurePage = () => {
  const token = localStorage.getItem('validToken');

  const searchParams = new URLSearchParams(window.location.search);
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  const [paymentResult, setPaymentResult] = useState({});

  const showResultHandler = (auxPaymentResult) => {
    setPaymentResult(auxPaymentResult)
  }

  const validePaymentResult = async () => {
    try {
      const data = await axios.get(`/getParchuseOrder?payment_id=${paymentId}&external_reference=${externalReference}`, setAuthHeader(token));
      
      if(data.data.orderData.status === "waiting"){
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
  }, []);

  return (
    <div>
      <div className="max-w-[1200px]">
        <div className="flex-1  min-h-full flex flex-col text-left items-center justify-center lg:flex-row lg:gap-16 overflow-hidden">
          <div className="h-[300px] w-full lg:w-[50%] lg:h-[1050px]">
            <img
              src={img}
              alt="img_orders"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[42rem] h-full flex-1 py-16 px-4 ">
            <div>
              <h1 className="text-[#5825CC] font-medium">Pago exitoso</h1>
              <p className="font-bold text-4xl mt-2 sm:text-5xl">
                Gracias por comprar
              </p>
              <p className="text-base text-gray-500 mt-2">
                Agradecemos su pedido, actualmente lo estamos procesando. ¡Así
                que espera y te enviaremos la confirmación muy pronto!
              </p>
              <dt className="mt-16">
                <dt className="font-medium">Numero de Traking</dt>
                <dd className="mt-2 text-[#5825CC] font-medium">
                  51547878755545848512
                </dd>
              </dt>
              <ul>
                {paymentResult.orderData ? <div>{paymentResult.orderData.status}</div> : 
                  <div>
                    <li className="flex gap-4 py-6 justify-between border-t">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg"
                        alt=""
                        className="w-[96px] h-[96px] object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">Basic Tee</h3>
                        <p>Charcoal</p>
                        <p>L</p>
                      </div>
                      <p className="font-medium">$36.00</p>
                    </li>
                    <li className="flex gap-4 py-6 justify-between border-t">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg"
                        alt=""
                        className="w-[96px] h-[96px] object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">Basic Tee</h3>
                        <p>Charcoal</p>
                        <p>L</p>
                      </div>
                      <p className="font-medium">$36.00</p>
                    </li>
                    <li className="flex gap-4 py-6 justify-between border-t">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg"
                        alt=""
                        className="w-[96px] h-[96px] object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">Basic Tee</h3>
                        <p>Charcoal</p>
                        <p>L</p>
                      </div>
                      <p className="font-medium">$36.00</p>
                    </li>
                  </div>
                }
              </ul>
              <dl className="pt-6 border-t">
                <div className="flex justify-between items-center">
                  <dt className="font-medium text-gray-500">Subtotal</dt>
                  <dd className="font-medium ">$76.00</dd>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <dt className="font-medium text-gray-500">Envio</dt>
                  <dd className="font-medium text-gray-500">$8.00</dd>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <dt className="font-medium text-gray-500">Tarifas</dt>
                  <dd className="font-medium text-gray-500">$6.40</dd>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t">
                  <dt className="font-bold text-lg">Total</dt>
                  <dd className="font-bold text-lg">$86.40</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
