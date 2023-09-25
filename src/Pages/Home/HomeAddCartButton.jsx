import React from "react";
import { Button } from "react-bootstrap";

const HomeAddCartButton = ({ handleAddToOrder, id, price, inCartIDs }) => {
  return (
    <Button
      onClick={() => handleAddToOrder(id)}
      variant="dark"
      className={"m-1"}
    >
      {inCartIDs.includes(id) ? "En carrito" : "Añadir a la orden"} (
      <i className="text-decoration-underline">${price}</i>)
    </Button>
  );
};

export default HomeAddCartButton;
