import Typography from "@material-ui/core/Typography";
import React from "react";
import {Divider, Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import StepTitle from "../../StepTitle";
import ButtonBox from "../../form/ButtonBox";
import {capitalMiniature} from "../../StringUtils";

const GameMode = ({mode, onModeChoose}) => (
    <>
        <StepTitle>Scegli la modalità di gioco</StepTitle>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={6}
        >
            <Grid item>
                <ButtonBox selected={mode === 1} onClick={() => onModeChoose(1)}>
                    <Typography
                        align={'center'}
                        variant={'h4'}>
                        {capitalMiniature("Softcore")}
                    </Typography>
                    <Typography
                        align={'center'}
                        component={"small"}>
                        <strong>Scelta consigliata</strong>
                    </Typography>
                    <Box m={2}>
                        <Divider/>
                    </Box>
                    <Typography
                        align={'center'}>
                        In questa modalità qualsiasi cambiamento o evento fondamentale per il personaggio, qualora
                        si presentasse, verrà presentato fuori gioco al giocatore, che potrà, a suo libero arbitrio,
                        accettarlo o rifiutarlo
                    </Typography>
                </ButtonBox>
            </Grid>
            <Grid item>
                <ButtonBox selected={mode === 2} onClick={() => onModeChoose(2)}>
                    <Typography
                        align={'center'}
                        variant={'h4'}>
                        {capitalMiniature("Hardcore")}
                    </Typography>
                    <Box m={2}>
                        <Divider/>
                    </Box>
                    <Typography
                        align={'center'}>
                        In questa modalità il giocatore non potrà scegliere il suo destino ma in compenso
                        prenderà un punto esperienza in più ad evento.
                    </Typography>
                </ButtonBox>
            </Grid>
        </Grid>
    </>
);

export default GameMode;
