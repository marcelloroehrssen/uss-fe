import {useContext} from "react";
import LookupCtx from "../context/LookupProvider";

export const useLookup = (deps) => {

    const lookup = useContext(LookupCtx)

    return deps.map(d => lookup[d]);
}
