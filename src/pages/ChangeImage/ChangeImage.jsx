import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { change_banner } from '../../api/myResto';

const ChangeImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [done, setDone] = useState(false);
    const [imageError, setImageError] = useState("");

    async function submit_handler(e) {
        e.preventDefault();
        if (!selectedImage) {
            setImageError("No seleccionaste ninguna imagen");
        } else {
            change_banner(selectedImage).then(function (result) {
                const { bool, message } = result
                if (message) {
                    alert(message)
                } 
                if (!!bool) {
                    return window.location.replace("/myResto")
                }
            })
        }
    }

    function changeHandler(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setSelectedImage(selectedFile);
                setImageError('');

                const imageURL = URL.createObjectURL(selectedFile);
                setPreview(imageURL);
            } else {
                setSelectedImage(null);
                setImageError('Por favor, selecciona un archivo de imagen válido.');
                setPreview(null);
            }
        }
    }

    return done ? <Navigate to="/myResto" /> : (
        <Container fluid className='my-5 d-flex align-items-center justify-content-center'>
            <Form onSubmit={(e) => submit_handler(e)} style={{ width: "40em" }} className='bg-light shadow rounded-3 p-2 border border-secondary'>
                <h2 className='text-center my-2 mb-3'>Agregar categoría</h2>
                <Form.Group>
                    <Form.Control className='mb-2' onChange={(e) => changeHandler(e)} accept='image/*' type='file' />
                    {
                        preview && <img src={preview} alt="imagen_principal" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    }
                    {imageError && <Form.Text className="text-danger text-center"><h5>{imageError}</h5></Form.Text>}
                </Form.Group>
                <Button type="submit" className='w-100 my-1 shadow border border-secondary'>Agregar</Button>
            </Form>
        </Container>
    );
}

export default ChangeImage;
