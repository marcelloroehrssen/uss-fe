import React, {createContext} from "react";

const CharacterCtx = createContext([])

export const CharacterProvider = ({children, values}) => {
    return (
        <CharacterCtx.Provider value={values}>
            {children}
        </CharacterCtx.Provider>
    )
}

export default CharacterCtx;