import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../api/axios';

const MyNav = () => {
    const { isAuthenticated } = useContext(AuthContext)
    async function logout_handler() {
        const result = await logout()
        const { data } = result

        if (data.message) {
            alert(data.message)
        }

        if (data.bool) {
            window.location.replace("/")
        }
    }
    return (
        <Navbar className='bg-dark px-5' variant='dark' expand='lg'>
            <Navbar.Brand as={Link} to={"/"}>ClickFood</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link as={Link} to='/' className='text-light mr-3'>Inicio</Nav.Link>
                    {!isAuthenticated && <Nav.Link as={Link} to='/login' className='text-light mr-3'>Iniciar sesión</Nav.Link>}
                    {!!isAuthenticated && <Nav.Link as={Link} onClick={() => logout_handler()} className='text-light'>Cerrar sesión</Nav.Link>}
                    {!!isAuthenticated && <Nav.Link as={Link} to={"/myResto"} className='text-light'>Mi restaurante</Nav.Link>}

                    <Nav.Link as={Link} to='/about' className='text-light mr-3'>Acerca de</Nav.Link>
                    <Nav.Link as={Link} to='/contact' className='text-light mr-3'>Contacto</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNav;
