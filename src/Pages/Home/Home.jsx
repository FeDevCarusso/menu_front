import React, { useContext, useEffect, useState } from "react";
import mockLogo from "../../assets/img/mock_logo.jpg";
import {
  Container,
  Image,
  Badge,
  Button,
  Card,
  ListGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { DarkModeContext } from "../../context/DarkModeContext";
import { FaUtensils } from "react-icons/fa";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import HomeAddCartButton from "./HomeAddCartButton";

const Home = () => {
  const { data, code } = useContext(RestaurantContext);
  const order =
    localStorage.getItem(`order_${code}`) ||
    localStorage.setItem(`order_${code}`, JSON.stringify([]));

  const { isDark } = useContext(DarkModeContext);
  const categories = data?.RestaurantCategories;
  const [show, setShow] = useState("all");
  const [inCartIDs, setIncartIds] = useState(
    JSON.parse(localStorage.getItem(`order_${code}`)) || []
  );

  function handleAddToOrder(id, price) {
    const newState = [...inCartIDs, id];
    if (!inCartIDs.includes(id)) {
      setIncartIds(newState);
      localStorage.setItem(`order_${code}`, JSON.stringify(newState));
    }
  }
  return !data ? null : (
    <div className="pt-5">
      <h3
        className={`bg-${isDark === "dark" ? "dark" : "light"}
              text-${isDark === "dark" ? "light" : "dark"}
              position-absolute my-2 shadow text-center p-2 rounded-0 text-decoration-underline
              border-bottom border-${isDark === "dark" ? "light" : "dark"}`}
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        {data?.restaurant?.restaurantName || "Cargando ..."}
      </h3>

      <Image
        src={mockLogo}
        alt="restaurant_logo"
        className="logo img-fluid mt-2"
      />

      {/*cats*/}
      <Container fluid className="shadow border-bottom border-dark px-0">
        <div
          className={`d-flex justify-content-start overflow-auto user-select-none bg-${isDark} p-2 mx-0`}
          style={{ flexWrap: "nowrap" }}
        >
          <Badge
            onClick={() => setShow("all")}
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            Todo
          </Badge>
          {data?.categories &&
            data?.categories?.map((cat) => {
              const catId = cat?.id;
              return (
                <Badge
                  onClick={() => setShow(catId)}
                  key={cat?.id}
                  bg={isDark}
                  text={isDark === "light" ? "dark" : "light"}
                  className={`${
                    isDark === "dark"
                      ? "border border-light"
                      : "border border-dark"
                  } m-1 p-3 shadow `}
                  style={{ fontSize: "18px" }}
                >
                  {cat?.name}
                </Badge>
              );
            })}
        </div>
      </Container>

      {/*Foods*/}
      <Container className="my-4">
        <Row>
          {data?.foods &&
            data.foods?.map((card, index) => {
              return show !== "all" &&
                show !== card?.RestaurantCategoryId ? null : (
                <Col key={index} lg={4} md={6} sm={12}>
                  <Card className="border-dark mb-3">
                    <Card.Header
                      className={`
                ${
                  isDark === "light"
                    ? "bg-light text-dark"
                    : "bg-dark text-light"
                }
              `}
                    >
                      <strong>{card?.foodName}</strong>
                    </Card.Header>
                    <Card.Img
                      variant="top"
                      className="rounded-0 border border-secondary"
                      src={card?.image}
                    />
                    <ListGroup className="border border-none rounded-0">
                      {card?.ingredients?.split(",").map((ingredient, i) => (
                        <ListGroup.Item key={i}>{ingredient}</ListGroup.Item>
                      ))}
                    </ListGroup>

                    <HomeAddCartButton
                      id={card?.id}
                      inCartIDs={inCartIDs}
                      handleAddToOrder={handleAddToOrder}
                      price={card?.price}
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>

      <Button
        as={Link}
        to={`/cart/${code}`}
        className={`${styles.float_button} ${
          isDark === "dark" ? "border-light" : "border-dark"
        }`}
        text={isDark === "light" ? "dark" : "light"}
        variant={isDark}
      >
        <FaUtensils style={{ fontSize: "20px" }} className="m-1 my-2" />
      </Button>
    </div>
  );
};

export default Home;

{
  /* <Col key={index} lg={4} md={6} sm={12}>
              <Card className="border-dark mb-3">
                <Card.Header
                  className={`
                    ${
                      isDark === "light"
                        ? "bg-light text-dark"
                        : "bg-dark text-light"
                    }
                  `}
                >
                  <strong>{card.title}</strong>
                </Card.Header>
                <Card.Img
                  variant="top"
                  className="rounded-0 border border-secondary"
                  src={card.imageSrc}
                />
                <ListGroup className="border border-none rounded-0">
                  {card.ingredients.map((ingredient, i) => (
                    <ListGroup.Item key={i}>{ingredient}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Button variant="dark" className={"m-1"}>
                  Añadir a la orden (
                  <i className="text-decoration-underline">${card.price}</i>)
                </Button>
              </Card>
            </Col> */
}
