import { Input, Modal, ModalBody, ModalFooter, ModalContent, ModalHeader, Form, Button, Select, SelectItem } from "@heroui/react";
import React, { useState, useEffect } from "react";
import api from "../Service/api";

export default function CrearRegistro({ isOpen, onOpenChange }) {

    const [libros, setLibros] = useState([]);

    useEffect(() => {
        api.get('/libros').then((res) => {
            setLibros(res.data)
        }).catch((err) => {
            console.log('hubo un error al traer los libros', err)
        })
    }, [])

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Añadir Registro</ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={(e)=>{
                                    e.preventDefault();
                                    let data = Object.fromEntries(new FormData(e.currentTarget));

                                    api.post('/crear/registro',data).then((res)=>{
                                        alert(res.data);
                                        window.location.reload();
                                    }).catch((err)=>{
                                        console.log('hubo un error al crear el registro',err)
                                    })
                                }}
                            >
                                <div>
                                    <label>Usuario</label>
                                    <Input name="usuario" type="text"/>
                                </div>
                                <div>
                                    <label>Identificacion</label>
                                    <Input name="identificacion" type="text" maxLength={10} pattern="\d*"/>
                                </div>
                                <div>
                                    <label>Libro a prestar</label>
                                    <Select name="libro_id">
                                        {libros.map((item)=>(
                                            <SelectItem key={item.id} textValue={item.titulo}>{item.titulo}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label>Fecha del prestamo</label></div>
                                    <Input name="fecha_prestamo" type="date"/>
                                <div>
                                    <label>Fecha de devolucion</label>
                                    <Input name="fecha_devolucion" type="date"/>
                                </div>
                                <div>
                                    <Button type="submit">Añadir Registro</Button>
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}