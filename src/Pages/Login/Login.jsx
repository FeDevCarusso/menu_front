import React, { useContext, useState } from "react";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import { DarkModeContext } from "../../context/DarkModeContext";
import clickFoodLogo from "../../assets/img/brand.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../api/user.api";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);
  const [alertData, setAlertData] = useState({
    show: false,
    heading: "",
    variant: "danger",
    body: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  function submitHandler(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    setErrors({});

    const passwordOK = passwordRegex.test(password);
    const usernameOK = emailRegex.test(username);

    if (!passwordOK || !usernameOK) {
      return setErrors({
        password: passwordOK ? "" : "Ingresá una contraseña segura",
        username: usernameOK ? "" : "Ingresá un mail válido",
      });
    }
    login(username, password)
      .then((res) => {
        const { data } = res;
        const bool = data?.bool;
        const message = data?.message;

        if (bool) {
          setAlertData({
            variant: "success",
            heading: "Login exitoso ",
            body: message,
            show: true,
          });
          setDone(true);
        }

        if (!bool) {
          setAlertData({
            variant: "danger",
            heading: "Error al iniciar sesión ",
            body: message,
            show: true,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function resetAlert() {
    setAlertData({
      show: false,
      heading: "",
      variant: "danger",
      body: "",
    });
  }

  function handleCloseAlert(canReload) {
    canReload ? window.location.reload() : resetAlert();
  }

  return (
    <Container className="d-flex flex-column mt-0 justify-content-center align-items-center vh-100">
      <Container
        fluid
        className={"bg-light border border-secondary p-2 rounded-3 my-2"}
      >
        <div className="d-flex justify-content-center align-items-center">
          <Image
            style={{
              maxWidth: "20em",
            }}
            className="img-fluid"
            src={clickFoodLogo}
          />
        </div>
      </Container>
      <Form
        onSubmit={(e) => submitHandler(e)}
        className={`bg-light p-4 border border-secondary rounded-3 shadow`}
      >
        <h2 className="text-center mb-2 mt-1 text-decoration-underline">
          Inicia sesión
        </h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            className="border-secondary text-center"
            type="email"
            placeholder="Ingresa el correo"
            value={username}
          />
          {errors?.username && (
            <Form.Label className="text-danger">{errors.username}</Form.Label>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            className="border-secondary text-center"
            type={showPass ? "text" : "password"}
            placeholder="Ingresá la contraseña"
            value={password}
          />
          {errors?.password && (
            <Form.Label className="text-danger">{errors.password}</Form.Label>
          )}

          <div
            onClick={() => setShowPass(!showPass)}
            className="text-center mt-0 "
          >
            <label
              className="mx-2 text-center text-decoration-underline"
              htmlFor="show_icon"
            >
              Mostrar contraseña?
            </label>
            {!showPass ? (
              <FaEyeSlash id="show_icon" />
            ) : (
              <FaEye id="show_icon" />
            )}
          </div>
        </Form.Group>

        <Button variant={"dark"} className="my-3 w-100" type="submit">
          Login
        </Button>
      </Form>
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
            zIndex: 999, // Asegura que la alerta esté por encima de otros elementos
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
    </Container>
  );
};

export default Login;
