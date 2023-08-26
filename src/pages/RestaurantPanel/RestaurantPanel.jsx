import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { getRestaurantInfo } from '../../api/myResto'
import { Button, Card, Container, Dropdown } from 'react-bootstrap'
import ManageCards from '../../components/ManageCards/ManageCards'

const RestaurantPanel = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [restaurantData, setRestaurantData] = useState([])

    useEffect(function () {
        getRestaurantInfo().then(function (result) {
            if (result.status !== 200) {
                return
            } else {
                setRestaurantData(result.data.data)
            }
        })
    }, [])

    return !isAuthenticated ? <Navigate to={"/"} /> : (
        <Container>

            <h2 className='text-center my-3 bg-secondary shadow rounded-3 text-light text-shadow'>
                {restaurantData?.restaurantName}
            </h2>

            {/*Dropdown de extras*/}
            <Dropdown className='w-100 d-flex flex-wrap my-2 shadow bg-light border border-secondary rounded-3 p-2'>
                <Dropdown.Toggle variant='dark' className='w-100'>Extras</Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown className={`my-1 p-2 bg-light shadow border border-secondary rounded-2 ${window.innerWidth <= 767 ? 'w-100' : 'mx-1'}`}>
                        <Dropdown.Toggle className='w-100' variant='light' id='dropdown-basic'>
                            Horarios
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='shadow border border-secondary'>
                            <Dropdown.Item>Lunes: {restaurantData?.horarios?.lunes}</Dropdown.Item>
                            <Dropdown.Item>Martes: {restaurantData?.horarios?.martes}</Dropdown.Item>
                            <Dropdown.Item>Miércoles: {restaurantData?.horarios?.miercoles}</Dropdown.Item>
                            <Dropdown.Item>Jueves: {restaurantData?.horarios?.jueves}</Dropdown.Item>
                            <Dropdown.Item>Viernes: {restaurantData?.horarios?.viernes}</Dropdown.Item>
                            <Dropdown.Item>Sábado: {restaurantData?.horarios?.sabado}</Dropdown.Item>
                            <Dropdown.Item>Domingo: {restaurantData?.horarios?.domingo}</Dropdown.Item>
                        </Dropdown.Menu>
                        <Button className='w-100' variant='dark'>Editar</Button>
                    </Dropdown>


                    <Dropdown className={`my-1 p-2 bg-light shadow border border-secondary  rounded-2 ${window.innerWidth <= 767 ? 'w-100' : 'mx-1'}`}>
                        <Dropdown.Toggle className='w-100' variant='light' id='dropdown-basic'>
                            Proximamente
                        </Dropdown.Toggle>
                        <Button className='w-100' variant='dark'>Más funciones</Button>

                    </Dropdown>
                </Dropdown.Menu>

            </Dropdown>


            {/*cards*/}
            <Container className='bg-light p-2 border border-secondary rounded-3'>
                <h3 className='text-center my-2 bg-dark text-light rounded-2'>Administrar restaurante</h3>
                <ManageCards linkTo="/myResto/addCat" title={"Agregar categoría"} buttonText={"Agregar categoría"} description={"Acá podes agregar una categoría para tus platos."} />
                <ManageCards linkTo="/myResto/addFood" title={"Agregar plato"} buttonText={"Agregar plato"} description={"Acá podes agregar platos a tu menú."} />
                <ManageCards linkTo="/myResto/viewFood" title={"Ver todos los platos"} buttonText={"Ver platos"} description={"Este espacio permite ver, editar o eliminar un plato de tu menú."} />
                <ManageCards linkTo={`/restaurant?q=${restaurantData?.restaurantName}`} title={"Ver mi menu"} buttonText={"Ver platos"} description={"Te lleva al menu que ven tus clientes."} />

            </Container>
            <Container className='bg-light p-2 border border-secondary rounded-3'>
                <h3 className='text-center my-2 bg-dark text-light rounded-2'>Editar apariencia</h3>
                <ManageCards linkTo="/myResto/changeBanner" title={"Agregar categoría"} buttonText={"Cambiar banner"} description={"Cambiar banner del resto (Portada, imagen principal, logo)."} />
            </Container>
        </Container>
    )
}

export default RestaurantPanel