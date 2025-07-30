import { useState, useEffect } from 'react';
import './CSS/App.css';
import api from './Service/api';
import ModalEditar from './Fragments/ModalEditar';
import ModalCrear from './Fragments/ModalCrear';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, useDisclosure } from "@heroui/react";

function App() {

  const [libros, setLibros] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onOpenChange: onOpenChangeCreate } = useDisclosure();
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  useEffect(() => {

    api.get('/libros').then((res) => {
      setLibros(res.data)
    }).catch((err) => {
      console.log("Error a imprimir los libros", err)
    })

  }, [])

  function borrarRegistro({id}){
    console.log(id)
    api.delete(`/borrar/${id}`).then((res)=>{
        alert(res.data)
        window.location.reload();
    }).catch((err)=>{
      console.log('Hubo un problema al elimir el registro', err)
    })
  }


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
                <Button aria-label={`Editar ${item.id}`} onPress={() =>{setLibroSeleccionado(item); onOpen();}} >Editar</Button>
              </TableCell>
              <TableCell>
                <Button aria-label={`Eliminar ${item.id}`} onPress={()=> borrarRegistro({id: item.id})}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>


      <div>
        <>
          <ModalEditar isOpen={isOpen} onOpenChange={onOpenChange} libro={libroSeleccionado}/>
        </>
      </div>
        
        <Button className='m-5' onPress={onOpenCreate}>Añadir Libro</Button>

        <div>
        <>
          <ModalCrear isOpen={isOpenCreate} onOpenChange={onOpenChangeCreate}/>
        </>
      </div>
          
    </div>
  );
}

export default App;
