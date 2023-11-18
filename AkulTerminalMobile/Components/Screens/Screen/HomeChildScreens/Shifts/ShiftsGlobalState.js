import { createContext, useState } from "react";

export const ShiftsGlobalContext = createContext();

export const ShiftsGlobalProvider = (props) => {

    const [shiftListRender,setShiftListRender]=useState(0);

    return (
        <ShiftsGlobalContext.Provider value={
            {
                shiftListRender,
                setShiftListRender
            }
        }>
            {props.children}
        </ShiftsGlobalContext.Provider>
    );

}