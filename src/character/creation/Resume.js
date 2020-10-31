import StepTitle from "../../layout/StepTitle";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {useLookup} from "../../hook/UseLookup";
import {Typography} from "@material-ui/core";
import AppTooltip from "../../tooltip/AppTooltip";
import {ucfirst} from "../../StringUtils";
import Paper from "@material-ui/core/Paper";
import Theme from "../../Theme";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    paper: {
        height:'100%'
    }
}))

const Resume = ({characterSheet}) => {

    const [availableDefects, availableAttributes, availableSkills, availableBackgrounds] = useLookup(['availableDefects', 'availableAttributes', 'availableSkills', 'availableBackgrounds'])

    const classes = useStyle();

    return (<>
        <StepTitle>Riassunto scheda</StepTitle>
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={3}>
            <Grid item md={6} xs={12}>
                <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                    <Typography variant="subtitle1">Base</Typography>
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
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
                <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                    <Typography variant="subtitle1">Attributi</Typography>
                    <AppTooltip availableData={availableAttributes} data="Fisiche" placement="right">
                        <Typography>
                            <><strong>forza</strong>: {characterSheet.attributes.physical}</>
                        </Typography>
                    </AppTooltip>
                    <AppTooltip availableData={availableAttributes} data="Mentali" placement="right">
                        <Typography>
                            <><strong>mentali</strong>: {characterSheet.attributes.mental}</>
                        </Typography>
                    </AppTooltip>
                    <AppTooltip availableData={availableAttributes} data="Sociali" placement="right">
                        <Typography>
                            <><strong>sociali</strong>: {characterSheet.attributes.social}</>
                        </Typography>
                    </AppTooltip>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                    <Typography variant="subtitle1">Difetti</Typography>
                    <Typography>
                        <strong>Modalità</strong>: {characterSheet.defects.mode === 1 ? 'casuale' : 'non casuale'}
                    </Typography>
                    {
                        characterSheet.defects.list.map(d => (
                            <Typography key={d}>
                                <strong>{d.toLowerCase()}</strong> {availableDefects.find(def => def.name === d).description.toLowerCase()}
                            </Typography>
                        ))
                    }
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
                <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                    <Typography variant="subtitle1">Abilità</Typography>
                    {
                        Object.keys(characterSheet.skills).map((js, i) => (
                            <AppTooltip key={i} data={js} availableData={availableSkills}>
                                <Typography>
                                    <>
                                        <strong>{ucfirst(js)}</strong>: {characterSheet.skills[js]}
                                    </>
                                </Typography>
                            </AppTooltip>
                        ))
                    }
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
                <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                    <Typography variant="subtitle1">Background</Typography>
                    {
                        Object.keys(characterSheet.backgrounds).map((bg, i) => (
                            <AppTooltip key={i} data={bg} availableData={availableBackgrounds}>
                                <Typography>
                                    <>
                                        <strong>{ucfirst(bg.replace(/_[0-9]+$/, ''))}</strong>: {characterSheet.backgrounds[bg]}
                                    </>
                                </Typography>
                            </AppTooltip>
                        ))
                    }
                </Paper>
            </Grid>
        </Grid>
    </>);
}

export default Resume;
