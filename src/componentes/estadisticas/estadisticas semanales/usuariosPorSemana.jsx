import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { fetchUserStats } from '../../../redux/Action/action'; 
import "./usuariosXsemana.css";

const UserStatisticsChart = () => {
  const dispatch = useDispatch();
  const userStats = useSelector(state => state.stats);
  const userChartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchUserStats())
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
    if (dataLoaded && userStats && userStats.length > 0) {
      const labels = userStats.map(stat => stat.dayOfWeek);
      const data = userStats.map(stat => parseInt(stat.userCount));

      renderChart(
        userChartRef,
        labels,
        data,
        'User Statistics',
        'bar',
        'rgba(75, 192, 192, 0.2)'
      );
    }
  }, [dataLoaded, userStats]);

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
    <div className="chart-container1b">
      <div className="chart1b">
        <h2>User Statistics</h2>
        <canvas ref={userChartRef}></canvas>
        {userStats && userStats.length > 0 && (
          <div className='fechas'>
            <p>Fecha de inicio: {userStats[0].weekStartDate}</p>
            <p>Fecha de fin: {userStats[0].weekEndDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserStatisticsChart;