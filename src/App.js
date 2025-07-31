import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './CSS/App.css';
import api from './Service/api';
import ModalEditar from './Fragments/ModalEditar';
import ModalCrear from './Fragments/ModalCrear';
import GestosPermisos from './Components/GestorPermisos';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, useDisclosure } from "@heroui/react";
import { PieChart } from '@mui/x-charts/PieChart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LibrosView />} />
      <Route path="/gestor/permisos" element={<GestosPermisos />} />
    </Routes>
  );
}

function LibrosView() {
  const [libros, setLibros] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onOpenChange: onOpenChangeCreate } = useDisclosure();
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/libros').then((res) => {
      setLibros(res.data)
    }).catch((err) => {
      console.log("Error a imprimir los libros", err)
    })
  }, [])

  function borrarRegistro({ id }) {
    api.delete(`/borrar/${id}`).then((res) => {
      alert(res.data)
      window.location.reload();
    }).catch((err) => {
      console.log('Hubo un problema al elimir el registro', err)
    })
  }

  const conteoGeneros = libros.reduce((acc, curr) => {
    acc[curr.genero?.genero] = (acc[curr.genero?.genero] || 0) + 1;
    return acc;
  }, {});


  const dataGrafica = Object.entries(conteoGeneros).map(([label, value]) => ({
    label,
    value
  }));

  return (
    <div>

      <Table aria-label="Lista de libros" className='m-5'>
        <TableHeader>
          <TableColumn>Titulo</TableColumn>
          <TableColumn>Autro</TableColumn>
          <TableColumn>Genero</TableColumn>
          <TableColumn>Disponibilidad</TableColumn>
          <TableColumn>Editar</TableColumn>
          <TableColumn>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {libros.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.titulo}</TableCell>
              <TableCell>{item.autor}</TableCell>
              <TableCell>{item.genero?.genero}</TableCell>
              <TableCell>{item.disponible?.disponible}</TableCell>
              <TableCell>
                <Button onPress={() => { setLibroSeleccionado(item); onOpen(); }} >Editar</Button>
              </TableCell>
              <TableCell>
                <Button onPress={() => borrarRegistro({ id: item.id })}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PieChart
        series={[
          {
            data: dataGrafica,
          },
        ]}
        width={120}
        height={120}
      />

      <Button className='m-5' onPress={onOpenCreate}>Añadir Libro</Button>
      <ModalCrear isOpen={isOpenCreate} onOpenChange={onOpenChangeCreate} />

      <ModalEditar isOpen={isOpen} onOpenChange={onOpenChange} libro={libroSeleccionado} />
      <Button className='m-5' onPress={() => navigate('/gestor/permisos')}>Gestión de permisos</Button>
    </div>
  );
}

export default App;
