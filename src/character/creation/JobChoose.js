import React, {useEffect, useState} from "react";
import StepTitle from "../../layout/StepTitle";
import {Box, List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Field, Form, Formik} from "formik";
import FormikRadioGroup from "../../form/FormikRadioGroup";
import Theme from "../../Theme";
import {capitalMiniature, ucfirst} from "../../StringUtils";
import BoxedControlLabel from "../../form/BoxedControlLabel";
import DescriptedSurface from "../../layout/DescriptedSurface";
import CenteredButton from "../../form/CenteredButton";
import AppTooltip from "../../tooltip/AppTooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import IntroductionText from "../../IntroductionText";
import {useLookup} from "../../hook/UseLookup";

const CiteStyle = {
    fontStyle: "normal",
    borderLeft: '3px solid black',
    fontSize: Theme.typography.pxToRem(14),
    paddingLeft: Theme.spacing(1),
    paddingTop: Theme.spacing(1),
    paddingBottom: Theme.spacing(1),
    marginTop: Theme.spacing(1),
    marginBottom: Theme.spacing(1),
}

const SkillChoose = ({count, list, pushSkills, currentSelection, availableSkills}) => (<List>
        {
            list.map((s, i) => (
                <AppTooltip key={s} availableData={availableSkills} data={s} placement="right">
                    <ListItem button
                              disabled={list.length === 1}
                              selected={currentSelection.indexOf(s) !== -1}
                              onClick={pushSkills(count, s, list, currentSelection.indexOf(s) !== -1)}>{s.toLowerCase()}</ListItem>
                </AppTooltip>
            ))
        }
    </List>
);


const SkillModal = ({job, selectedSkills, availableSkills, handleClose, onSkillChoose}) => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const selectableSkills = job.skillGroups.reduce((tot, c) => tot + c.count, 0);
        if (selectableSkills === selectedSkills.length) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [selectedSkills])

    useEffect(() => {
        job.skillGroups.map(sg => {
            if (sg.list.length === 1) {
                selectedSkills.push(sg.list[0]);
                onSkillChoose([...selectedSkills]);
            }
        })
    }, [])

    const pushSkills = (count, skill, list, isSelected) => () => {

        if (isSelected) {
            selectedSkills.splice(selectedSkills.indexOf(skill), 1);
        } else {
            const intersection = selectedSkills.filter(x => list.includes(x));
            if (intersection.length === count) {
                return;
            }
            selectedSkills.push(skill)
        }
        onSkillChoose([...selectedSkills]);
    }

    return (<>
        <DialogTitle>{capitalMiniature("Scegli le abilità per fare il " + job.name)}</DialogTitle>
        <DialogContent dividers>
            {
                job.skillGroups.map((skillGroup, i) => <React.Fragment key={i}>
                    <Typography>
                    {skillGroup.list.length > 1 && `Devi selezionare ${skillGroup.count} abilità da questo gruppo`}
                    {skillGroup.list.length === 1 && `Questa abilità è selezionata automaticamente`}
                    </Typography>
                    <SkillChoose count={skillGroup.count}
                                 pushSkills={pushSkills}
                                 availableSkills={availableSkills}
                                 currentSelection={selectedSkills}
                                 list={skillGroup.list}/>
                </React.Fragment>)
            }
        </DialogContent>
        <DialogActions disableSpacing>
            <Button
                variant="outlined"
                disabled={isButtonDisabled}
                color="secondary"
                onClick={() => handleClose()}>
                Ho scelto
            </Button>
        </DialogActions>
    </>)
}

const SkillList = ({skillGroups, selectedSkills, availableSkills}) => {
    return skillGroups.map((skillGroup, i) => (<React.Fragment key={i}>
        <Typography style={{marginTop: Theme.spacing(2), fontSize: Theme.typography.pxToRem(12)}}>
            {skillGroup.list.length > 1 && `Devi selezionare ${skillGroup.count} skill da questo gruppo`}
            {skillGroup.list.length === 1 && 'Questa abilità è automaticamente selezionata'}
        </Typography>
        <Typography style={{marginTop: Theme.spacing(1), fontSize: Theme.typography.pxToRem(12)}}>
            {
                skillGroup.list.map((sg, i) => (<React.Fragment key={sg}>
                    <AppTooltip availableData={availableSkills} data={sg}>
                        <span
                            style={{fontWeight: selectedSkills.indexOf(sg) !== -1 ? 'bold' : 'normal'}}>{ucfirst(sg)}</span>
                    </AppTooltip>
                    {i !== skillGroup.list.length - 1 && ' - '}
                </React.Fragment>))
            }
        </Typography>
    </React.Fragment>))
}

const JobChoose = ({job, jobSkills, mental, onValueChange, onSkillChange}) => {

    const [availableJobsTypes, availableJobs, availableSkills] = useLookup(['availableJobsTypes', 'availableJobs', 'availableSkills'])
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setShowModal(job !== null)
    }, [job])

    return (<>
        <StepTitle>Scegli il tuo mestiere</StepTitle>
        <IntroductionText hook="jobs" />
        <Grid container>
            {
                availableJobsTypes.filter(currentJobType => (
                    currentJobType.requisite <= mental
                )).map(({label, requisite}) => (
                    <React.Fragment key={requisite}>
                        <Grid item xs={12}>
                            <Typography component={"h4"} variant={"h4"} align={"center"}>
                                {capitalMiniature(label)}
                            </Typography>
                        </Grid>
                        {
                            availableJobs.filter(j => (
                                j.requisite === requisite
                            )).map(j => (
                                <Grid item xs={12}
                                      key={j.name}
                                      onClick={() => {
                                          onValueChange(j.name)
                                      }}>
                                    <BoxedControlLabel
                                        selected={job === j.name}
                                        label={
                                            <DescriptedSurface
                                                name={capitalMiniature(j.name)}
                                                description1={j.description}
                                                description2={j.cite}
                                                description2Style={CiteStyle}
                                                description3={
                                                    <SkillList skillGroups={j.skillGroups}
                                                               selectedSkills={jobSkills}
                                                               availableSkills={availableSkills}/>
                                                }
                                                description3Component={Box}
                                            />
                                        }
                                    />
                                </Grid>
                            ))
                        }
                    </React.Fragment>)
                )
            }
        </Grid>
        <Dialog open={showModal}>
            <SkillModal job={availableJobs.find(a => a.name === job)}
                        selectedSkills={jobSkills}
                        handleClose={handleClose}
                        onSkillChoose={onSkillChange}
                        availableSkills={availableSkills}/>
        </Dialog>
    </>);
}

export default JobChoose;
