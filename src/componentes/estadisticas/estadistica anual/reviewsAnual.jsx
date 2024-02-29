import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchReviewStatsYear } from '../../../redux/Action/action'; // Asegúrate de importar la acción correcta
import ProductStatisticsYear from "./productAnual";
import UserStatisticsChartYear from "./userAnual";
import "./reviewsAnual.css";

const ReviewStatisticsChartYearly = () => {
  const dispatch = useDispatch();
  const reviewStatsYear = useSelector(state => state.reviewStatsYear);

  const reviewChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(fetchReviewStatsYear()); 
  }, [dispatch]);

  useEffect(() => {
    
    dispatch(fetchReviewStatsYear())
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching review statistics:', error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    
    return () => {
      if (reviewChartRef.current && reviewChartRef.current.chart) {
        reviewChartRef.current.chart.destroy();
      }
    };
  }, []);

  useEffect(() => {
   
    if (dataLoaded && reviewStatsYear && reviewStatsYear.length > 0) {
      const labels = reviewStatsYear.map(stat => stat.Month); 
      const data = reviewStatsYear.map(stat => parseInt(stat.reviewCount)); 

      renderChart(
        reviewChartRef,
        labels,
        data,
        'Review Statistics', // Cambia el título del gráfico
        'bar',
        'rgba(255, 99, 132, 0.2)' // Cambia el color del gráfico
      );
    }
  }, [dataLoaded, reviewStatsYear]);

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
    <div className="chart-container2">
      <div className="chart2">
        <h2>Review Statistics</h2>
        <canvas ref={reviewChartRef}></canvas>
        {reviewStatsYear && reviewStatsYear.length > 0 && (
          <div className='fechas'>
            <p>.</p>
            <p>Year: {reviewStatsYear[0].year}</p>
          </div>
        )}
      </div>
      <div className='product'>
        <ProductStatisticsYear/>      
      </div>
      <div className='user'>
          <UserStatisticsChartYear/>
      </div>
    </div>
  );
}

export default ReviewStatisticsChartYearly;