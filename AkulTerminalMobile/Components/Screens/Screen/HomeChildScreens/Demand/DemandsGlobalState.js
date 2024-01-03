import { createContext, useState } from "react";

export const DemandsGlobalContext = createContext();

export const DemandsGlobalProvider = (props) => {

    const [demandListRender, setDemandListRender] = useState(0);
    const [demand,setDemand]=useState(null);
    const [saveButton,setSaveButton]=useState(false);
    const [debtQuantity,setDebtQuantity]=useState('');


    return (
        <DemandsGlobalContext.Provider value={
            {
                demandListRender,
                setDemandListRender,
                demand,
                setDemand,
                saveButton,
                setSaveButton,
                debtQuantity,
                setDebtQuantity
            }
        }>
            {props.children}
        </DemandsGlobalContext.Provider>
    );

}