import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchHourlyReservationStats } from '../../../redux/Action/action';
import "./reservas.css";

const HourlyReservationStatisticsChart = () => {
  const dispatch = useDispatch();
  const hourlyReservationStats = useSelector(state => state.hourlyReservationStats);

  const chartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch de las estadísticas de reserva por hora al montar el componente
    dispatch(fetchHourlyReservationStats())
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching hourly reservation statistics:', error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    // Limpiar al desmontar
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Renderiza el gráfico de reserva por hora cuando los datos estén disponibles
    if (dataLoaded && hourlyReservationStats && hourlyReservationStats.length > 0) {
      const labels = hourlyReservationStats.map(stat => `${stat.hour}:00`);
      const data = hourlyReservationStats.map(stat => parseInt(stat.reservationCount)); // Convertir la cadena a número

      renderChart(
        chartRef,
        labels, // Usar las horas como etiquetas del eje x
        data, // Usar el recuento de reservas como datos del eje y
        'Estadísticas de Reserva por Hora', // Título más grande
        'doughnut', // Cambiado a doughnut para un estilo más moderno
        [
          '#FF8042', 
          '#0088FE', 
          '#00C49F', 
          '#FFBB28', 
          '#AF19FF', 
          '#FF1919',
          '#FF0000', // Rojo
          '#FF7F00', // Naranja
          '#FFFF00', // Amarillo
          '#FFD700', // Oro
          '#FFA500', // Naranja
          '#FF4500', // Rojo anaranjado
          '#FF6347', // Coral
          '#FF8C00', // Naranja oscuro
          '#FFDAB9', // Durazno
          '#FF69B4', // Rosa intenso
          '#FF1493', // Rosa profundo
          '#FF00FF', // Magenta
          '#FF69B4', // Rosa profundo
          '#FF1493', // Rosa intenso
          '#FF00FF'  // Magenta
        ]
      );
    }
  }, [dataLoaded, hourlyReservationStats]);

  const renderChart = (chartRef, labels, data, label, chartType, colors) => {
    if (!chartRef.current) return;
    
    // Destruir el gráfico anterior si existe
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
  
    chartRef.current.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: label, // Usar la etiqueta proporcionada
          data: data,
          backgroundColor: colors,
          borderColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom' // Mover la leyenda al fondo
          }
        },
        spacing: 10 // Espaciado entre las secciones de la rueda
      }
    });

    // Estilos para el título
    const chartTitle = chartRef.current.parentNode.querySelector('.chart-title');
    chartTitle.style.fontSize = '20px';
    chartTitle.style.fontWeight = 'bold';
    chartTitle.style.marginBottom = '20px';

    // Reducir el tamaño del contenedor del gráfico
    const chartContainer = chartRef.current.parentNode;
    chartContainer.style.width = '19%'; // Reducir el ancho en un 15%
    chartContainer.style.height = '19%'; // Reducir la altura en un 15%
  };

  return (
    <div className="chart-containeri">
      <div className="charti">
        <h2 className="chart-title">Estadísticas de Reserva por Hora</h2>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default HourlyReservationStatisticsChart;