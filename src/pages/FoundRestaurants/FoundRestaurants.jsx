import React, { useEffect, useState } from 'react';
import { find_restaurants } from '../../api/axios';
import { Container, Row, Col, Image, Form, Button, Card } from 'react-bootstrap';
import placeholder from '../../assets/image_placeholder.jpg';
import { Link } from 'react-router-dom';
import brandImage from '../../assets/brand.png';


const FoundRestaurants = () => {
    const [search, setSearch] = useState("")
    const query = new URLSearchParams(window.location.search).get("q");
    const [restaurants, setRestaurants] = useState([])

    function handle_submit(e) {
        e.preventDefault()
        window.location.replace(`foundRestaurants?q=${search}`)
    }

    useEffect(() => {
        async function getResponse() {
            const response = await find_restaurants(query);
            setRestaurants(response);
        }
        getResponse();
    }, [query])

    console.log(restaurants)
    return (
        <Container className="py-4">

            <Row className="text-center mx-2 mb-5 border border-secondary">
                <Col xs={11} sm={11} md={11} lg={11} className='bg-light  shadow p-3   d-flex flex-column w-100 border-secondary'>
                    <Image style={{ width: "20em" }} className="my-2 brand-image" src={brandImage} alt="ClickFood Logo" />
                    <Form onSubmit={(e) => handle_submit(e)} className="d-flex align-items-center justify-content-center">

                        <Form.Control onChange={(e) => setSearch(e.target.value)} value={search} className="search-input border-secondary mx-1 w-100" placeholder='Buscá un restaurante' />
                        <Button type='submit' className="search-button shadow border-secondary" variant='dark'>Buscar</Button>
                    </Form>
                </Col>
            </Row>

            {restaurants.map((restaurant, index) => (

                <Row key={index} className="p-3 bg-white rounded shadow border mb-4 border-secondary mx-auto">
                    <Link to={`/restaurant?q=${restaurant.restaurantName}`} className="text-decoration-none d-flex align-items-center">
                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <Image className='border  border-secondary shadow' src={restaurant?.restaurantImage
                                ?
                                `${process.env.REACT_APP_API_URL}/images/${restaurant?.restaurantImage}`
                                :
                                placeholder} alt={restaurant.restaurantName} fluid />
                            <div className="d-md-none flex-md-column">
                                <div className="d-flex flex-column">
                                    <h3 className="my-3 mb-md-0 text-dark">{restaurant.restaurantName}</h3>
                                    <h5 className="mb-md-0 text-dark">Este restaurante ofrece:</h5>
                                    <Container className="d-flex flex-wrap my-3">
                                        {
                                            restaurant?.RestaurantCategories?.map(function (cat, index) {
                                                return <label className='d-inline badge bg-dark text-white mx-1 my-1' style={{ fontSize: '14px' }} key={index}>
                                                    {cat.name}
                                                </label>
                                            })
                                        }
                                    </Container>
                                </div>
                                <p className="d-none d-md-block">{restaurant.description}</p>
                            </div>
                        </Col>
                        <Col xs={12} md={9}>
                            <div className="d-sm-flex flex-md-column mx-3">
                                <div className="d-none d-md-flex flex-column">
                                    <h3 className="mb-3 mb-md-0 text-dark">{restaurant.restaurantName}</h3>
                                    <h4 className="mb-3 mb-md-0 text-dark">Este restaurante ofrece:</h4>
                                    <Container className="my-3">
                                        {
                                            restaurant?.RestaurantCategories?.map(function (cat, index) {
                                                return <label className='badge bg-dark text-white mx-1 my-1' style={{ fontSize: '14px' }} key={index}>
                                                    {cat.name}
                                                </label>
                                            })
                                        }
                                    </Container>

                                </div>
                                <p className="d-none d-md-block">{restaurant.description}</p>
                                {restaurant?.currentRestoCats?.map((cat) =>
                                    cat?.Food?.map((food, index) => (
                                        <Card key={index} className="shadow mb-2 border-secondary rounded-2">
                                            <Row className="align-items-center">
                                                <Col xs={12} md={3} className="d-none d-md-flex align-items-center px-0">
                                                    <Card.Img src={food?.image ? `${process.env.REACT_APP_API_URL}/images/${food?.image}` : placeholder} className="border border-dark card-image mx-0 mt-0 shadow-sm img-fluid" style={{ height: '100%' }} />
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
                                                            <Card.Img src={food?.image ? `${process.env.REACT_APP_API_URL}/images/${food?.image}` : placeholder} className="border  shadow card-image img-fluid mb-2" />
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
                            </div>
                        </Col>
                    </Link>
                </Row>


            ))}
        </Container>
    )
}

export default FoundRestaurants;
