import { createContext, useState } from "react";

export const ProductionsGlobalContext = createContext();

export const ProductionsGlobalProvider = (props) => {

    const [production, setProduction] = useState(null);
    const [saveButton, setSaveButton] = useState(false);
    const [productionListRender, setProductionListRender] = useState(0);
    const [compositions, setCompositions] = useState([]);
    const [comEdit, setComEdit] = useState(true);
    const [comClose, setComClose] = useState(false);

    return (
        <ProductionsGlobalContext.Provider value={
            {
                production,
                setProduction,
                saveButton,
                setSaveButton,
                productionListRender,
                setProductionListRender,
                compositions,
                setCompositions,
                comEdit,
                setComEdit,
                comClose,
                setComClose,
            }
        }>
            {props.children}
        </ProductionsGlobalContext.Provider>
    );

}