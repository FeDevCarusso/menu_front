import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const MyNav = () => {
  const { isDark, switchDarkmode } = useContext(DarkModeContext);

  const isSmallScreen = window.innerWidth <= 700;

  return (
    <Navbar
      expand="lg"
      className={`${styles.mynav} ${
        isDark === "dark"
          ? "border-bottom border-light"
          : "border-bottom border-dark"
      } position-fixed top-0 w-100  navbar-${isDark} bg-${isDark} shadow border-bottom border-secondary px-2`}
    >
      <Navbar.Brand className="mx-2" href="#">
        ClickFood | Restaurant Name
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text">
          <Nav.Link
            className={`mx-2 ${
              isSmallScreen ? "border-light border-top mt-3" : ""
            } text-${isDark === "dark" ? "white" : "text-dark"}`}
            as={Link}
            to={"/"}
          >
            Ingresar el código del restaurante
          </Nav.Link>
          <Nav.Link
            className={`mx-2 text-${
              isDark === "dark" ? "white" : "text-dark"
            }`}
            as={Link}
            to={"/restaurant"}
          >
            Restaurante
          </Nav.Link>
          <Nav.Link
            className={`mx-2 text-${
              isDark === "dark" ? "white" : "text-dark"
            }`}
            as={Link}
            to={"/my_order"}
          >
            Mi orden
          </Nav.Link>
          <Button
            variant={isDark !== "light" ? "outline-light" : "outline-dark"}
            onClick={(e) => switchDarkmode()}
            className={`mx-2 shadow ${
              isDark === "light" ? "border border-dark" : "border border-light"
            }`}
          >
            Modo nocturno: {isDark === "light" ? "No" : "Si"}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
