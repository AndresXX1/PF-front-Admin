import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import style from "./products.module.css"

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Llama a la API para obtener los productos cuando se monta el componente
    axios.get('https://jsonplaceholder.typicode.com/posts')//aca iria la api.
      .then(response => {
        setProductos(response.data); // Ajusta según la estructura de datos que recibas
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  const eliminarProducto = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  return (
    <div>
      <h2>Tabla de Productos</h2>
      <table className={style.tabla-productos}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Temporada</th>
            <th>Precio por Noche</th>
            <th>Total de Habitaciones</th>
            <th>Piscina</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.name}</td>
              <td>{producto.location}</td>
              <td>{producto.season}</td>
              <td>{producto.pricePerNight}</td>
              <td>{producto.totalRooms}</td>
              <td>{producto.pool ? 'Sí' : 'No'}</td>
              <td><img src={producto.image} alt={producto.name} style={{ width: '50px', height: '50px' }} /></td>
              <td><button onClick={() => eliminarProducto(producto.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;