import StepTitle from "../../layout/StepTitle";
import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppTooltip from "../../tooltip/AppTooltip";
import Rating from "@material-ui/lab/Rating";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import {capitalMiniature} from "../../StringUtils";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IntroductionText from "../../IntroductionText";
import {useLookup} from "../../hook/UseLookup";

const getMaxAttribute = (attribute) => {
    return 3;
}

const SkillChoose = ({selectedSkills, jobSkills, factionSkills, discardedSkill, mental, onDiscaredSkill, onValueChange}) => {

    const [availableSkills] = useLookup(['availableSkills']);

    useEffect(() => {
        delete selectedSkills[discardedSkill];
        onValueChange({...selectedSkills})
    }, [discardedSkill])

    const getRemainingPoint = () => {
        return (mental * 2) + 1 - Object.values(selectedSkills).reduce((t, v) => t + v, 0);
    }

    const chooseSkill = (skill) => (e, v) => {
        if (getRemainingPoint() >= v) {
            onValueChange({...selectedSkills, [skill]: v || 0});
        }
    }

    return <>
        <StepTitle>Scegli le tua abilità</StepTitle>
        <IntroductionText hook="skills" />
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12}>
                <Box align="center">
                    <Typography variant="caption" align="center">
                        Puoi scegliere di scartare una abilità derivante dal mestiere in favore di quella derivante
                        dalla fazione
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
                    {!(factionSkills === discardedSkill) && <Button variant="outlined" color="primary"
                                                                    onClick={() => onDiscaredSkill(factionSkills)}>Scarta</Button>}
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="caption"
                            style={{textDecoration: factionSkills === discardedSkill ? 'line-through' : 'none'}}>{factionSkills}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Box align="right">
                    <AppTooltip availableData={availableSkills} data={factionSkills} placement="right">
                        <Rating
                            disabled={factionSkills === discardedSkill}
                            name={factionSkills.toLowerCase()}
                            value={selectedSkills[factionSkills] || 0}
                            onChange={chooseSkill(factionSkills)}
                            max={getMaxAttribute(factionSkills)}
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
                jobSkills.map(jobSkill => (<React.Fragment key={jobSkill}>
                    <Grid item xs={3}>
                        <Box align="right">
                            {!jobSkill.includes(discardedSkill) && <Button variant="outlined" color="primary"
                                                                           onClick={() => onDiscaredSkill(jobSkill)}>Scarta</Button>}
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption"
                                    style={{textDecoration: jobSkill.includes(discardedSkill) ? 'line-through' : 'none'}}>{jobSkill}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Box align="right">
                            <AppTooltip availableData={availableSkills} data={jobSkill} placement="right">
                                <Rating
                                    disabled={jobSkill.includes(discardedSkill)}
                                    name={jobSkill}
                                    value={selectedSkills[jobSkill] || 0}
                                    onChange={chooseSkill(jobSkill)}
                                    max={getMaxAttribute(jobSkill)}
                                    icon={<Brightness1Icon/>}
                                />
                            </AppTooltip>
                        </Box>
                    </Grid>
                    <Grid item xs={3}/>
                </React.Fragment>))
            }
        </Grid>
    </>;
}

export default SkillChoose;

