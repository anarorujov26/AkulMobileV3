import { createContext, useState } from "react";

export const InventGlobalContext = createContext();

export const InventGlobalProvider = (props) => {

  const [invent, setInvent] = useState(null);
  const [saveButton, setSaveButton] = useState(null);
  const [inventListRender, setInventListRender] = useState(0);
  const [missing, setMissing] = useState(false);

  return (
    <InventGlobalContext.Provider value={
      {
        invent,
        setInvent,
        saveButton,
        setSaveButton,
        inventListRender,
        setInventListRender,
        missing,
        setMissing
      }
    }>
      {props.children}
    </InventGlobalContext.Provider>
  );

}