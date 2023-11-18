import { useState } from "react";
import { createContext } from "react";

export const ProductsGlobalContext = createContext();

export const ProductsGlobalProvider = (props) => {

  const [rendersFromProducts, setRendersFromProducts] = useState(0)

  return (
    <ProductsGlobalContext.Provider value={
      {
        rendersFromProducts,
        setRendersFromProducts
      }
    }>
      {props.children}
    </ProductsGlobalContext.Provider>
  );

}