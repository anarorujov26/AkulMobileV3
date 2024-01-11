import { createContext, useState } from "react";

export const EmployeesGlobalContext = createContext();

export const EmployeesGlobalProvider = (props) => {

  const [empsListRender, setEmpsListRender] = useState(0);
  const [emp, setEmp] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  return (
    <EmployeesGlobalContext.Provider value={
      {
        empsListRender,
        setEmpsListRender,
        emp,
        setEmp,
        saveButton,
        setSaveButton
      }
    }>
      {props.children}
    </EmployeesGlobalContext.Provider>
  );

}