import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_order, get_resto_data } from "../api/customer.api";
import { Alert, Button } from "react-bootstrap";
import { GlobalStorageContext } from "./GlobalStorage";

export const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const { restaurantCode, setRestaurantCode } =
    useContext(GlobalStorageContext);
  const [data, setData] = useState(null);
  const [done, setDone] = useState(false);
  const params = useParams();
  const code = localStorage.getItem("code") || params.code;
  const [orderData, setOrderData] = useState(null);

  const [alertData, setAlertData] = useState({
    show: false,
    heading: "",
    variant: "danger",
    body: "",
  });

  useEffect(
    function () {
      setData(null);
      if (!code) {
        return;
      }
      get_resto_data(code).then((result) => {
        if (result.status === 404) {
          setRestaurantCode(null);
          setAlertData({
            show: true,
            heading: "Error al buscar el restaurante",
            variant: "danger",
            body: result?.data?.message,
          });
          localStorage.removeItem(`code`);
          return;
        }

        if (result.status === 200) {
          setData(result?.data);
          localStorage.setItem("code", code);
          setRestaurantCode(localStorage.getItem("code"));
        }
      });
      get_order(code).then(function (response) {
        if (response.data) {
          setOrderData(response?.data);
        }
      });
    },
    [code, setRestaurantCode]
  );

  function handleCloseAlert(done) {
    !done ? window.location.replace("/") : resetAlert();
  }

  function resetAlert() {
    setAlertData({
      show: false,
      heading: "",
      variant: "danger",
      body: "",
    });
  }

  return (
    <RestaurantContext.Provider
      value={{ data, code, orderData, setOrderData }}
    >
      {children}
      {alertData.show && (
        <div
          className="position-fixed"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.4)",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Alert variant={alertData.variant}>
            <Alert.Heading className="d-flex align-items-center">
              {alertData.heading}
              <Button
                onClick={(e) => handleCloseAlert(done)}
                className="ms-auto"
                variant={alertData.variant}
              >
                X
              </Button>
            </Alert.Heading>
            {alertData.body}
          </Alert>
        </div>
      )}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
