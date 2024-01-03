import { createContext, useState } from "react";

export const SupplysGlobalContext = createContext();

export const SupplysGlobalProvider = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [supply,setSupply]=useState(null);
    const [supplyListRender,setSupplyListRender]=useState(0);
    const [debtQuantity,setDebtQuantity]=useState('');

    return (
        <SupplysGlobalContext.Provider value={
            {
                saveButton,
                setSaveButton,
                supply,
                setSupply,
                supplyListRender,
                setSupplyListRender,
                debtQuantity,
                setDebtQuantity
            }
        }>
            {props.children}
        </SupplysGlobalContext.Provider>
    );

}