import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import brandImage from '../../assets/brand.png';

const Home = () => {

    const [search, setSearch] = useState("")

    function handle_submit(e) {
        e.preventDefault()
        window.location.replace(`foundRestaurants?q=${search}`)
    }

    return (
        <Container className="d-flex flex-column p-2 justify-content-center align-items-center vh-100">

            <Image fluid style={{ width: "25em", filter: "invert()" }} className="my-2 brand-image bg-light p-3 px-3 mx-auto rounded-4 shadow border-success border" src={brandImage} alt="ClickFood Logo" />
            <Row className="text-center mx-2 mb-0 border border-secondary">
                <Col xs={11} sm={11} md={11} lg={11} className='bg-light  shadow p-3   d-flex flex-column w-100 border-secondary'>
                    <Form onSubmit={(e) => handle_submit(e)} className="d-flex align-items-center justify-content-center">

                        <Form.Control onChange={(e) => setSearch(e.target.value)} value={search} className="search-input border-secondary mx-1 w-100" placeholder='Buscá un restaurante' />
                        <Button type='submit' className="search-button shadow border-secondary" variant='dark'>Buscar</Button>
                    </Form>
                </Col>
            </Row>
                <h6 className='text-white bg-dark mt-3 p-2 rounded shadow'>Consejo: Si buscas con la barra vacia, vas a ver todos los restaurantes disponibles</h6>



        </Container>
    );
}

export default Home;
