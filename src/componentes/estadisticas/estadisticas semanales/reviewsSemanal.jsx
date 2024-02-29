import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchReviewStats } from '../../../redux/Action/action';
import UserStatisticsChart from "../estadisticas semanales/usuariosPorSemana";
import ProductStatisticsWeek from "../estadisticas semanales/productSemanal"
import "./reviewsSemanal.css";

const ReviewStatisticsChartSemanal = () => {
  const dispatch = useDispatch();
  const reviewStats = useSelector(state => state.stats1); // Usamos el nuevo estado stats1

  const reviewChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(fetchReviewStats());
  }, [dispatch]);

  useEffect(() => {
    // Fetch de las estadísticas de reviews al montar el componente
    dispatch(fetchReviewStats())
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching review statistics:', error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    // Limpiar al desmontar
    return () => {
      if (reviewChartRef.current && reviewChartRef.current.chart) {
        reviewChartRef.current.chart.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Renderiza el gráfico de reviews cuando los datos estén disponibles
    if (dataLoaded && reviewStats && reviewStats.length > 0) {
      const labels = reviewStats.filter(stat => stat.dayOfWeek).map(stat => stat.dayOfWeek); // Filtrar para obtener solo los objetos con dayOfWeek definido y usarlos como etiquetas
      const data = reviewStats.filter(stat => stat.userCount).map(stat => parseInt(stat.userCount)); // Filtrar para obtener solo los objetos con userCount definido y convertir la cadena a número

      renderChart(
        reviewChartRef,
        labels, // Usar los días de la semana como etiquetas
        data, // Usar el recuento de usuarios como datos
        'Review Statistics', // Añadido el título
        'bar', // Tipo de gráfico
        'rgba(255, 99, 132, 0.2)' // Color de fondo
      );
    }
  }, [dataLoaded, reviewStats]);

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
          label: label, // Usar la etiqueta proporcionada
          data: data,
          backgroundColor: color,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: labels,
            position: 'bottom',
            reverse: false // De menor a mayor
          },
          y: {
            beginAtZero: true,
            stepSize: 1, // Tamaño del paso
            suggestedMin: 1, // Mínimo sugerido
            suggestedMax: 15 // Máximo sugerido
          }
        }
      }
    });
  };

  return (
    <div className="chart-container2b">
      <div className="chart2b">
        <h2>Review Statistics</h2>
        <canvas ref={reviewChartRef}></canvas>
        {reviewStats && reviewStats.length > 0 && (
          <div className='fechas'>
            <p>Fecha de inicio: {reviewStats[0].weekStartDate}</p>
            <p>Fecha de fin: {reviewStats[0].weekEndDate}</p>
          </div>
        )}
      </div>
      <div className='user'>
        <UserStatisticsChart/>
      </div>
      <div className='product'>
        <ProductStatisticsWeek/>
      </div>
    </div>
  );
}

export default ReviewStatisticsChartSemanal;