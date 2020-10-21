import React from "react";

export const ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const capitalMiniature = (string) => <><span style={{fontFamily:'victorian'}}>{string.charAt(0)}</span><span style={{fontFamily:'gothique'}}>{string.slice(1)}</span></>