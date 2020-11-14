import useSWR from "swr";
import AppContainer from "../src/layout/AppContainer";
import StepTitle from "../src/layout/StepTitle";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {CardContent, Typography} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import {showImage} from "../src/downtime/ShowImage";
import ShowDot from "../src/layout/ShowDot";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const Inventory = () => {

    const classes = useStyles();
    const {data: inventory} = useSWR('/api/inventory/get')

    return (
        <AppContainer>
            <StepTitle>
                Inventario
            </StepTitle>
            <Grid container spacing={3}>
                {
                    inventory && inventory.length > 0 && inventory[0].entries.map((entry, i) => (
                        <Grid item key={entry.item.id + '_' + i} xs={3}>
                            <Card elevation={0}>
                                <CardHeader disableTypography
                                            title={<Typography>{entry.item.name} <strong>x{entry.quantity ?? 0}</strong></Typography>}/>
                                <CardMedia className={classes.media} image={showImage(entry.item)}
                                           title={entry.item.name}/>
                                <CardContent>
                                    <CardContent>
                                        <Typography align="center">
                                            <ShowDot name="dots" max={3} value={entry.item.dots}/>
                                        </Typography>
                                        <Typography variant={"body1"}
                                                    dangerouslySetInnerHTML={{__html: entry.item.description}}/>
                                        <Typography variant={"body1"}><strong>Punti oggetto</strong>: {entry.item.value}
                                        </Typography>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
                {
                    !inventory || inventory.length === 0 && <>
                        <Grid item xs={12}>
                            <Typography align="center">Non hai un inventario</Typography>
                        </Grid>
                    </>
                }
            </Grid>
        </AppContainer>
    );
}

export default Inventory;
