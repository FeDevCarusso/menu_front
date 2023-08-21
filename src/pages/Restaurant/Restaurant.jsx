import React, { useState, useEffect } from 'react';
import { getRestaurant } from '../../api/axios';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import placeholder from '../../assets/image_placeholder.jpg';

const Restaurant = () => {
    const query = new URLSearchParams(window.location.search).get("q");
    const [restaurantData, setRestaurant] = useState(null);
    const restaurant = restaurantData?.restaurant;
    const categories = restaurantData?.categories;

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
                {restaurant?.restaurantName}
            </h1>
            <Container className='d-flex justify-content-center'>
                <Image src={placeholder} fluid className='rounded-4 shadow' />
            </Container>

            <Container>
                <Row>
                    <Col className='d-flex overflow-auto my-2'>
                        {
                            categories && categories?.map(function (c, index) {
                                return < Button key={index} className="btn btn-secondary flex-shrink-0 mx-1" > {c.name}</Button>

                            })}
                    </Col>
                </Row>
            </Container>
        </Container >
    );
}

export default Restaurant;
