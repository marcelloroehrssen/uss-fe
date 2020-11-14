import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {CardContent, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CenteredButton from "../form/CenteredButton";
import {useRouter} from "next/router";
import useSWR from "swr";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import {showImage} from "../downtime/ShowImage";
import ShowDot from "../layout/ShowDot";
import {Skeleton} from "@material-ui/lab";

const useStyle = makeStyles({
    cardLayout: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flex: 1,
        flexGrow: 1
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
})

const DisplayInventoryInfo = ({characterSheets, isValidating}) => {

    const {data: inventory} = useSWR('/api/inventory/get')
    const classes = useStyle();
    const router = useRouter();

    return (
        <Card className={classes.cardLayout}>
            <CardHeader disableTypography title={<Typography variant="subtitle1">Oggetti</Typography>}/>
            <CardContent>
                <Grid container spacing={3}>
                    {
                        !isValidating && inventory && inventory.length > 0 && inventory[0].entries.slice(0, 4).map((entry, i) => (
                            <Grid item key={entry.item.id + '_' + i} xs={3}>
                                <Card elevation={0}>
                                    <CardHeader disableTypography title={<Typography>{entry.item.name}
                                        <strong>x{entry.quantity ?? 0}</strong></Typography>}/>
                                    <CardMedia className={classes.media} image={showImage(entry.item)}
                                               title={entry.item.name}/>
                                    <CardContent>
                                        <Typography align="center">
                                            <ShowDot name="dots" max={3} value={entry.item.dots}/>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                    {
                        !isValidating && inventory && inventory.length === 0 && <>
                            <Grid item xs={12}>
                                <Typography align="center"><em>Non hai ancora oggetti</em></Typography>
                            </Grid>
                        </>
                    }
                    {
                        isValidating && !inventory && [1, 2, 3, 4].map(i => (
                            <Grid item key={i} xs={3}>
                                <Card elevation={0}>
                                    <CardHeader disableTypography title={<Skeleton animation="wave"/>}/>
                                    <CardContent>
                                        <Typography align="center" paragraph>
                                            <Skeleton animation="wave" variant={"rect"} style={{paddingTop: '56.25%'}}/>
                                        </Typography>
                                        <Typography align="center">
                                            <Skeleton style={{display: "inline-block"}} animation="wave"
                                                      variant="circle" width={24} height={24}/>
                                            <Skeleton style={{display: "inline-block"}} animation="wave"
                                                      variant="circle" width={24} height={24}/>
                                            <Skeleton style={{display: "inline-block"}} animation="wave"
                                                      variant="circle" width={24} height={24}/>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                    <Grid item>

                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                {!isValidating && inventory && inventory.length > 0 && <CenteredButton semiCondensed variant="contained" color="primary"
                                 onClick={() => router.push('/inventory')}>
                    Vedi tutto
                </CenteredButton>}
            </CardActions>
        </Card>
    );
}

export default DisplayInventoryInfo;
