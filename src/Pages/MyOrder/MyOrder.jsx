import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Nav, Table } from "react-bootstrap";
import { FaArrowLeft, FaDonate } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { GlobalStorageContext } from "../../context/GlobalStorage";

const MyOrder = () => {
  const { isDark } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { restaurantCode } = useContext(GlobalStorageContext);
  return (
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
            <th>Estado</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hamburguesa Completa</td>
            <td>1</td>
            <td className={`text-${isDark === "dark" ? "warning" : "success"}`}>
              Pendiente
            </td>
            <td>$3500</td>
          </tr>
          <tr>
            <td>Otro Producto</td>
            <td>2</td>
            <td className={`text-${isDark === "dark" ? "success" : "danger"}`}>
              Entregado
            </td>
            <td>$7000</td>
          </tr>
          <tr>
            <td>Otro Producto </td>
            <td>2</td>
            <td className={`text-${isDark === "dark" ? "danger" : "success"}`}>
              Rechazado
            </td>
            <td
              className={`text-decoration-line-through text-${
                isDark === "dark" ? "danger" : "success"
              }`}
            >
              $1500
            </td>
          </tr>
          <tr>
            <td colSpan="3" className="text-start">
              <strong>Total:</strong>
            </td>
            <td>$10500</td>
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
