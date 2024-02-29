import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import './estadisticas.css';
import { fetchReviewStatistics } from '../../../redux/Action/action';
import ProductStatisticsChart  from "./estadisticasProduct";
import UserStatisticsChart from "./usuariosPorDia";
 
const SampleStatisticsChart = () => {
  const dispatch = useDispatch();
  const reviewStats = useSelector(state => state.reviewStatistics); // Obtén las estadísticas de revisión del estado

  const reviewChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch de las estadísticas de revisión al montar el componente
    dispatch(fetchReviewStatistics())
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
    // Renderiza el gráfico de revisión cuando los datos estén disponibles
    if (dataLoaded && reviewStats && reviewStats.length > 0) {
      const formattedHours = reviewStats.map(stat => {
        const hour = parseInt(stat.hour);
        return `${hour < 10 ? '0' : ''}${hour}:00`;
      });

      renderChart(
        reviewChartRef,
        formattedHours, // Usar las horas formateadas como etiquetas del eje x
        reviewStats.map(stat => stat.reviewCount), // Usar el recuento de revisiones como datos del eje y
        'Review Statistics',
        'bar',
        'rgba(255, 99, 132, 0.2)'
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
    
    <div className="chart-container2a">
      <div className="chart2a">
        <h2>Review Statistics</h2>
        <canvas ref={reviewChartRef}></canvas>
        <p>.</p>
        <p style={{color: "white"}}>Estadisticas por hora</p>
      </div>
      <div className='product'>

      <ProductStatisticsChart/>
      </div>
      <div className='user'>

      <UserStatisticsChart/>
      </div>
    </div>
  );
}

export default SampleStatisticsChart;