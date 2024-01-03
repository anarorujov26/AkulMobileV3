import { createContext, useState } from "react";

export const CustomerOrdersGlobalContext = createContext();

export const CustomerOrdersGlobalProvider = (props) => {

  const [customerOrdersListRender, setCustomerOrdersListRender] = useState(0);
  const [customerOrder, setCustomerOrder] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  const [debtQuantity, setDebtQuantity] = useState('');


  return (
    <CustomerOrdersGlobalContext.Provider value={
      {
        customerOrdersListRender,
        setCustomerOrdersListRender,
        customerOrder,
        setCustomerOrder,
        saveButton,
        setSaveButton,
        debtQuantity,
        setDebtQuantity
      }
    }>
      {props.children}
    </CustomerOrdersGlobalContext.Provider>
  );

}