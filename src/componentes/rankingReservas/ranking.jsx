import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRanking } from '../../redux/Action/action';
import './ranking.css';

const RankingComponent = () => {
  const dispatch = useDispatch();
  const rankingState = useSelector(state => state.ranking); 
  const { loading, ranking, error } = rankingState || {}; 

  useEffect(() => {
    const storedRanking = localStorage.getItem('ranking'); 
    if (!rankingState || !ranking) { // Verifica si no hay datos de ranking en el estado o en el almacenamiento local
      dispatch(fetchRanking());
    }
  }, [dispatch, rankingState, ranking]);

  useEffect(() => {
    if (ranking) {
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }, [ranking]);

  if (!rankingState || loading) { 
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar el ranking: {error}</div>;
  }

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Hospedajes más reservados</h2>
      <div className="ranking-list">
        {ranking.map((item, index) => (
          <div key={index} className="ranking-item">
            <span className="ranking-position">{Object.keys(item)[0]}</span>
            <span className="ranking-product">{item[Object.keys(item)[0]]}</span>
            <span className="ranking-count">{item.reservasCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingComponent;