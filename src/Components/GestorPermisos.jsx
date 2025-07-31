import api from "../Service/api";
import React, { useState, useEffect } from "react";
import CrearRegistro from "../Fragments/ModalCrearRegistro";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, useDisclosure } from "@heroui/react";
import { useNavigate } from 'react-router-dom';

const GestosPermisos = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [registros, setRegistros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/registros').then((res) => {
            setRegistros(res.data)
        }).catch((err) => {
            console.log("Error al imprimir los libros", err)
        })
    }, []);

    function borrarRegistro({ id }) {
        api.delete(`/borrar/registro/${id}`).then((res) => {
            alert(res.data)
            window.location.reload();
        }).catch((err) => {
            console.log('Hubo un problema al eliminar el registro', err)
        })
    }

    return (
        <div className="m-5">
            <Button className='m-5' onPress={() => navigate('/')}>Gestor de libros</Button>

            <Button onPress={onOpen}>Registrar Permiso</Button>
            <CrearRegistro isOpen={isOpen} onOpenChange={onOpenChange} />

            <Table aria-label="Lista de libros" className='m-5'>
                <TableHeader>
                    <TableColumn>Usuario</TableColumn>
                    <TableColumn>Identificación</TableColumn>
                    <TableColumn>Libro</TableColumn>
                    <TableColumn>Fecha de préstamo</TableColumn>
                    <TableColumn>Fecha de devolución</TableColumn>
                    <TableColumn>Eliminar</TableColumn>
                </TableHeader>
                <TableBody>
                    {registros.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.usuario}</TableCell>
                            <TableCell>{item.identificacion}</TableCell>
                            <TableCell>{item.libro?.titulo}</TableCell>
                            <TableCell>{item.fecha_prestamo}</TableCell>
                            <TableCell>{item.fecha_devolucion}</TableCell>
                            <TableCell>
                                <Button onPress={() => borrarRegistro({ id: item.id })}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default GestosPermisos;
