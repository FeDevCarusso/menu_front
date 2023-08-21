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

            <Row className="text-center mx-2 mb-5 border border-secondary">
                <Col xs={11} sm={11} md={11} lg={11} className='bg-light  shadow p-3   d-flex flex-column w-100 border-secondary'>
                    <Image style={{ width: "20em" }} className="my-2 brand-image" src={brandImage} alt="ClickFood Logo" />
                    <Form onSubmit={(e) => handle_submit(e)} className="d-flex align-items-center justify-content-center">

                        <Form.Control onChange={(e) => setSearch(e.target.value)} value={search} className="search-input border-secondary mx-1 w-100" placeholder='Buscá un restaurante' />
                        <Button type='submit' className="search-button shadow border-secondary" variant='dark'>Buscar</Button>
                    </Form>
                </Col>
            </Row>



        </Container>
    );
}

export default Home;
