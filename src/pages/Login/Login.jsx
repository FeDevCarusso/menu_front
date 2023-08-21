import React, { useContext, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { login } from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom'
const Login = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  })


  async function login_handler(e) {
    e.preventDefault();
    try {
      const result = await login(username, password);
      const resultData = result?.resultData;
      const data = resultData?.data;

      if (data?.length) {
        const newErrors = {};
        data.forEach(error => {
          newErrors[error.path] = error.message
        });
        setErrors(newErrors);
      } else {
        setErrors({ username: "", password: "" });
      }

      if (resultData?.message) {
        alert(resultData.message)
      }

      if (resultData?.bool) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return isAuthenticated ? <Navigate to={"/"} /> : (
    <Container className="d-flex flex-column p-2 justify-content-center align-items-center vh-100">
      <Row className="text-center mx-2 shadow border border-secondary mb-5">
        <Col xs={11} sm={11} md={11} lg={11} className='bg-light shadow p-3 d-flex flex-column w-100 border-secondary'>
          <Form onSubmit={(e) => login_handler(e)} style={{ width: "20em" }} className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Iniciar sesión</h2>
            <Form.Control
              className="mb-3 border-secondary shadow"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Correo electrónico'
            />
            {errors?.username && <Form.Label className='text-danger mb-2'>{errors.username}</Form.Label>}
            <Form.Control
              className="mb-3 border-secondary shadow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
              type='password'
            />
            {errors?.password && <Form.Label className='text-danger mb-2'>{errors.password}</Form.Label>}



            <Button
              type='submit'
              className="w-100 shadow"
              variant='dark'>
              Iniciar sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
