import { createContext, useState } from "react";

export const EmployeesGlobalContext = createContext();

export const EmployeesGlobalProvider = (props) => {

  const [empsListRender, setEmpsListRender] = useState(0);
  const [employee, setEmployee] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  return (
    <EmployeesGlobalContext.Provider value={
      {
        empsListRender,
        setEmpsListRender,
        employee,
        setEmployee,
        saveButton,
        setSaveButton
      }
    }>
      {props.children}
    </EmployeesGlobalContext.Provider>
  );

}