import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { getProductStatistics } from '../../../redux/Action/action';
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
          label: label, // Usar la etiqueta proporcionada
          data: data,
          backgroundColor: color,
          borderColor: 'rgba(75, 192, 192, 1)',
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
    <div className="chart-containerk1">
      <div className="chartk1">
        <h2>Product Statistics</h2>
        <canvas ref={productChartRef}></canvas>
        <p>.</p>
        <p style={{color: "white"}}>Estadisticas por hora</p>
     
      </div>
    </div>
  );
}

export default ProductStatisticsChart;
