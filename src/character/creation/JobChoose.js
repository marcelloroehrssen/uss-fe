import React, {useEffect, useState} from "react";
import StepTitle from "../../StepTitle";
import {Box, List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Field, Form, Formik} from "formik";
import FormikRadioGroup from "../../form/FormikRadioGroup";
import Theme from "../../Theme";
import {capitalMiniature, ucfirst} from "../../StringUtils";
import BoxedControlLabel from "../../form/BoxedControlLabel";
import DescriptedSurface from "../../DescriptedSurface";
import CenteredButton from "../../form/CenteredButton";
import AppTooltip from "../../tooltip/AppTooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";

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

const SkillChoose = ({count, list, pushSkills, currentSelection, availableSkills}) => {

    return (<List>
        {
            list.map((s, i) => (
                <AppTooltip key={s} availableData={availableSkills} data={s} placement="right">
                    <ListItem button
                              selected={currentSelection.indexOf(s) !== -1}
                              onClick={pushSkills(count, s, list, currentSelection.indexOf(s) !== -1)}>{s.toLowerCase()}</ListItem>
                </AppTooltip>
            ))
        }
    </List>);
}

const SkillModal = ({job, availableSkills, handleClose, onSkillChoose, onStepCompleted}) => {

    const [currentSelection, setCurrentSelection] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const selectableSkills = job.skillGroups.reduce((tot, c) => tot + c.count,0);
        if (selectableSkills === currentSelection.length) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [currentSelection])

    useEffect(() => {
        job.skillGroups.
            pushSkills(count, list[0], list, false);
    }, [])

    const pushSkills = (count, skill, list, isSelected) => () => {
        console.log('asd');
        if (isSelected) {
            currentSelection.splice(currentSelection.indexOf(skill), 1);
        } else {
            const intersection = currentSelection.filter(x => list.includes(x));
            if (intersection.length === count) {
                return;
            }
            currentSelection.push(skill)
        }
        setCurrentSelection([...currentSelection]);
    }

    const onConfirm = () => {
        onSkillChoose(currentSelection);
        onStepCompleted(true);
        handleClose();
    }

    return (<>
        <DialogTitle>{capitalMiniature("Scegli le abilità per fare il " + job.name)}</DialogTitle>
        <DialogContent dividers>
            {
                job.skillGroups.map((skillGroup, i) => <React.Fragment key={i}>
                    <Typography>Devi selezionare {skillGroup.count} abilità da questo gruppo</Typography>
                    <SkillChoose count={skillGroup.count}
                                 pushSkills={pushSkills}
                                 availableSkills={availableSkills}
                                 currentSelection={currentSelection}
                                 list={skillGroup.list} />
                </React.Fragment>)
            }
        </DialogContent>
        <DialogActions disableSpacing>
            <Button
                variant="outlined"
                disabled={isButtonDisabled}
                color="secondary"
                onClick={onConfirm}>
                Ho scelto
            </Button>
        </DialogActions>
    </>)
}

const SkillList = ({skillGroups, selectedSkills, availableSkills}) => {
    return skillGroups.map((skillGroup, i) => (<React.Fragment key={i}>
        <Typography style={{marginTop: Theme.spacing(2), fontSize: Theme.typography.pxToRem(12)}}>
            { skillGroup.list.length > 1 && 'Devi selezionare {skillGroup.count} skill da questo gruppo' }
            { skillGroup.list.length === 1 && 'Questa abilità è automaticamente selezionata' }
        </Typography>
        <Typography style={{marginTop: Theme.spacing(1), fontSize: Theme.typography.pxToRem(12)}}>
            {
                skillGroup.list.map((sg, i) => (<React.Fragment key={sg}>
                    <AppTooltip availableData={availableSkills} data={sg}>
                        <span style={{fontWeight:selectedSkills.indexOf(sg) !== -1 ? 'bold':'normal'}}>{ucfirst(sg)}</span>
                    </AppTooltip>
                    {i !== skillGroup.list.length - 1 && ' - '}
                </React.Fragment>))
            }
        </Typography>
    </React.Fragment>))
}

const JobChoose = ({characterSheet, onStepCompleted, onValueChange, onSkillChange, availableJobsTypes, availableJobs, availableSkills}) => {

    const [selectedJob, setSelectedJob] = useState(characterSheet.job);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (selectedJob !== null) {
            setShowModal(true)
            onValueChange(selectedJob);
        }
    }, [selectedJob])

    return (<>
        <StepTitle>Scegli il tuo mestiere</StepTitle>
        <Formik
            initialValues={{job: selectedJob}}
            validate={values => {
                return values.job === null ? {job: "Devi selezionare un mestiere"} : {}
            }}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false)
                setSelectedJob(values.job)
            }}>
            {({values, submitForm}) => (
                <Form>
                    <Field name="job">
                        {({field, form}) => (
                            <FormikRadioGroup form={form} field={field}>
                                {
                                    availableJobsTypes.filter(currentJobType => (
                                        currentJobType.requisite <= characterSheet.base.skills.mental
                                    )).map(({label, requisite}) => (
                                        <React.Fragment key={requisite}>
                                            <Typography component={"h4"} variant={"h4"} align={"center"}>
                                                {capitalMiniature(label)}
                                            </Typography>
                                            {
                                                availableJobs.filter(j => (
                                                    j.requisite === requisite
                                                )).map(job => (
                                                    <BoxedControlLabel
                                                        selected={form.values.job === job.name}
                                                        key={job.name}
                                                        value={job.name}
                                                        label={
                                                            <DescriptedSurface
                                                                name={capitalMiniature(job.name)}
                                                                description1={job.description}
                                                                description2={job.cite}
                                                                description2Style={CiteStyle}
                                                                description3={
                                                                    <SkillList skillGroups={job.skillGroups}
                                                                               selectedSkills={characterSheet.jobSkills}
                                                                               availableSkills={availableSkills}/>
                                                                }
                                                                description3Component={Box}
                                                            />
                                                        }
                                                    />
                                                ))
                                            }
                                        </React.Fragment>)
                                    )
                                }
                            </FormikRadioGroup>
                        )}
                    </Field>
                    <CenteredButton
                        variant="contained"
                        color="primary"
                        disabled={values.job === null}
                        onClick={submitForm}>
                        Ho scelto
                    </CenteredButton>
                </Form>
            )}
        </Formik>
        <Dialog open={showModal} onClose={handleClose}>
            <SkillModal job={availableJobs.find(a => a.name === selectedJob)}
                        handleClose={handleClose}
                        onSkillChoose={onSkillChange}
                        onStepCompleted={onStepCompleted}
                        availableSkills={availableSkills}/>
        </Dialog >
    </>);
}

export default JobChoose;
