import { Input, Modal, ModalBody, ModalFooter, ModalContent, ModalHeader, Form, Button, Select, SelectItem} from "@heroui/react";
import React, { useState, useEffect } from "react";
import api from "../Service/api";

export default function ModalEditar({ isOpen, onOpenChange, libro}) {

    const [generos, setGeneros] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState([]);

    useEffect(()=>{
        api.get('/generos').then((res)=>{
            setGeneros(res.data)
        }).catch((err)=>{
            console.log('No se pudo obtener los generos', err)
        })
    },[]);

    useEffect(()=>{
        api.get('/disponibilidad').then((res)=>{
            setDisponibilidad(res.data)
        }).catch((err)=>{
            console.log('No se pudo obtener datos', err)
        })
    },[]);

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Editar Libro</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={(e) =>{
                                    e.preventDefault();
                                    let data = Object.fromEntries(new FormData(e.currentTarget));

                                    api.post(`/editar/${libro.id}`,data).then((res)=>{
                                        alert(res.data);
                                        window.location.reload()
                                    }).catch((err) =>{
                                        console.log('hubo un error al editar el registro', err)
                                    })

                                }}>
                                    <div>
                                        <label>Titulo</label>
                                        <Input name="titulo" type="text" aria-label={`Eliminar ${libro?.titulo}`} defaultValue={libro?.titulo || ''} isRequired/>
                                    </div>
                                    <div>
                                        <label>Autor</label>
                                        <Input name="autor" type="text" aria-label={`Eliminar ${libro?.autor}`} defaultValue={libro?.autor || ''}/>
                                    </div>
                                    <div className="">
                                        <label>Genero</label>
                                        <Select name="genero_id" defaultSelectedKeys={[libro?.genero_id?.toString()]}>                                            
                                            {generos.map((genero)=>(
                                                <SelectItem key={genero.id} textValue={genero.genero}>{genero.genero}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="">
                                        <label>Diponibilidad</label>
                                        <Select name="disponible_id" defaultSelectedKeys={[libro?.disponible_id?.toString()]}>
                                            {disponibilidad.map((item)=>(
                                                <SelectItem key={item.id} textValue={item.disponible}>{item.disponible}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <Button type="submit">Guardar Cambios</Button>
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
        </div>
    )
}