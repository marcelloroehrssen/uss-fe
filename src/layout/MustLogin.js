import {Box, Grid, Typography} from "@material-ui/core";
import LogoImage from "./LogoImage";
import AppContainer from "./AppContainer";
import React from "react";

const MustLogin = () => (
    <AppContainer>
        <Grid container direction={"row"} spacing={3}>
            <Grid item xs={12}>
                <Box align="center">
                    <LogoImage width="30%"/>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography>Devi effettuare il login</Typography>
            </Grid>
        </Grid>
    </AppContainer>
)

export default MustLogin;
