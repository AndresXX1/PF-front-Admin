import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import './estadisticas.css';
import { fetchReviewStatistics } from '../../redux/Action/action';
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
        'rgba(54, 162, 235, 0.2)'
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
                label: label,
                data: data,
                backgroundColor: color,
                borderColor: 'rgba(255, 255, 255, 1)', // Cambiar el color del borde
                borderWidth: 2, // Aumentar el ancho del borde
                borderRadius: 20, // Agregar bordes redondeados a las barras
                hoverBackgroundColor: 'rgba(255, 255, 255, 0.8)', // Cambiar el color de fondo al pasar el ratón
                hoverBorderColor: 'rgba(255, 255, 255, 1)', // Cambiar el color del borde al pasar el ratón
                hoverBorderWidth: 3 // Aumentar el ancho del borde al pasar el ratón
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 1)' // Cambiar el color del texto de la leyenda
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Cambiar el color de las líneas de la cuadrícula en el eje x
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)' // Cambiar el color de las etiquetas del eje x
                    }
                },
                y: {
                    beginAtZero: true, // Comenzar el eje Y desde 0
                    max: 10, // Establecer el máximo en 10 unidades
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Cambiar el color de las líneas de la cuadrícula en el eje y
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)' // Cambiar el color de las etiquetas del eje y
                    }
                }
            }
        }
    });
};
  return (
    
    <div className="chart-container2">
      <div className="chart2">
        <h2>Review Statistics</h2>
        <canvas ref={reviewChartRef}></canvas>
      </div>
      <div className='product'>

      <ProductStatisticsChart/>
      <div className='user'>

      <UserStatisticsChart/>
      </div>
      </div>
    </div>
  );
}

export default SampleStatisticsChart;