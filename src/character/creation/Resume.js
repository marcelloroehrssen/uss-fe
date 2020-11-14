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
import ShowDot from "../../layout/ShowDot";
import {showImage} from "../../downtime/ShowImage";

const useStyle = makeStyles((theme) => ({
    paper: {
        height: '100%'
    }
}))

const Resume = ({characterSheet}) => {

    const [availableDefects, availableAttributes, availableSkills, availableBackgrounds, availableItems] = useLookup(
        ['availableDefects', 'availableAttributes', 'availableSkills', 'availableBackgrounds', 'availableItems']
    )

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
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Attributi</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <><strong>forza</strong></>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <AppTooltip availableData={availableAttributes} data="Fisiche" placement="right">
                                    <Typography>
                                        <ShowDot name="physical" value={characterSheet.attributes.physical}/>
                                    </Typography>
                                </AppTooltip>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <><strong>mentali</strong></>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <AppTooltip availableData={availableAttributes} data="Mentali" placement="right">
                                    <Typography>
                                        <ShowDot name="mental" value={characterSheet.attributes.mental}/>
                                    </Typography>
                                </AppTooltip>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    <><strong>sociali</strong></>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <AppTooltip availableData={availableAttributes} data="Sociali" placement="right">
                                    <Typography>
                                        <ShowDot name="mental" value={characterSheet.attributes.social}/>
                                    </Typography>
                                </AppTooltip>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                        <Typography variant="subtitle1">Difetti</Typography>
                        <Typography>
                            <strong>Modalità</strong>: {characterSheet.defectMode === 1 ? 'casuale' : 'non casuale'}
                        </Typography>
                        {
                            characterSheet.defects.map(d => (
                                <Typography key={d}>
                                    <strong>{d.toLowerCase()}</strong> {availableDefects.find(def => def.name === d).description.toLowerCase()}
                                </Typography>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Abilità</Typography>
                            </Grid>
                            {
                                Object.keys(characterSheet.skills).map((js, i) => (<React.Fragment key={i}>
                                    <Grid item xs={6}>
                                        <strong>{js.toLowerCase()}</strong>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AppTooltip data={js} availableData={availableSkills}>
                                            <Typography>
                                                <ShowDot name="skill" value={characterSheet.skills[js]}/>
                                            </Typography>
                                        </AppTooltip>
                                    </Grid>
                                </React.Fragment>))
                            }
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Background</Typography>
                            </Grid>
                            {
                                Object.keys(characterSheet.backgrounds).map((bg, i) => (<React.Fragment key={i}>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <>
                                                <strong>{ucfirst(bg.replace(/_[0-9]+$/, ''))}</strong>: {}
                                            </>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AppTooltip data={bg.replace(/_[0-9]+$/, '')}
                                                    availableData={availableBackgrounds}>
                                            <Typography>
                                                <ShowDot max={3} name="background"
                                                         value={characterSheet.backgrounds[bg]}/>
                                            </Typography>
                                        </AppTooltip>
                                    </Grid>
                                </React.Fragment>))
                            }
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} elevation={4} p={Theme.spacing(1)} className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Oggetti</Typography>
                            </Grid>
                            {
                                Object.keys(characterSheet.items).map((item) => (<React.Fragment key={item}>
                                    <Grid item xs={2}>
                                        <img width="100" src={showImage(availableItems.find(it => it.id === item*1))}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <><strong>{ucfirst(availableItems.find(it => it.id === item*1).name)}</strong></>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography dangerouslySetInnerHTML={{__html: availableItems.find(it => it.id === item*1).description}} />
                                    </Grid>
                                </React.Fragment>))
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Resume;
