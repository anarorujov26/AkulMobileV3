import { createContext, useState } from "react";

export const ProductionOrdersGlobalContext = createContext();

export const ProductionOrdersGlobalProvider = (props) => {

    const [production, setProduction] = useState(null);
    const [saveButton, setSaveButton] = useState(false);
    const [productionListRender, setProductionListRender] = useState(0);
    const [compositions, setCompositions] = useState([]);
    const [comEdit, setComEdit] = useState(true);
    const [comClose, setComClose] = useState(false);
    const [po_id,set_po_id]=useState(null);

    return (
        <ProductionOrdersGlobalContext.Provider value={
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
                po_id,
                set_po_id
            }
        }>
            {props.children}
        </ProductionOrdersGlobalContext.Provider>
    );

}