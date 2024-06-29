import { createContext } from "react";

export const TransferGlobalContext = createContext();

export const TransferGlobalProvider = (props) => {

    return (
        <TransferGlobalContext.Provider value={
            {
            }
        }>
            {props.children}
        </TransferGlobalContext.Provider>
    );

}