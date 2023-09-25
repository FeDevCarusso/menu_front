import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, json } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
import styles from "./Cart.module.css";
import { RestaurantContext } from "../../context/RestaurantContext";

const Cart = () => {
  const { data, code } = useContext(RestaurantContext);
  const order = JSON.parse(localStorage.getItem(`order_${code}`));
  const { isDark } = useContext(DarkModeContext);

  const prevCant = JSON.parse(localStorage.getItem(`cant_${code}`));
  const prevTotal = JSON.parse(localStorage.getItem(`total_${code}`));

  const [cant, setCant] = useState(prevCant || {});
  const [total, setShowTotal] = useState(prevTotal || 0);

  useEffect(
    function () {
      setTotal();
    },
    [data, cant]
  );

  function setTotal() {
    let currTotal = 0;
    const foods = data?.foods
      ?.filter((food) => {
        if (cant.hasOwnProperty(food?.id)) {
          return true;
        }
        return false;
      })
      .map((food) => ({ id: food?.id, price: food?.price }));

    foods?.forEach((food) => {
      const currentSubtotal = food?.price * cant[food?.id];
      currTotal += parseFloat(currentSubtotal);
    });
    localStorage.setItem(`total_${code}`, currTotal);
    setShowTotal(currTotal);
  }

  const setInitialCant = (id) => {
    setCant({ ...cant, [id]: 1 });
  };
  const decreaseQuantity = (id) => {
    if (cant[id] <= 1) {
      if (cant[id !== null]) {
        setCant(setCant({ ...cant, [id]: 1 }));
      }
      return;
    }
    const newCant = { ...cant, [id]: cant[id] - 1 };
    localStorage.setItem(`cant_${code}`, JSON.stringify(newCant));
    setCant(newCant);
    // setTotal();
    return;
  };
  const increaseQuantity = (id) => {
    const newCant = { ...cant, [id]: !cant[id] ? 1 + 1 : cant[id] + 1 };
    localStorage.setItem(`cant_${code}`, JSON.stringify(newCant));
    setCant(newCant);
    // setTotal();
    return;
  };

  return (
    <div className="py-5">
      <h3 className="rounded-3 bg-dark text-light border border-dark  mx-2 text-center  mt-4">
        Mesa: <span className="font-weight-bold">A-1</span>
      </h3>
      <Container className="mt-3 mb-5 overflow-auto">
        {data?.foods &&
          data?.foods?.map((food, index) => {
            return (
              order?.includes(food?.id) && (
                <Card key={index} className="border-dark mb-3">
                  <Row className="align-items-center">
                    <Col md={3}>
                      <Card.Img
                        variant="left"
                        className="w-100 rounded-0 border-right border-secondary"
                        src={food?.image}
                      />
                    </Col>
                    <Col md={9}>
                      <Card.Header className="mb-2">
                        <strong>
                          Hamburguesa completa{" "}
                          <i className="text-muted text-decoration-underline">
                            ${food?.price}
                          </i>
                        </strong>
                      </Card.Header>
                      <Card.Body className="p-3">
                        {food?.ingredients.split(",").map((i, idx) => {
                          return (
                            <Badge key={idx} className="m-1 bg-dark">
                              {i}
                            </Badge>
                          );
                        })}
                      </Card.Body>
                      <Form.Group className="mb-3 mx-2 pb-0">
                        <Form.Label>Cantidad:</Form.Label>
                        <div
                          className={`d-flex align-items-center border ${styles.inputSpinner}`}
                        >
                          <Button
                            variant="dark"
                            className=""
                            onClick={() => decreaseQuantity(food?.id)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={cant[food?.id] || setInitialCant(food?.id)}
                            onChange={(e) =>
                              setCant({
                                ...cant,
                                [food?.id]: parseInt(e.target.value),
                              })
                            }
                            className="mx-2 border-dark text-center"
                          />
                          <Button
                            variant="dark"
                            className=""
                            onClick={() => increaseQuantity(food?.id)}
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>
                      <Card.Footer className="bg-light d-flex justify-content-between">
                        <Form.Label style={{ margin: "0" }}>
                          Sub-total:
                        </Form.Label>
                        <h5 style={{ margin: "0" }}>
                          $
                          {cant[food?.id]
                            ? food?.price * cant[food?.id]
                            : food?.price}
                        </h5>
                      </Card.Footer>
                    </Col>
                  </Row>
                </Card>
              )
            );
          })}
      </Container>
      <Container
        fluid
        className="border-top py-3 bg-light position-fixed bottom-0 border-secondary"
      >
        <h3 className="text-decoration-underline">Total: ${total}</h3>
        <Button
          as={Link}
          to={`/my_order/${code}`}
          className="w-100 text-underline"
          variant="dark"
        >
          Pedir
        </Button>
      </Container>
      <Button
        as={Link}
        to={`/restaurant/${code}`}
        className={`${styles.floating_button} ${
          isDark === "dark" ? "border-light" : "border-dark"
        }`}
        text={isDark === "light" ? "dark" : "light"}
        variant={isDark}
      >
        <FaArrowLeft style={{ fontSize: "20px" }} className="m-1 my-2" />
      </Button>
    </div>
  );
};

export default Cart;

/* <Card className="border-dark mb-3">
          <Row className="align-items-center">
            <Col md={3}>
              <Card.Img
                variant="left"
                className="w-100 rounded-0 border-right border-secondary"
                src={mockBurger}
              />
            </Col>
            <Col md={9}>
              <Card.Header className="mb-2">
                <strong>
                  Hamburguesa completa{" "}
                  <i className="text-muted text-decoration-underline">
                    ${3500}
                  </i>
                </strong>
              </Card.Header>
              <Card.Body className="p-3">
                <Badge className="m-1 bg-dark">Lechuga</Badge>
                <Badge className="m-1 bg-dark">Tomate</Badge>
                <Badge className="m-1 bg-dark">Jamón</Badge>
                <Badge className="m-1 bg-dark">Cheddar</Badge>
                <Badge className="m-1 bg-dark">Doble medallón</Badge>
              </Card.Body>
              <Form.Group className="mb-3 mx-2 pb-0">
                <Form.Label>Cantidad:</Form.Label>
                <div
                  className={`d-flex align-items-center border ${styles.inputSpinner}`}
                >
                  <Button
                    variant="dark"
                    className=""
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mx-2 border-dark text-center"
                  />
                  <Button
                    variant="dark"
                    className=""
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
              </Form.Group>
              <Card.Footer className="bg-light d-flex justify-content-between">
                <Form.Label style={{ margin: "0" }}>Sub-total:</Form.Label>
                <h5 style={{ margin: "0" }}>${subtotal}</h5>
              </Card.Footer>
            </Col>
          </Row>
        </Card> */
