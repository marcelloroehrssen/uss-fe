import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {Box, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import React from "react";
import {describe} from "./describe";
import CenteredButton from "../form/CenteredButton";
import {makeStyles} from "@material-ui/core/styles";
import Link from "next/link";
import {Skeleton} from "@material-ui/lab";
import {useRouter} from "next/router";

const useStyle = makeStyles({
    cardLayout: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flex: 1,
        flexGrow: 1
    }
})

const DisplayDowntimeInfo = ({characterSheets, downtimes, isValidating, maxDowntime}) => {

    const classes = useStyle();
    const router = useRouter();

    return (
        <Card className={classes.cardLayout}>
            <CardHeader disableTypography title={<Typography variant="subtitle1">Azioni in narrativa</Typography>}/>
            <CardContent className={classes.cardContent}>
                <Grid container>
                    {
                        !isValidating && <>
                            {
                                downtimes && downtimes.length > 0 && downtimes.slice(0, maxDowntime).map((d) => (
                                    <React.Fragment key={d.name}>
                                        <Grid item xs={2}>
                                            <Typography component="span"><strong>{d.name}</strong></Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography
                                                component="span">{describe(d, 75)}</Typography>
                                        </Grid>
                                    </React.Fragment>))
                            }
                            {
                                ((downtimes && downtimes.length === 0) || !downtimes) && <>
                                    <Grid item xs={12}>
                                        <Typography align="center"><em>Non hai ancora effettuato azioni</em></Typography>
                                    </Grid>
                                </>
                            }
                        </>
                    }
                    {
                        isValidating && [...Array(maxDowntime).keys()].map((i) => <Grid key={i} item xs={12}>
                            <Skeleton animation="wave" width="100%"/>
                        </Grid>)
                    }
                    {
                        (downtimes && ((downtimes.length - maxDowntime) > 0)) && <Grid item xs={12}>
                            <Typography align="center" component={Box} mt={4}>
                                <Link href="/downtime">
                                    <a>
                                        {downtimes.length !== 1 ? "Vedi altri " + (downtimes.length - maxDowntime) : "Vedi un altro"}
                                    </a>
                                </Link>
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </CardContent>
            <CardActions>
                {characterSheets.find(c => c.enabled) && <CenteredButton semiCondensed variant="contained" color="primary"
                                 onClick={() => router.push('/downtime')}>
                    Vedi tutti
                </CenteredButton>}
            </CardActions>
        </Card>
    );
}

export default DisplayDowntimeInfo;
