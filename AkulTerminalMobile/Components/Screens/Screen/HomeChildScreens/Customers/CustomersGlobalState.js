import { createContext, useState } from "react";

export const CustomersGlobalContext = createContext();

export const CustomersGlobalProvider = (props) => {

  const [customersListRender, setCustomersListRender] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  return (
    <CustomersGlobalContext.Provider value={
      {
        customersListRender,
        setCustomersListRender,
        customer,
        setCustomer,
        saveButton,
        setSaveButton
      }
    }>
      {props.children}
    </CustomersGlobalContext.Provider>
  );

}