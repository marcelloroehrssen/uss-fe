import StepTitle from "../../StepTitle";
import React, {useEffect, useState} from "react";
import {Box, Divider, Grid} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonBox from "../../form/ButtonBox";
import Theme from "../../Theme";
import {capitalMiniature} from "../../StringUtils";
import CenteredButton from "../../form/CenteredButton";

const maxAvailableBackgroundPoint = 10;

const getRandomDefect = defect => defect[Math.floor(Math.random() * defect.length)]

const getBackgroundPoint = selectedDefects => selectedDefects.reduce((tot, d2) => tot + d2.cost, 0);

const DefectChoose = ({defects, onValueChange, availableDefects}) => {

    const [isAddDisabled, setAddDisabled] = useState(false);

    useEffect(() => {
        setAddDisabled(
            getBackgroundPoint(availableDefects.filter(a => defects.list.indexOf(a.name) !== -1)) >= maxAvailableBackgroundPoint
                || defects.list.length === availableDefects.length
        );
    }, [defects])

    const handleRandomAdd = () => {
        onValueChange({
            mode: defects.mode,
            list: [
                ...defects.list,
                getRandomDefect(
                    availableDefects.filter(d => defects.list.indexOf(d.name) === -1)
                ).name
            ]
        })
    }

    const handleAdd = e => {
        if (defects.list.indexOf(e.target.name) !== -1) {
            defects.list.splice(defects.list.indexOf(e.target.name), 1)
        } else {
            defects.list.push(e.target.name);
        }
        onValueChange({
            mode: defects.mode,
            list: [...defects.list]
        })
    }

    return (<>
        <StepTitle>Scelta dei difetti</StepTitle>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={3}
            mb={3}
        >
            <Grid item xs={6}>
                <ButtonBox selected={defects.mode === 2} disabled={defects.mode === 1} onClick={() => onValueChange({...defects, mode:2})}>
                    <Typography align={'center'} variant={'h4'}>
                        {capitalMiniature("Modalità Non Casuale")}
                    </Typography>
                    <Typography align={'center'} variant={'h4'} style={{fontSize: Theme.typography.pxToRem(14)}}>
                        <small style={{fontSize:20,margin:0}}><strong>Scelta consigliata</strong></small>
                    </Typography>
                    <Box m={2}>
                        <Divider />
                    </Box>
                    <Typography
                        style={{fontSize: Theme.typography.pxToRem(14)}}
                        align={'center'}>
                        In questa modalità potrai scegliere liberamente i difetti da assegnare al tuo personaggio. Nessun PG può avere un totale di difetti la cui somma superi 10 punti Background
                    </Typography>
                </ButtonBox>
            </Grid>
            <Grid item xs={6}>
                <ButtonBox selected={defects.mode === 1} disabled={defects.mode === 2} onClick={() => onValueChange({...defects, mode:1})}>
                    <Typography align={'center'} variant={'h4'}>
                        {capitalMiniature("Modalità Casuale")}
                    </Typography>
                    <Typography align={'center'} variant={'h4'} style={{fontSize: Theme.typography.pxToRem(14)}}>
                        <small style={{fontSize:20,margin:0}}>&nbsp;</small>
                    </Typography>
                    <Box m={2}>
                        <Divider />
                    </Box>
                    <Typography
                        style={{fontSize: Theme.typography.pxToRem(14)}}
                        align={'center'}>
                        In questa modalità il tuo PG prenderebbe 1 punto esperienza aggiuntivo ad ogni evento. Una volta raggiunta la soglia dei 10 punti background potrai tirare  una volta aggiuntiva
                    </Typography>
                </ButtonBox>
            </Grid>
            {
                defects.mode === 1 && <Grid item xs={12}>
                    <List component={Box}>
                        {
                            defects.list
                                .map(s => availableDefects.find(a => a.name === s))
                                .map((d, i) => (
                                <ListItem key={d.name} alignItems="flex-start"
                                          divider={(i + 1) !== defects.list.length}>
                                    <ListItemText
                                        primary={<>
                                            {d.name}
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="textSecondary"
                                                style={{paddingLeft: 20}}
                                            >
                                                {'bonus: ' + d.cost + ' punti background'}
                                            </Typography>
                                        </>}
                                        secondary={
                                            <>{d.description}</>
                                        }
                                        secondaryTypographyProps={{
                                            variant: 'body1',
                                            style: {marginTop: 8}
                                        }}
                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                    <Grid item>
                        <Box align={'center'}>
                            <Typography component={"h4"} variant={"caption"}>
                                {!isAddDisabled && 'Per ora hai ' + getBackgroundPoint(availableDefects.filter(a => defects.list.indexOf(a.name) !== -1)) + ' punti background'}
                                {isAddDisabled && 'Hai ' + getBackgroundPoint(availableDefects.filter(a => defects.list.indexOf(a.name) !== -1)) + ' punti background'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <CenteredButton
                            variant="contained"
                            color="primary"
                            disabled={
                                getBackgroundPoint(availableDefects.filter(a => defects.list.indexOf(a.name) !== -1)) >= maxAvailableBackgroundPoint
                                || defects.list.length === availableDefects.length
                            }
                            onClick={handleRandomAdd}>
                                {defects.list.length === 0 && !isAddDisabled && 'Devi aggiungere almeno un difetto'}
                                {defects.list.length !== 0 && !isAddDisabled && 'Aggiungi un Difetto'}
                                {isAddDisabled && 'Non puoi aggiungere altri difetti'}
                        </CenteredButton>
                    </Grid>
                </Grid>
            }
            {
                defects.mode === 2 && <>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" disabled={true}>
                            <FormLabel component="legend">Seleziona i difetti</FormLabel>
                            <FormGroup>
                                {
                                    availableDefects.map((d) => (
                                        <FormControlLabel
                                            key={d.name}
                                            style={{marginTop: 10, marginBottom: 10}}
                                            control={<Checkbox
                                                disabled={
                                                    !(defects.list.indexOf(d.name) !== -1)
                                                    && getBackgroundPoint([...availableDefects.filter(a => defects.list.indexOf(a.name) !== -1), d]) > maxAvailableBackgroundPoint
                                                }
                                                checked={defects.list.indexOf(d.name) !== -1}
                                                onChange={handleAdd}
                                                name={d.name}
                                            />}
                                            label={
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        color="textPrimary"
                                                        style={{paddingLeft: 20}}
                                                    >
                                                        {d.name}
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        color="textSecondary"
                                                        style={{paddingLeft: 20}}
                                                    >
                                                        {'bonus: ' + d.cost + ' punti background'}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        color="textPrimary"
                                                        style={{paddingLeft: 20}}
                                                    >
                                                        {d.description}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </>
            }
        </Grid>
    </>);
}

export default DefectChoose;
