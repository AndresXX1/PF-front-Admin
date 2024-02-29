import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchReservas, deleteReserva } from '../../redux/Action/action';
import './tabla.css';
import DeleteIcon from '@mui/icons-material/Delete';

const ReservasTableComponent = ({ reservas, fetchReservas, deleteReserva }) => {
  useEffect(() => {
    fetchReservas(); // Llamar a fetchReservas cuando el componente se monte o se actualice
  }, [fetchReservas]);

  const handleDelete = async (reservaId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva? esta accion no se puede desacer ya que se borra de la base de datos y puede perjudicar al usuario')) {
    try {
      console.log('Deleting reserva:', reservaId);
      await deleteReserva(reservaId);
      fetchReservas(); // Volver a cargar las reservas después de eliminar una
    } catch (error) {
      console.error('Error deleting reserva:', error);
    }
  }
  };

  return (
    <div style={{
      border: "1px solid transparent",
      marginTop: "100px",
      height: "720px",
      width: "auto",
      marginLeft: "230px",
      borderRadius: "10px",
      backgroundColor: "transparent",
      marginBottom: "50px"
    }}>
      <div className="reservas">
        <h2 className="titulo">Todas las Reservas</h2>
        <table>
          <thead>
            <tr>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>ID</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Producto ID</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>User ID</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Fecha de Inicio</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Fecha de Fin</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Total de Habitaciones</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Total de Huéspedes</th>
              <th style={{ border: "transparent", backgroundColor: "salmon"}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas && reservas.map((reserva) => (
              <tr key={reserva.id} style={{ backgroundColor: 'transparent' }} >
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.id}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.productId}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.userId}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.startDate}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.endDate}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.totalRooms}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>{reserva.totalGuests}</td>
                <td style={{ border: "transparent", padding: "15px", textAlign: "left", fontSize: "20px" }}>
                  <button className="delete" onClick={() => handleDelete(reserva.id)}>
                  <DeleteIcon/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  reservas: state.reservas,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReservas: () => dispatch(fetchReservas()),
  deleteReserva: (reservaId) => dispatch(deleteReserva(reservaId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservasTableComponent);