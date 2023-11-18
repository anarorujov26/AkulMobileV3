import { createContext, useState } from "react";

export const MovesGlobalContext = createContext();

export const MovesGlobalProvider = (props) => {

    const [moveListRender, setMoveListRender] = useState(0);
    const [move,setMove]=useState(null);
    const [saveButton,setSaveButton]=useState(false);

    return (
        <MovesGlobalContext.Provider value={
            {
                moveListRender,
                setMoveListRender,
                move,
                setMove,
                saveButton,
                setSaveButton
            }
        }>
            {props.children}
        </MovesGlobalContext.Provider>
    );

}