import { createContext, useState } from "react";

export const OrdersGlobalContext = createContext();

export const OrdersGlobalProvider = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [order, setOrder] = useState(null);
    const [ordersListRender, setOrdersListRender] = useState(0);

    return (
        <OrdersGlobalContext.Provider value={
            {
                saveButton,
                setSaveButton,
                order,
                setOrder,
                ordersListRender,
                setOrdersListRender
            }
        }>
            {props.children}
        </OrdersGlobalContext.Provider>
    );

}