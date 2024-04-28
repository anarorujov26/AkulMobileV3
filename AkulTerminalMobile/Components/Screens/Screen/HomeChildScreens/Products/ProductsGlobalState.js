import { useState } from "react";
import { createContext } from "react";

export const ProductsGlobalContext = createContext();

export const ProductsGlobalProvider = (props) => {

  const [rendersFromProducts, setRendersFromProducts] = useState(0)
  const [productGlobal, setProductGlobal] = useState();

  return (
    <ProductsGlobalContext.Provider value={
      {
        rendersFromProducts,
        setRendersFromProducts,
        productGlobal,
        setProductGlobal
      }
    }>
      {props.children}
    </ProductsGlobalContext.Provider>
  );

}