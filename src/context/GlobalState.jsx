import React, { createContext, useReducer } from "react";
import {AppReducer} from "./AppReducer"
import axios from "axios";
//Initial State
const initialState = {
    transactions : [],
    error: null,
    loading: true
}

// Create Context

export const GlobalContext = createContext(initialState);

//Provider Component

export const GlobalProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    //Actions ----> Make calls to reducer

    async function getTransactions() {
        try {
            const res = await axios.get("/api/v1/transactions");
            dispatch({
                type: "GET_TRANSACTION",
                payload: res.data.data
            });
        }
        catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload:  error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            const res =  await axios.delete(`/api/v1/transactions/${id}`)
            console.log(res.data);
            dispatch({
                type: "DELETE_TRANSACTION",
                payload: id
            });            
        } 
        catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload:  error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            header : {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post("/api/v1/transactions", transaction, config)
            dispatch({
                type: "ADD_TRANSACTIONS",
                payload: res.data.data 
            });
        } 
        catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload:  error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }

    return (
        <GlobalContext.Provider value={
            { 
                transactions: state.transactions,
                error: state.error, 
                loading: state.loading, 
                getTransactions, 
                deleteTransaction, 
                addTransaction
                }
            }>
            {children}
            </GlobalContext.Provider>
    )
}