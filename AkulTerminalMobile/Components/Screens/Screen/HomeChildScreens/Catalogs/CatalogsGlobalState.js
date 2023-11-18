import { createContext, useState } from "react";

export const CatalogsGlobalContext = createContext();

export const CatalogsGlobalProvider = (props) => {

  const [saveButton, setSaveButton] = useState(false);
  const [catalog, setCatalog] = useState(null);
  const [catalogListRender, setCatalogListRender] = useState(0);

  return (
    <CatalogsGlobalContext.Provider value={
      {
        saveButton,
        setSaveButton,
        catalog,
        setCatalog,
        catalogListRender,
        setCatalogListRender
      }
    }>
      {props.children}
    </CatalogsGlobalContext.Provider>
  );

}