export const AppReducer = (state, action) => {
    switch(action.type){
        case "GET_TRANSACTION":
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case "DELETE_TRANSACTION": 
            return {
                ...state,
                loading: false,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case "ADD_TRANSACTIONS":
            return {
                ...state,
                loading: false,
                transactions: [...state.transactions, action.payload]
            }
        case "TRANSACTION_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
        default:
            return state;
    }
}