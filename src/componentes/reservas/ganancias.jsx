import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGananciasHostelPremium } from '../../redux/Action/action';
import "./ganancias.css";

const FuturisticTotalGananciasDisplay = () => {
    const dispatch = useDispatch();
    const gananciasHostelPremium = useSelector(state => state.gananciasHostelPremium?.gananciasHostelPremium);

    console.log(gananciasHostelPremium, "aca");

    useEffect(() => {
        // Verificar si ganancias es undefined o un array vacío antes de hacer la petición
        if (gananciasHostelPremium === undefined ) {
            dispatch(fetchGananciasHostelPremium());
        }
    }, [dispatch, gananciasHostelPremium]);

    return (
        <div className="futuristic-total-ganancias-container">
            <div className="futuristic-total-ganancias">Ganancias del Hostel Premium: <br />{gananciasHostelPremium} <br />ARS</div>
        </div>
    );
};

export default FuturisticTotalGananciasDisplay;