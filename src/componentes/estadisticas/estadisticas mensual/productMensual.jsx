import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchProductStatsMes } from '../../../redux/Action/action'; 
import "./productMensual.css";

const ProductStatisticsMonth = () => {
  const dispatch = useDispatch();
  const productStatsMes = useSelector(state => state.productStatsMes); 

  const productChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    
    dispatch(fetchProductStatsMes())
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
    
    if (dataLoaded && productStatsMes && productStatsMes.length > 0) {
      const labels = productStatsMes.map(stat => stat.Week); 
      const data = productStatsMes.map(stat => parseInt(stat.productCount));

      renderChart(
        productChartRef,
        labels, 
        data, 
        'Product Statistics', 
        'bar',
        'rgba(54, 162, 235, 0.2)'
      );
    }
  }, [dataLoaded, productStatsMes]);

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
    <div className="cajassd">
      <div className="cajite">
        <h2>Product Statistics</h2>
        <canvas ref={productChartRef}></canvas>
        {dataLoaded && productStatsMes && productStatsMes.length > 0 && (
          <div className='fechas'>

            <p>.</p>
            <p>Month Date: {productStatsMes[0].monthDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductStatisticsMonth;