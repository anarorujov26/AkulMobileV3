import { createContext, useState } from "react";

export const SalesGlobalContext = createContext();

export const SalesGlobalProvider = (props) => {

    const [sale,setSale]=useState(null);

    return (
        <SalesGlobalContext.Provider value={
            {
                sale,
                setSale,
            }
        }>
            {props.children}
        </SalesGlobalContext.Provider>
    );

}