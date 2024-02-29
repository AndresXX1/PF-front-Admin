import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchUserStatsYear } from '../../../redux/Action/action'; 
import "./userAnual.css";

const UserStatisticsChartYear = () => { 
  const dispatch = useDispatch();
  const userStatsYear = useSelector(state => state.userStatsYear); 

  const userChartRef = useRef(null); 
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(fetchUserStatsYear()); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserStatsYear())
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching user statistics:', error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    return () => {
      if (userChartRef.current && userChartRef.current.chart) {
        userChartRef.current.chart.destroy(); 
      }
    };
  }, []);

  useEffect(() => {
    if (dataLoaded && userStatsYear && userStatsYear.length > 0) {
      const labels = userStatsYear.map(stat => stat.Month); 
      const data = userStatsYear.map(stat => parseInt(stat.userCount)); 

      renderChart(
        userChartRef,
        labels,
        data,
        'User Statistics', // Cambia el título del gráfico
        'bar',
        'rgba(75, 192, 192, 0.2)' // Cambia el color del gráfico
      );
    }
  }, [dataLoaded, userStatsYear]);

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
          borderColor: 'rgba(75, 192, 192, 1)', // Cambia el color del borde del gráfico
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
    <div className="chart-container3">
      <div className="chart3">
        <h2>User Statistics</h2> 
        <canvas ref={userChartRef}></canvas> 
        {userStatsYear && userStatsYear.length > 0 && (
          <div className='fechas'>
            <p>.</p>
            <p>Year: {userStatsYear[0].year}</p> 
          </div>
        )}
      </div>
    </div>
  );
}

export default UserStatisticsChartYear;