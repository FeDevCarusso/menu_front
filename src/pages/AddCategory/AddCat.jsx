import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { add_category } from '../../api/myResto'
import { Navigate } from 'react-router-dom'


const AddCat = () => {
    const [category, setCategory] = useState("")
    const [error, setError] = useState("")
    const [done, setDone] = useState(false)

    async function submit_handler(e) {
        e.preventDefault()
        const result = await add_category(category)
        const { bool, data, message } = result
        console.log(result)

        if (message) {
            alert(message)
        }


        if (data) {
            setError(data[0]?.message)
        }

        if (typeof bool === "boolean") {
            if (!bool) {
                return
            } else if (bool === true) {
                return setDone(true)
            }
        }
    }

    function changeHandler(e) {
        setCategory(e.target.value)
        if (error) {
            setError("")
        }
    }

    return done ? <Navigate to={"/myResto"}/> : (
        <Container fluid className='my-5 d-flex align-items-center justify-content-center'>
            <Form onSubmit={(e) => submit_handler(e)} style={{ width: "40em" }} className='bg-light shadow rounded-3 p-2 border border-secondary'>
                <h2 className='text-center my-2 mb-3'>Agregar categoría</h2>
                <Form.Group className='mt-2'>
                    <Form.Control value={category} onChange={(e) => changeHandler(e)} className={`shadow border border-secondary ${error ? "border border-danger text-danger" : ""}`} placeholder='Nombre de la categoría' />
                    {error && <Form.Label className='my-2 mb-1 text-center w-100 text-danger text-shadow'>{error}</Form.Label>}
                </Form.Group>
                <Button type="submit" className='w-100 my-1 shadow border border-secondary'>Agregar</Button>
            </Form>
        </Container>
    )
}

export default AddCat