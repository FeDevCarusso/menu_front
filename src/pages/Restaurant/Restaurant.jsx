import React, { useState, useEffect } from 'react';
import { getRestaurant } from '../../api/axios';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import placeholder from '../../assets/image_placeholder.jpg';

const Restaurant = () => {
    const query = new URLSearchParams(window.location.search).get("q");
    const [data, setRestaurant] = useState([])

    useEffect(() => {
        async function getRestaurantData() {
            const data = await getRestaurant(query);
            setRestaurant(data);
        }
        getRestaurantData();
    }, [query]);

    return (
        <Container>
            <h1 className='text-center my-3 bg-danger rounded-4 shadow p-3'>
                {data?.currentResto?.restaurantName}
            </h1>
            <Container className='d-flex justify-content-center'>
                <Image src={placeholder} fluid className='rounded-4 shadow' />
            </Container>

            <Container>
                <Row>
                    <Col>
                        <div className='d-flex overflow-auto my-2'>
                            <Button className='btn btn-secondary flex-shrink-0 mx-1'>Todos</Button>
                            <Button className='btn btn-secondary flex-shrink-0 mx-1'>Promos</Button>
                            {data?.currentRestoCats?.map((c, index) => (
                                <Button key={index} className="btn btn-secondary flex-shrink-0 mx-1">{c.name}</Button>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>


            <Container>
                <Row>
                    <Col>
                        {data?.currentRestoCats?.map((cat) =>
                            cat?.Food?.map((food, index) => (
                                <Card key={index} className="shadow mb-2 border-secondary rounded-2">
                                    <Row className="align-items-center">
                                        <Col xs={12} md={3} className="d-none d-md-flex align-items-center px-0">
                                            <Card.Img src={placeholder} className="border border-dark card-image mx-0 mt-0 shadow-sm img-fluid" style={{ height: '100%' }} />
                                        </Col>
                                        <Col xs={12} md={9}>
                                            <Card.Body>
                                                <Card.Title>{food.name}</Card.Title>
                                                <div className="d-none d-md-flex flex-wrap">
                                                    {food.ingredients.map((ingredient, index) => (
                                                        <p key={index} className="mb-0 me-2">* {ingredient}</p>
                                                    ))}
                                                </div>
                                                <div className="d-md-none">
                                                    <Card.Img src={placeholder} className="border  shadow card-image img-fluid mb-2" />
                                                    {food.ingredients.map((ingredient, index) => (
                                                        <p key={index} className="mb-0">* {ingredient}</p>
                                                    ))}
                                                </div>
                                                <p className="text-muted mt-2 mb-1">${food.price}</p>
                                                <Button variant='dark' className='my-1 shadow-sm d-none d-md-block px-5'>Añadir</Button>
                                                <Button variant='dark' className='my-1 shadow-sm d-md-none w-100'>Añadir</Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            ))
                        )}
                    </Col>
                </Row>
            </Container>





        </Container >
    );
}

export default Restaurant;
