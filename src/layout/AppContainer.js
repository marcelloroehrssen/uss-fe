import Box from "@material-ui/core/Box";
import Theme from "../Theme";
import Paper from "@material-ui/core/Paper";
import React from "react";

const AppContainer = ({children}) => (<Paper elevation={24} component={Box} mt={Theme.spacing(1)} p={Theme.spacing(1)}>
    {children}
</Paper>)

export default AppContainer;
