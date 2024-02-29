import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchProductStatsYear } from '../../../redux/Action/action'; 
import "./productAnual.css";

const ProductStatisticsYear = () => {
  const dispatch = useDispatch();
  const productStatsYear = useSelector(state => state.productStatsYear); 

  const productChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductStatsYear())
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
    if (dataLoaded && productStatsYear && productStatsYear.length > 0) {
      const labels = productStatsYear.map(stat => stat.Month); 
      const data = productStatsYear.map(stat => parseInt(stat.productCount));

      renderChart(
        productChartRef,
        labels, 
        data, 
        'Product Statistics', 
        'bar',
        'rgba(54, 162, 235, 0.2)'
      );
    }
  }, [dataLoaded, productStatsYear]);

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
    <div className="chart-container3D">
      <div className="chart3D">
        <h2>Product Statistics</h2>
        <canvas ref={productChartRef}></canvas>
        {dataLoaded && productStatsYear && productStatsYear.length > 0 && (
          <div className='fechas'>
            
            <p>Year: {productStatsYear[0].year}</p>
          </div>
        )}
        {(!dataLoaded || !productStatsYear || productStatsYear.length === 0) && (
          <div className='fechas'>
            <p>.</p>
            <p>Year: 2024</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductStatisticsYear;