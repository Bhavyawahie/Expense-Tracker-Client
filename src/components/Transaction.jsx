import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../util/format'

export const Transaction = (props) => {
    const { transaction } = props;
    const { deleteTransaction } = useContext(GlobalContext);
    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text} <span>{sign}₹{numberWithCommas(Math.abs(transaction.amount))}</span><button className="delete-btn" onClick={() =>  deleteTransaction(transaction._id)}>x</button>
        </li>
    )
}
