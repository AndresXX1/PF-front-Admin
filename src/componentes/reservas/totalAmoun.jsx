import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTotalAmount } from '../../redux/Action/action';
import "./totalAmoun.css"

const FuturisticTotalAmountDisplay = () => {
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.totalAmount?.totalAmount); // Agregar verificación de nulidad

    console.log(totalAmount, "csdasdcvvd");

    useEffect(() => {
        // Verificar si totalAmount es undefined antes de hacer la petición
        if (totalAmount === undefined) {
            dispatch(fetchTotalAmount());
        }
    }, [dispatch, totalAmount]);

  
    

    return (
        <div className="futuristic-total-amount-container">
            <div className="futuristic-total-amount">Movimiento total: <br />{totalAmount} <br />Ars</div>
        </div>
    );
};

export default FuturisticTotalAmountDisplay;