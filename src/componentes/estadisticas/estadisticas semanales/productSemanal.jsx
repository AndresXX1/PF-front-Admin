import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchProductStatsSemana } from '../../../redux/Action/action'; 
import "./productSemanal.css";

const ProductStatisticsWeek = () => {
  const dispatch = useDispatch();
  const productStats = useSelector(state => state.productStats); // Cambiado el nombre a productStats

  const productChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    // Fetch de las estadísticas de productos al montar el componente
    dispatch(fetchProductStatsSemana())
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
    // Renderiza el gráfico de productos cuando los datos estén disponibles
    if (dataLoaded && productStats && productStats.length > 0) {
      const labels = productStats.map(stat => stat.dayOfWeek); // Usar los días de la semana como etiquetas
      const data = productStats.map(stat => parseInt(stat.productCount)); // Convertir la cadena a número

      renderChart(
        productChartRef,
        labels, // Usar los días de la semana como etiquetas
        data, // Usar el recuento de productos como datos
        'Product Statistics', // Añadido el título
        'bar', // Tipo de gráfico
        'rgba(54, 162, 235, 0.2)' // Color de fondo
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
    <div className="chart-container3b">
      <div className="chart3b">
        <h2>Product Statistics</h2>
        <canvas ref={productChartRef}></canvas>
       {dataLoaded && productStats && productStats.length > 0 && (
  <div className='fechas'>
    <p>Fecha de inicio: {productStats[0].weekStartDate}</p>
    <p>Fecha de fin: {productStats[0].weekEndDate}</p>
  </div>
)}
      </div>
    </div>
  );
}

export default ProductStatisticsWeek;