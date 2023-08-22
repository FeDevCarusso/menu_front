import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageCards = ({ title, buttonText, description, linkTo }) => {
    return (
        <Card className='shadow mb-2 border-secondary'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Link to={linkTo} className='btn btn-primary'>
                    {buttonText}
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ManageCards;
