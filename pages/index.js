import AppContainer from "../src/layout/AppContainer";
import React, {useState} from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import LogoImage from "../src/layout/LogoImage";
import DisplayBaseInfo from "../src/character/DisplayBaseInfo";
import {useCharacter} from "../src/hook/UseCharacter";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DisplayCharacterSheet from "../src/character/DisplayCharacterSheet";
import {Skeleton} from "@material-ui/lab";
import useSWR from "swr";
import DisplayDowntimeInfo from "../src/downtime/DisplayDowntimeInfo";
import DisplayInventoryInfo from "../src/inventory/DisplayInventoryInfo";

const Home = () => {

    const [characterSheet, isValidating] = useCharacter({isNew: false});
    const [showCharacterSheet, setShowCharacterSheet] = useState(false)
    const [currentCharacterSheet, setCurrentCharacterSheet] = useState(null)

    const {data: downtimes} = useSWR('/api/downtime/get')

    const onShow = (characterSheet) => () => {
        setCurrentCharacterSheet(characterSheet);
        setShowCharacterSheet(true)
    }

    const onHide = () => {
        setCurrentCharacterSheet(null);
        setShowCharacterSheet(false)
    }
    return (
        <>
            <AppContainer>
                <Grid container direction={"row"} spacing={3}>
                    <Grid item xs={12}>
                        <Box align="center">
                            <LogoImage width="30%"/>
                        </Box>
                    </Grid>
                    {
                        characterSheet && <>
                            <Grid item xs={12} md={4}>
                                <DisplayBaseInfo title="Personaggio"
                                                 isValidating={isValidating}
                                                 characterSheets={characterSheet}
                                                 onShow={onShow}/>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <DisplayDowntimeInfo characterSheets={characterSheet}
                                                     downtimes={downtimes}
                                                     isValidating={isValidating}
                                                     maxDowntime={5}/>
                            </Grid>
                            <Grid item xs={12}>
                                <DisplayInventoryInfo isValidating={isValidating}
                                                      characterSheets={characterSheet}/>
                            </Grid>
                        </>
                    }
                    {
                        characterSheet && Object.keys(characterSheet).length === 0 && <Grid item xs={12}>
                            <Typography>Devi effettuare il login</Typography>
                        </Grid>
                    }
                    {
                        !characterSheet && <>
                            <Grid item xs={12} md={6}>
                                <Skeleton height={540} animation="wave"/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Skeleton height={540} animation="wave"/>
                            </Grid>
                        </>
                    }
                </Grid>
                <Dialog
                    open={showCharacterSheet}
                    onClose={onHide}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {currentCharacterSheet !== null && <>
                        <DialogTitle id="alert-dialog-title" disableTypography>
                            <Typography variant={"subtitle1"}>
                                Scheda di {currentCharacterSheet.name}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" component="div">
                                <DisplayCharacterSheet currentCharacterSheet={currentCharacterSheet}/>
                            </DialogContentText>
                        </DialogContent>
                    </>}
                    <DialogActions>
                        <Button onClick={onHide} color="primary" autoFocus>
                            Chiudi
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppContainer>
        </>
    )
}

export default Home
