import React, {createContext} from "react";

const LookupCtx = createContext([])

export const LookupProvider = ({children, values}) => {
    return (
        <LookupCtx.Provider value={values}>
            {children}
        </LookupCtx.Provider>
    )
}

export default LookupCtx;