import { createContext, useState } from "react";

export const TransactionGlobalContext = createContext();

export const TransactionGlobalProvider = (props) => {

    const [transactionListRender,setTransactionListRender]=useState(0);

    return (
        <TransactionGlobalContext.Provider value={
            {
                transactionListRender,
                setTransactionListRender
            }
        }>
            {props.children}
        </TransactionGlobalContext.Provider>
    );

}