import React, { useContext, useEffect } from 'react'
import { GlobalContext  } from '../context/GlobalState'
import { Transaction } from './Transaction'

export const TransactionList = () => {
    const { error, loading, transactions, getTransactions } = useContext(GlobalContext)
    
    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>  
            <h3>History</h3>
            {loading? <p>loading...</p> : error? <p>{error}</p> : (<ul className="list">
                {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />)) }
            </ul> )}
        </>
    )
}
