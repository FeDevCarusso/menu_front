import React, { useContext } from "react";
import mockLogo from "../../assets/img/mock_logo.jpg";
import mockBurguer from "../../assets/img/mock_burguer.jpg";
import mockPizza from "../../assets/img/mock_pizza.jpg";

import {
  Container,
  Image,
  Badge,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { DarkModeContext } from "../../context/DarkModeContext";
import { FaUtensils } from "react-icons/fa";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

// Crear un array de objetos con los datos de los Cards
const cardData = [
  {
    title: "Hamburguesa completa",
    imageSrc: mockBurguer,
    ingredients: ["Lechuga", "Tomate", "Jamón", "Cheddar", "Doble medallon"],
    price: 3500,
  },
  {
    title: "Pizza grande",
    imageSrc: mockPizza,
    ingredients: [
      "Muzza",
      "Tomate",
      "Jamón",
      "Salchicha",
      "Morron verde",
      "Longaniza",
    ],
    price: 3500,
  },
];

const Home = () => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <div className="pt-5">
      <Image
        src={mockLogo}
        alt="restaurant_logo"
        className="logo img-fluid mt-2"
      />
      <Container fluid className="shadow border-bottom border-dark px-0">
        <div
          className={`d-flex justify-content-start overflow-auto user-select-none bg-${isDark} p-2 mx-0`}
          style={{ flexWrap: "nowrap" }}
        >
          <Badge
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            Todos
          </Badge>
          <Badge
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            Promos
          </Badge>
          <Badge
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            Categoria 1
          </Badge>
          <Badge
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            Categoria 2
          </Badge>
          <Badge
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            Categoria 3
          </Badge>
          <Badge
            bg={isDark}
            text={isDark === "light" ? "dark" : "light"}
            className={`${
              isDark === "dark" ? "border border-light" : "border border-dark"
            } m-1 p-3 shadow `}
            style={{ fontSize: "18px" }}
          >
            ...
          </Badge>
        </div>
      </Container>
      {cardData.map((card, index) => (
        <Container key={index} className="my-4 mb-2">
          <Card className="border-dark">
            <Card.Header
              className={`
              ${
                isDark === "light" ? "bg-light text-dark" : "bg-dark text-light"
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
        </Container>
      ))}
      <Button
        as={Link}
        to={"/cart"}
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
