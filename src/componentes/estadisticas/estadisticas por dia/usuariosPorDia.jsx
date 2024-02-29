import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { getUserStatistics } from '../../../redux/Action/action';
import "./usuariosdsdd1.css";

const UserStatisticsChart = () => {
  const dispatch = useDispatch();
  const userStats = useSelector(state => state.data); // Corregido el acceso a los datos

  const userChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch de las estadísticas de usuarios al montar el componente
    dispatch(getUserStatistics())
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching user statistics:', error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    // Limpiar al desmontar
    return () => {
      if (userChartRef.current && userChartRef.current.chart) {
        userChartRef.current.chart.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Renderiza el gráfico de usuarios cuando los datos estén disponibles
    if (dataLoaded && userStats && userStats.length > 0) {
      const labels = userStats.map(stat => stat.hour);
      const data = userStats.map(stat => parseInt(stat.userCount)); // Convertir la cadena a número

      renderChart(
        userChartRef,
        labels, // Usar las horas como etiquetas
        data, // Usar el recuento de usuarios como datos
        'User Statistics', // Añadido el título
        'bar', // Tipo de gráfico
        'rgba(75, 192, 192, 0.2)' // Color de fondo
      );
    }
  }, [dataLoaded, userStats]);

  const renderChart = (chartRef, labels, data, label, chartType, color) => {
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
          label: label,
          data: data,
          backgroundColor: color,
          borderColor: 'rgba(75, 192, 192, 1)', // Cambia el color del borde del gráfico
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: labels,
            position: 'bottom',
            reverse: false
          },
          y: {
            beginAtZero: true,
            stepSize: 1,
            suggestedMin: 1,
            suggestedMax: 15
          }
        }
      }
    });
  };

  return (
    <div className="chart-container1a">
      <div className="chart1a">
        <h2>User Statistics</h2>
        <canvas ref={userChartRef}></canvas>
        <p>.</p>
        <p style={{color: "white"}}>Estadisticas por hora</p>
      </div>
    </div>
  );
}

export default UserStatisticsChart;