import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Index.css"; // Asegúrate de importar tus estilos personalizados
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="index-container d-flex justify-content-center align-items-center vh-100">
      <div className="form-container">
        <Form className="custom-form shadow text-center mx-2 border-secondary border p-4">
          <h2 className="mb-4">Ingresa el código de tu restaurante</h2>
          <Form.Group controlId="restaurantCode">
            <Form.Control
              type="text"
              placeholder="Ingresa el código aquí"
              defaultValue={"xdgfe1"}
              size="lg"
              className="input-field mb-3 border border-secondary"
            />
          </Form.Group>
          <Button as={Link} to={"/restaurant"} variant="dark" className="w-100" size="lg" block>
            Ir a la carta
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Index;
