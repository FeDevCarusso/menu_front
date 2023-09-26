import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { FaArrowLeft, FaDonate } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { RestaurantContext } from "../../context/RestaurantContext";
import { get_order } from "../../api/customer.api";

const MyOrder = () => {
  const { isDark } = useContext(DarkModeContext);
  const {
    code: restaurantCode,
    orderData,
    setOrderData,
  } = useContext(RestaurantContext);

  useEffect(function () {
    updateOrderData(restaurantCode);
  }, []);

  function updateOrderData(code) {
    get_order(code).then(function (response) {
      if (response.data) {
        setOrderData(response?.data);
        if (response?.data?.total !== null) {
          localStorage.setItem(`has_order_${code}`, true);
        } else {
          localStorage.removeItem(`has_order_${code}`);
        }
      }
    });
  }

  // if (orderData) {
  //   console.log(orderData);
  // }

  return orderData?.message ? (
    <Container>
      <h1
        style={{ marginTop: "3em" }}
        className={`text-center text-${
          isDark === "light" ? "dark" : "light"
        } border border-dark rounded-3 bg-${isDark}  `}
      >
        {orderData?.message}
      </h1>

      <Button
        as={Link}
        to={`/restaurant/${restaurantCode}`}
        className={`${styles.float_button} ${
          isDark === "dark" ? "border-light" : "border-dark"
        }`}
        text={isDark === "light" ? "dark" : "light"}
        variant={isDark}
      >
        <FaArrowLeft style={{ fontSize: "20px" }} className="m-1 my-2" />
      </Button>
    </Container>
  ) : !orderData ? null : (
    <Container className={`mt-5 `}>
      <h1
        style={{ marginTop: "3em" }}
        className={`text-center text-${
          isDark === "light" ? "dark" : "light"
        } border border-dark rounded-3 bg-${isDark}  `}
      >
        Mi Orden
      </h1>
      <Badge
        className={`w-100 my-2 ${
          isDark === "dark" ? "bg-success" : "bg-success"
        }`}
        style={{ fontSize: "large" }}
      >
        Estado: Aceptado
      </Badge>
      <Table
        responsive
        bordered
        hover
        className={`table-${isDark} border-${
          isDark === "dark" ? "light" : "dark"
        } ${isDark === "light" ? "border" : ""}`}
        style={{ fontSize: "small" }}
      >
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orderData &&
            Object.keys(orderData)?.map((key, index) => {
              if (typeof orderData[key] === "object" && orderData[key]?.id) {
                const current = orderData[key];
                return (
                  <tr key={index}>
                    <td>{current?.foodName}</td>
                    <td>{current?.cant}</td>
                    <td>${current?.price * current?.cant}</td>
                  </tr>
                );
              }
              return null;
            })}
          <tr>
            <td colSpan="2" className="text-start">
              <strong>Total:</strong>
            </td>
            <td>${orderData?.total}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        className={`w-100 shadow ${
          isDark === "light" ? "border border-dark" : "border-light"
        } shadow`}
        variant={isDark}
      >
        <FaDonate className={`mx-2 `}></FaDonate>
        Pedir la cuenta
      </Button>
      <Button
        as={Link}
        to={`/restaurant/${restaurantCode}`}
        className={`${styles.float_button} ${
          isDark === "dark" ? "border-light" : "border-dark"
        }`}
        text={isDark === "light" ? "dark" : "light"}
        variant={isDark}
      >
        <FaArrowLeft style={{ fontSize: "20px" }} className="m-1 my-2" />
      </Button>
    </Container>
  );
};

export default MyOrder;
