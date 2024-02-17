import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './estadisticas.css';

const SampleStatisticsChart = () => {
  const userChartRef = useRef(null);
  const reviewChartRef = useRef(null);
  const productChartRef = useRef(null);

  useEffect(() => {
    const generateRandomMonthlyData = () => {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Novimbre', 'Diciembre'];
      const labels = [];
      const data = [];

      for (let i = 0; i < 12; i++) {
        labels.push(months[i]);
        data.push(Math.floor(Math.random() * 100));
      }

      return { labels, data };
    };

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
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    const userData = generateRandomMonthlyData();
    const reviewData = generateRandomMonthlyData();
    const productData = generateRandomMonthlyData();

    // Gráfico de usuarios (barras)
    renderChart(userChartRef, userData.labels, userData.data, 'User Statistics', 'bar', 'rgba(75, 192, 192, 0.2)');

    // Gráfico de reseñas (línea)
    renderChart(reviewChartRef, reviewData.labels, reviewData.data, 'Review Statistics', 'line', 'rgba(255, 159, 64, 0.2)');

    // Gráfico de productos (radar)
    renderChart(productChartRef, productData.labels, productData.data, 'Product Statistics', 'radar', 'rgba(153, 102, 255, 0.2)');

    // Limpiar al desmontar
    return () => {
      if (userChartRef.current.chart) {
        userChartRef.current.chart.destroy();
      }
      if (reviewChartRef.current.chart) {
        reviewChartRef.current.chart.destroy();
      }
      if (productChartRef.current.chart) {
        productChartRef.current.chart.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <div className="chart">
        <h2>User Statistics</h2>
        <canvas ref={userChartRef}></canvas>
      </div>

      <div className="chart">
        <h2>Review Statistics</h2>
        <canvas ref={reviewChartRef}></canvas>
      </div>

      <div className="chart">
        <h2>Product Statistics</h2>
        <canvas ref={productChartRef}></canvas>
      </div>
    </div>
  );
};

export default SampleStatisticsChart;