import React, { useEffect, useState } from 'react';
import { find_restaurants } from '../../api/axios';
import { Container, Row, Col, Image } from 'react-bootstrap';
import placeholder from '../../assets/image_placeholder.jpg';
import { Link } from 'react-router-dom';

const FoundRestaurants = () => {
    const query = new URLSearchParams(window.location.search).get("q");
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        async function getResponse() {
            const response = await find_restaurants(query);
            setRestaurants(response);
        }
        getResponse();
    }, [query])

    return (
        <Container className="py-4">
            {restaurants.map((restaurant, index) => (

                <Row key={index} className="p-3 bg-white rounded shadow mb-4">
                    <Link to={`/restaurant?q=${restaurant.restaurantName}`}>
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <Image src={placeholder} alt={restaurant.restaurantName} fluid />
                        </Col>
                        <Col xs={12} md={9}>
                            <h3 className="mb-3">{restaurant.restaurantName}</h3>
                            <p>{restaurant.description}</p>
                        </Col>
                    </Link>
                </Row>
            ))}
        </Container>
    )
}

export default FoundRestaurants;
