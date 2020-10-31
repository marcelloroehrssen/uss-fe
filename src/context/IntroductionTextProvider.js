import React, {createContext} from "react";

const IntroductionTextCtx = createContext([])

export const IntroductionTextProvider = ({children, values}) => {
    return (
        <IntroductionTextCtx.Provider value={values}>
            {children}
        </IntroductionTextCtx.Provider>
    )
}

export default IntroductionTextCtx;