import { useState } from "react";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import setAuthHeader from "../../utils/AxiosUtils";
//require ('dotenv').config();
//const { MERCADOPAGO_PUBLIC_KEY }=process.env;

const PaymentTest = (props) => {
  const token = localStorage.getItem("validToken");

  const { userID, userEmail, arrayItems } = props;

  //console.log("userID: " + userID);
  //console.log("userEmail: " + userEmail);
  //console.log("arrayItems: " + JSON.stringify(arrayItems));

  const [preferenceId, setPreferenceId] = useState(0);
  //const [initPoint, setInitPoint] = useState("");

  //initMercadoPago("TEST-76e9585a-c443-4c78-b373-c42b602a48d8");
  initMercadoPago("TEST-20bf0407-c11b-4eeb-ba3b-f7241af6c545", {
    locale: "es-AR",
  });

  /*const onInitPayment = () => {
        window.location.href = initPoint;
    }*/

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "/post/createParchuseOrder",
        {
          userID: userID, //"634829e8-cb56-4d71-9668-21fc95fa8789",
          userEmail: userEmail,
          items: arrayItems /*[
                    {
                        id: "1234654",
                        title: "Mario B",
                        unit_price: 15,
                        quantity: 2,
                        currency_id: "USD"
                    }
                    {
                        title: "Call of Duty",
                        unit_price: 500,
                        quantity: 2
                    },
                    {
                        title: "Fantasy",
                        unit_price: 150,
                        quantity: 5
                    },
                    {
                        title: "Mario",
                        unit_price: 650,
                        quantity: 1
                    }
                    {
                        id: "jh45",
                        title: "Call of Duty",
                        unit_price: 35000,
                        quantity: 1,
                        //currency_id: "COP"
                    },
                    {
                        title: "Alendra",
                        unit_price: 150,
                        quantity: 5,
                        //currency_id: "COP"
                    },
                    {
                        title: "Atunda",
                        unit_price: 650,
                        quantity: 1,
                        //currency_id: "COP"
                    }
                ]*/,
        },
        setAuthHeader(token)
      );
      //return response.data.body.id;
      if (response.data.body.id) {
        setPreferenceId(response.data.body.id);
        //console.log("Url: " + response.data.body.init_point);
        //setInitPoint(response.data.body.init_point);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    createPreference();
    //initMercadoPago('YOUR_PUBLIC_KEY', { locale: 'es-AR' });
    /*const waitTime = setTimeout(() => {
            ConsultarEstadoDeTransaccion();
        }, 3000);*/

    //return () => clearTimeout(waitTime);
  }, []);

  return (
    <div>
      {/*initPoint && <button onClick={onInitPayment}>
                Realizar Pago
            </button>*/}
      {preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        "No hay data"
      )}
    </div>
  );
};

export default PaymentTest;
