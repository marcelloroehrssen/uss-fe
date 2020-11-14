import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Theme from "../Theme";
import {ButtonGroup, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import CenteredButton from "../form/CenteredButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useRouter} from "next/router";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/core/styles";

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

const DisplayBaseInfo = ({title, isValidating, characterSheets, onShow}) => {

    const [characterSheet, setCharacterSheet] = useState(null)
    const [otherCharacterSheets, setOtherCharacterSheets] = useState(null)
    const [showInactive, setShowInactive] = useState(false)
    const router = useRouter()
    const classes = useStyle();

    useEffect(() => {
        if ((characterSheets ?? []).length !== 0) {
            setCharacterSheet(characterSheets.find(c => c.enabled));
            setOtherCharacterSheets(characterSheets.filter(c => !c.enabled));
        }
    }, [isValidating, characterSheets])

    return (<>
        <Card className={classes.cardLayout}>
            <CardHeader disableTypography title={<Typography variant="subtitle1">{title}</Typography>}/>
            <CardContent className={classes.cardContent}>
                {(isValidating && !characterSheet) && <>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                </>}
                {(!isValidating && characterSheet) && <>
                    <Typography>
                        <strong>nome</strong>: {characterSheet.name}
                    </Typography>
                    <Typography>
                        <strong>mestiere</strong>: {characterSheet.job}
                    </Typography>
                    <Typography>
                        <strong>fede</strong>: {characterSheet.faith}
                    </Typography>
                    <Typography>
                        <strong>fazione</strong>: {characterSheet.faction}
                    </Typography>
                </>}
                {
                    !isValidating && !characterSheet && <>
                        <Typography align="center"><em>Non hai nessun personaggio</em></Typography>
                    </>
                }
                <Typography component={Box} align="center" mt={1}>
                    <ButtonGroup>
                        {!isValidating && characterSheet && <Button variant="outlined" onClick={() => setShowInactive(true)}>Vedi inattivi</Button>}
                        {!isValidating && characterSheet && <Button variant="outlined" onClick={() => router.push('/character/create')}>Creane uno</Button>}
                    </ButtonGroup>
                </Typography>
            </CardContent>
            <CardActions>
                {!isValidating && !characterSheet &&
                    <CenteredButton semiCondensed variant="contained" color="primary" onClick={() => router.push('/character/create')}>
                        Crea
                    </CenteredButton>
                }
                {!isValidating && characterSheet &&
                    <CenteredButton semiCondensed variant="contained" color="primary" onClick={onShow(characterSheet)}>
                        Vedi
                    </CenteredButton>
                }
            </CardActions>
        </Card>
        <Dialog open={showInactive} onClose={() => setShowInactive(false)} aria-labelledby="form-dialog-title">
            <DialogTitle disableTypography={true}>
                <Typography variant="subtitle1">Personaggi Inattivi</Typography>
            </DialogTitle>
            <DialogContent>
                <Grid item style={{flexGrow: 1}}>
                    {otherCharacterSheets && otherCharacterSheets.map((c, i) => <div key={i}>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item style={{flexGrow: 1}}>
                                <Typography paragraph={true}><strong>{c.name}</strong></Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="secondary" onClick={onShow(c)}>Vedi</Button>
                            </Grid>
                        </Grid>
                    </div>)}
                    {otherCharacterSheets && otherCharacterSheets.length === 0 && <Typography paragraph={true} align="center"><em>Non hai personaggi inattivi</em></Typography>}
                    {!otherCharacterSheets && <Typography paragraph={true} align="center"><em>Non hai personaggi inattivi</em></Typography>}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => setShowInactive(false)}>Chiudi</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default DisplayBaseInfo;
