import AppContainer from "../src/layout/AppContainer";
import React from "react";
import {Box, Grid} from "@material-ui/core";
import LogoImage from "../src/layout/LogoImage";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "next/link";
import Theme from "../src/Theme";

const menu = [
    {
        href: '/character/create',
        title: 'Creazione personaggio',
    }, {
        href: '/character/send_message',
        title: 'Invia messaggio',
    }, {
        href: '/character/inventory',
        title: 'Vedi inventario',
    }, {
        href: '/character/downtime',
        title: 'Crea azioni',
    }
]

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    // },
    // icon: {
    //     color: 'rgba(255, 255, 255, 0.54)',
    // },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <AppContainer>
            <Grid container direction={"column"} spacing={3}>
                <Grid item>
                    <Box align="center">
                        <LogoImage width="30%"/>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="space-evenly" style={{marginTop:Theme.spacing(8)}}>
                {
                    menu.map(item => (
                        <Grid item key={item.href}>
                            <Link href={item.href}>
                                <a>{item.title}</a>
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>
        </AppContainer>
    )
}

export default Home
