import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../util/format'

export const IncomeExpenses = () => {
    const { loading, transactions } = useContext(GlobalContext);
    let [amounts, setAmounts] = useState([])
    let [income, setIncome] = useState(0)
    let [expense, setExpense] = useState(0)
    
    useEffect(() => {
        if(!loading) {
            setAmounts([...transactions.map(transaction => transaction.amount)])
        }
    }, [loading, transactions])
    
    useEffect(() =>{
        setIncome(amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2))
        setExpense((amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)*-1).toFixed(2))
    }, [amounts])
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">₹{numberWithCommas(income)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">₹{numberWithCommas(expense)}</p>
            </div>
        </div>
    )
}
