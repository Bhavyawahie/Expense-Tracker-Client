import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext  } from '../context/GlobalState'
import { numberWithCommas } from '../util/format'


export const Balance = () => {
    const { error, loading, transactions } = useContext(GlobalContext)
    let [amounts, setAmounts] = useState([])
    let [total, setTotal] = useState(0)

    useEffect(() => {
        if(!loading) {
            setAmounts([...transactions.map(transaction => transaction.amount)])
        }
    }, [loading, transactions])

    useEffect(() =>{
        setTotal(amounts.reduce((acc, item) => (acc += item), 0).toFixed(2))
    }, [amounts])
    
    return (
        <>
        <h4>Your Balance</h4>
        <h1>₹{numberWithCommas(total)}</h1>
    </>
    )
}
