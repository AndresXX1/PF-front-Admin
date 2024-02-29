import React, { useState, useEffect } from 'react';
import SampleStatisticsChart from '../estadisticas por dia/estadisticas';
import ReviewStatisticsChartSemanal from "../estadisticas semanales/reviewsSemanal"
import ReviewStatisticsChartMensual from "../estadisticas mensual/reviewsMensual"
import ReviewStatisticsChartYearly from "../estadistica anual/reviewsAnual";
import RankingComponent from '../../rankingReservas/ranking';

import "./seleccion.css";
import { useDispatch } from 'react-redux';
import { fetchHourlyReservationStats } from '../../../redux/Action/action';

const RenderComponents = () => {
    const [selectedOption, setSelectedOption] = useState('day');
    const [clearData, setClearData] = useState(false);
    const dispatch = useDispatch();

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setClearData(true); // Activar la limpieza de datos
    };

    const handleDataClear = () => {
        setClearData(false); // Desactivar la limpieza de datos después de que se complete
    };

    useEffect(() => {
        // Cargar los datos al montar el componente
        dispatch(fetchHourlyReservationStats())
            .catch(error => {
                console.error('Error fetching hourly reservation statistics:', error);
            });
    }, [dispatch]);
  
    return (
        <div className="statistics-container">
            <div>
                <button style={{color: "black", borderBottom: "1px solid black"}}
                    className={selectedOption === 'day' ? 'selected' : ''}
                    onClick={() => handleOptionChange('day')}
                >
                    Día
                </button>
                <button style={{color: "black", borderBottom: "1px solid black"}}
                    className={selectedOption === 'week' ? 'selected' : ''}
                    onClick={() => handleOptionChange('week')}
                >
                    Semana
                </button>
                <button style={{color: "black", borderBottom: "1px solid black"}}
                    className={selectedOption === 'month' ? 'selected' : ''}
                    onClick={() => handleOptionChange('month')}
                >
                    Mes
                </button>
                <button style={{color: "black", borderBottom: "1px solid black"}}
                    className={selectedOption === 'year' ? 'selected' : ''}
                    onClick={() => handleOptionChange('year')}
                >
                    Año
                </button>
            </div>
            <div>
                {selectedOption === 'day' && <SampleStatisticsChart />}
                {selectedOption === 'week' && <ReviewStatisticsChartSemanal clearData={clearData} onClearData={handleDataClear} />}
                {selectedOption === 'month' && <ReviewStatisticsChartMensual clearData={clearData} onClearData={handleDataClear} />}
                {selectedOption === 'year' && <ReviewStatisticsChartYearly clearData={clearData} onClearData={handleDataClear} />}
                
               
            </div>
            <RankingComponent/>
        </div>
    );
};

export default RenderComponents;