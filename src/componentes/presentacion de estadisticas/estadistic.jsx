import React from 'react';
import HourlyReservationStatisticsChart from '../estadisticas/estadisticas por dia/reservas';
import RenderComponents from '../estadisticas/seleccion/seleccion';
import RankingComponent from "../rankingReservas/ranking";
import ConfiguracionesDashboard from "../presentacion/presentacion";
import "./estilos.css"
import FuturisticTotalAmountDisplay from "../reservas/totalAmoun";
import FuturisticTotalGananciasDisplay from "../reservas/ganancias";


const Dashboardeng = () => {
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="temporal-selection">
                <RenderComponents />
            </div>
            <div className="hourly-reservation-stats">
                <HourlyReservationStatisticsChart />
            </div>
            <div className="totalamount">
                <FuturisticTotalAmountDisplay/>
            </div>
            <div className="ganancias">
                <FuturisticTotalGananciasDisplay/>
            </div>

            <div className='ranking'>
                <RankingComponent/>
            </div>
            <div>
        <ConfiguracionesDashboard />
            </div>
        </div>
    );
};

export default Dashboardeng;