import StepTitle from "../../StepTitle";
import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppTooltip from "../../tooltip/AppTooltip";
import Rating from "@material-ui/lab/Rating";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import {capitalMiniature} from "../../StringUtils";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CenteredButton from "../../form/CenteredButton";

const getMaxAttribute = (attribute, characterSheet) => {
    return 3;
}

const SkillChoose = ({characterSheet, dispatch, onDiscaredSkill, onValueChange, availableSkills}) => {

    const [state, setState] = useState({})
    const [deletedSkill, setDeletedSkill] = useState(characterSheet.factionSkills)

    useEffect(() => {
        if (getRemainingPoint() === 0) {
            onValueChange({...state})
        }
    }, [state])

    useEffect(() => {
        onDiscaredSkill(deletedSkill);
        delete state[deletedSkill];
        setState({...state})
    }, [deletedSkill])

    const getRemainingPoint = () => {
        return (characterSheet.base.skills.mental * 2)+ 1 - Object.values(state).reduce((t, v) => t + v, 0);
    }

    const chooseSkill = (skill) => (e, v) => {
        setState({...state, [skill]: v || 0});
    }

    return <>
        <StepTitle>Scegli le tua abilità</StepTitle>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12}>
                <Box align="center">
                    <Typography variant="caption" align="center">
                        Puoi scegliere di scartare una abilità derivante dal mestiere in favore di quella derivante dalla fazione
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box align="center">
                    <Typography variant="caption" align="center">
                        {getRemainingPoint() > 0 && `Hai a disposizione ${getRemainingPoint()} punti abilità`}
                        {getRemainingPoint() < 0 && `Hai a speso ${Math.abs(getRemainingPoint())} punti abilità di troppo`}
                        {getRemainingPoint() === 0 && `Hai speso tutti i tuoi punti abilità`}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">
                    {capitalMiniature('Abilità di fazione:')}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Box align="right">
                    {!deletedSkill.includes(characterSheet.factionSkills) && <Button variant="outlined" color="primary" onClick={() => setDeletedSkill(characterSheet.factionSkills)}>Scarta</Button>}
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="caption" style={{textDecoration:deletedSkill.includes(characterSheet.factionSkills) ? 'line-through' : 'none'}}>{characterSheet.factionSkills}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Box align="right">
                <AppTooltip availableData={availableSkills} data={characterSheet.factionSkills} placement="right">
                    <Rating
                        disabled={deletedSkill.includes(characterSheet.factionSkills)}
                        name={characterSheet.factionSkills.toLowerCase()}
                        value={state[characterSheet.factionSkills] || 0}
                        onChange={chooseSkill(characterSheet.factionSkills)}
                        max={getMaxAttribute(characterSheet.factionSkills, characterSheet)}
                        icon={<Brightness1Icon/>}
                    />
                </AppTooltip>
                </Box>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">
                    {capitalMiniature('Abilità di mestiere:')}
                </Typography>
            </Grid>
            {
                characterSheet.jobSkills.map(jobSkill => (<React.Fragment key={jobSkill}>
                    <Grid item xs={3}>
                        <Box align="right">
                            {!deletedSkill.includes(jobSkill) && <Button variant="outlined" color="primary" onClick={() => setDeletedSkill(jobSkill)}>Scarta</Button>}
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption" style={{textDecoration:deletedSkill.includes(jobSkill) ? 'line-through' : 'none'}}>{jobSkill}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Box align="right">
                            <AppTooltip availableData={availableSkills} data={jobSkill} placement="right">
                                <Rating
                                    disabled={deletedSkill.includes(jobSkill)}
                                    name={jobSkill}
                                    value={state[jobSkill] || 0}
                                    onChange={chooseSkill(jobSkill)}
                                    max={getMaxAttribute(jobSkill, characterSheet)}
                                    icon={<Brightness1Icon/>}
                                />
                            </AppTooltip>
                        </Box>
                    </Grid>
                    <Grid item xs={3}/>
                </React.Fragment>))
            }
            <Grid item xs={12}>
                <CenteredButton
                    disabled={getRemainingPoint() > 0}
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch('next')}>
                    Ho scelto
                </CenteredButton>
            </Grid>
        </Grid>
    </>;
}

export default SkillChoose;

