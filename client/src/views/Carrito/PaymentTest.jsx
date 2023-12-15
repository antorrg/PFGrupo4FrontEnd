import { useState } from "react";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import setAuthHeader from "../../utils/AxiosUtils";
import { Spinner } from "@nextui-org/react";

//require ('dotenv').config();
//const { MERCADOPAGO_PUBLIC_KEY }=process.env;

const PaymentTest = (props) => {
  const token = localStorage.getItem("validToken");

  const { userID, userEmail, arrayItems } = props;

  const [preferenceId, setPreferenceId] = useState();

  initMercadoPago("TEST-20bf0407-c11b-4eeb-ba3b-f7241af6c545", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "/post/createParchuseOrder",
        {
          userID: userID,
          userEmail: userEmail,
          items: arrayItems,
        },
        setAuthHeader(token)
      );

      if (response.data.body.id) {
        setPreferenceId(response.data.body.id);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    createPreference();
  }, []);

  return (
    <div className="w-full">
      {preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <div className="flex w-full items-center justify-center">
          <Spinner color="primary" size="lg" />
        </div>
      )}
    </div>
  );
};

export default PaymentTest;
