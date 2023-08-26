import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { add_food, get_cats } from '../../api/myResto';

const AddFood = () => {
    const [food, setFood] = useState({
        name: "",
        ingredients: "",
        price: 0,
        cat: "",
    });

    const [error, setError] = useState("");
    const [done, /*setDone*/] = useState(false);

    const [cats, setCats] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [imageError, setImageError] = useState("");

    useEffect(() => {
        get_cats().then(result => {
            if (result?.data) {
                setCats(result?.data);
            } else {
                setCats([]);
            }
        });
    }, []);

    function submit_handler(e) {
        e.preventDefault();
        add_food(
            food, selectedImage
        ).then(function (response) {
            console.log(response)
        })
    }

    function changeHandler(e) {
        setFood({
            ...food,
            [e.target.name]: e.target.value,
        });
        if (error) {
            setError("");
        }
    }

    function handleImageChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setSelectedImage(selectedFile);
                setImageError('');
                const imageURL = URL.createObjectURL(selectedFile);
                setImagePreview(imageURL);
            } else {
                setSelectedImage(null);
                setImageError('Por favor, selecciona un archivo de imagen válido.');
                setImagePreview(null);
            }
        }
    }


    return done ? <Navigate to="/myResto" /> : (
        <Container fluid className='my-5 d-flex align-items-center justify-content-center'>
            <Form encType='multipart/form-data' onSubmit={(e) => submit_handler(e)} style={{ width: "40em" }} className='bg-light shadow rounded-3 p-2 border border-secondary'>
                <h2 className='text-center my-2 mb-3'>Agregar un plato</h2>

                <Form.Group className='mt-2'>
                    <Form.Control name='name' value={food.name} onChange={(e) => changeHandler(e)} className={`shadow border border-secondary ${error ? "border border-danger text-danger" : ""}`} placeholder='Nombre del plato' />
                    {error && <Form.Label className='my-2 mb-1 text-center w-100 text-danger text-shadow'>{error}</Form.Label>}
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Control
                        name='ingredients'
                        value={food.ingredients}
                        onChange={(e) => changeHandler(e)}
                        className={`shadow border border-secondary ${error ? "border border-danger text-danger" : ""}`}
                        placeholder='Ingredientes, separados por una coma.' />
                    {error && <Form.Label className='my-2 mb-1 text-center w-100 text-danger text-shadow'>{error}</Form.Label>}
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Control
                        name='price'
                        type='number'
                        value={food.price}
                        onChange={(e) => changeHandler(e)}
                        className={`shadow border border-secondary ${error ? "border border-danger text-danger" : ""}`}
                        placeholder='Precio' />
                    {error && <Form.Label className='my-2 mb-1 text-center w-100 text-danger text-shadow'>{error}</Form.Label>}
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Select
                        name='cat'
                        onChange={(e) => changeHandler(e)}
                        className={`shadow border border-secondary ${error ? "border border-danger text-danger" : ""}`}>
                        <option value="">{cats?.length ? "Selecciona una categoría" : "No agregaste ninguna categoría"}</option>
                        {
                            cats?.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))
                        }
                    </Form.Select>
                    {error && <Form.Label className='my-2 mb-1 text-center w-100 text-danger text-shadow'>{error}</Form.Label>}
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Label className='text-center w-100'> Agregá una imagen </Form.Label>
                    <Form.Control type='file' accept='image/*' onChange={handleImageChange} className='border border-secondary' />
                    {imagePreview && <img src={imagePreview} alt="Vista previa de la imagen" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                    {imageError && <Form.Text className="text-danger">{imageError}</Form.Text>}
                </Form.Group>

                <Button type="submit" className='w-100 my-1 shadow border border-secondary'>Agregar</Button>
            </Form>
        </Container>
    );
}

export default AddFood;
