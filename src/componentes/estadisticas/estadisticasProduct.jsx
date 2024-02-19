import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { getProductStatistics } from '../../redux/Action/action';
import "./estadisticasP.css";

const ProductStatisticsChart = () => {
  const dispatch = useDispatch();
  const productStats = useSelector(state => state.productStatistics);

  const productChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch de las estadísticas de producto al montar el componente
    dispatch(getProductStatistics())
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching product statistics:', error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    // Limpiar al desmontar
    return () => {
      if (productChartRef.current && productChartRef.current.chart) {
        productChartRef.current.chart.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Renderiza el gráfico de producto cuando los datos estén disponibles
    if (dataLoaded && productStats && productStats.length > 0) {
      const labels = productStats.map(stat => stat.hour);
      const data = productStats.map(stat => parseInt(stat.productCount)); // Convertir la cadena a número

      renderChart(
        productChartRef,
        labels, // Usar las horas como etiquetas del eje x
        data, // Usar el recuento de productos como datos del eje y
        'Product Statistics',
        'bar',
        'rgba(54, 162, 235, 0.2)',
        
      );
    }
  }, [dataLoaded, productStats]);

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
    <div className="chart-container3">
      <div className="chart3">
        <h2>Product Statistics</h2>
        <canvas ref={productChartRef}></canvas>
      </div>
    </div>
  );
}

export default ProductStatisticsChart;
