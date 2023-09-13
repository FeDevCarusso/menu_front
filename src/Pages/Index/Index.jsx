import React, { useContext, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import clickFoodLogo from "../../assets/img/brand.png";
import { DarkModeContext } from "../../context/DarkModeContext";
import "./Index.css"; // Asegúrate de importar tus estilos personalizados

const Index = () => {
  const { isDark } = useContext(DarkModeContext);
  const [restoCode, setRestoCode] = useState("");
  const [redirect, setRedirect] = useState(false);

  const containerClass = `bg-${
    isDark === "dark" ? "dark" : "light"
  } d-flex justify-content-center align-items-center p-2 my-2 border border-${
    isDark === "dark" ? "light" : "dark"
  } shadow rounded-3 `;

  function onChangeHandler(e) {
    setRestoCode(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    setRedirect(true);
  }
  return redirect ? (
    <Navigate to={`/restaurant/${restoCode}`} />
  ) : (
    <div className="index-container d-flex justify-content-center align-items-center vh-100">
      <div className="form-container text-center p-2">
        <Container fluid className={containerClass}>
          <div className="d-flex justify-content-center align-items-center">
            <Image
              style={{
                maxWidth: "20em",
                filter: isDark === "dark" ? "invert(1)" : "invert(0)",
              }}
              className="img-fluid"
              src={clickFoodLogo}
            />
          </div>
        </Container>
        <Form
          onSubmit={(e) => submitHandler(e)}
          className="custom-form shadow text-center mx-2 border-secondary border p-4"
        >
          <h2 className="mb-4">Ingresa el código de tu restaurante</h2>
          <Form.Group controlId="restaurantCode">
            <Form.Control
              onChange={(e) => onChangeHandler(e)}
              type="text"
              placeholder="Ingresa el código aquí"
              value={restoCode}
              size="lg"
              className="input-field mb-3 text-center border border-secondary"
            />
          </Form.Group>
          <Button variant="dark" className="w-100" size="lg" type="submit">
            Ir a la carta
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Index;
