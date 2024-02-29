import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchProductStatsMonth } from '../../../redux/Action/action'; 
import ProductStatisticsMonth from "../estadisticas mensual/productMensual";
import UserStatisticsChartMensual from "../estadisticas mensual/usersMensual";
import "./reviewsMensual.css";

const ReviewStatisticsChartMensual = () => {
  const dispatch = useDispatch();
  const reviewStatsMonth = useSelector(state => state.productStatsMonth); 

  const reviewChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(fetchProductStatsMonth()); 
  }, [dispatch]);

  useEffect(() => {
    
    dispatch(fetchProductStatsMonth())
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
   
    if (dataLoaded && reviewStatsMonth && reviewStatsMonth.length > 0) {
      const labels = reviewStatsMonth.map(stat => stat.Week); 
      const data = reviewStatsMonth.map(stat => parseInt(stat.reviewCount)); 

      renderChart(
        reviewChartRef,
        labels,
        data,
        'Review Statistics', // Cambia el título del gráfico
        'bar',
        'rgba(255, 99, 132, 0.2)' // Cambia el color del gráfico
      );
    }
  }, [dataLoaded, reviewStatsMonth]);

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
    <div className="consadsd">
      <div className="dsdfds">
        <h2>Review Statistics</h2>
        <canvas ref={reviewChartRef}></canvas>
        {reviewStatsMonth && reviewStatsMonth.length > 0 && (
          <div className='fechas'>
            <p>.</p>
            <p>Month Date: {reviewStatsMonth[0].monthDate}</p>
          </div>
        )}
      </div>
      <div className='product'>
      <ProductStatisticsMonth/>
      </div>
      <div className='user'>
<UserStatisticsChartMensual/>
      </div>
    </div>
  );
}

export default ReviewStatisticsChartMensual;