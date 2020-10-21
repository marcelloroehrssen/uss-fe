import React, {useState, useEffect} from "react";
import StepTitle from "../../StepTitle";
import {Formik, Form, Field, ErrorMessage, useFormikContext} from 'formik';
import {TextField} from 'formik-material-ui';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Rating from '@material-ui/lab/Rating';
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Typography from "@material-ui/core/Typography";
import FormikRadioGroup from "../../form/FormikRadioGroup";
import Theme from "../../Theme";
import CenteredButton from "../../form/CenteredButton";
import BoxedControlLabel from "../../form/BoxedControlLabel";
import DescriptedSurface from "../../DescriptedSurface";
import {capitalMiniature} from "../../StringUtils";
import AppTooltip from "../../tooltip/AppTooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AutoSubmit from "../../form/AutoSubmit";

const getMaxAttribute = (attribute, baseStats) => {
    return 5;
}

const maxPoint = 5;

const SkillModal = ({factionSkills, availableSkills, handleClose, onSkillChoose, value}) => (<>
    <DialogTitle>{capitalMiniature("Scegli la tue abilità di fazione")}</DialogTitle>
    <DialogContent dividers>
        {
            <>
                <Typography>Devi selezionare una abilità</Typography>
                <List>
                    {
                        factionSkills.map(s => (
                            <AppTooltip key={s} availableData={availableSkills} data={s} placement="right">
                                <ListItem button
                                          selected={value === s}
                                          onClick={() => onSkillChoose(s)}>{s.toLowerCase()}</ListItem>
                            </AppTooltip>
                        ))
                    }
                </List>
            </>
        }
    </DialogContent>
    <DialogActions disableSpacing>
        <Button
            variant="outlined"
            disabled={value === []}
            color="secondary"
            onClick={() => handleClose()}>
            Ho scelto
        </Button>
    </DialogActions>
</>);

const FormRadioItem = ({form, field, availables, children, name}) => (
    <FormikRadioGroup form={form} field={field}>
        {availables.filter(f => f.enabled || true).map(item => (
            <BoxedControlLabel
                selected={form.values[name] === item.name}
                key={item.name}
                value={item.name}
                label={children(item)}
            />
        ))}
    </FormikRadioGroup>
)

const FactionSkillTooltip = ({availableSkills, skill}) => (
    <AppTooltip availableData={availableSkills} data={skill} placement="top">
        <span>{skill.toLowerCase()}</span>
    </AppTooltip>
)

const BaseStats = ({baseStats, factionSkills, onSkillChange, onValueChange, availableAttributes, availableFaiths, availableFactions, availableSkills}) => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => window.scrollTo(0, 0), []);

    const handleClose = () => {
        setShowModal(false);
    };

    const validate = values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Devi inserire un nome';
        }
        if (values.physical === 0 || !values.physical) {
            errors.remainingPoints = 'Non puoi avere le skill fisiche a zero';
        }
        if (values.mental === 0 || !values.mental) {
            errors.remainingPoints = 'Non puoi avere le skill mentali a zero';
        }
        if (values.social === 0 || !values.social) {
            errors.remainingPoints = 'Non puoi avere le skill sociali a zero';
        }
        if ((values.physical + values.mental + values.social) !== maxPoint) {
            errors.remainingPoints = 'Devi usare tutti i tuoi punti abilità';
        }
        if (!values.faith) {
            errors.faith = 'Devi selezionare una fede';
        }
        if (!values.faction) {
            errors.faction = 'Devi selezionare una fazione';
        }

        return errors;
    }

    const submit = (values, {setSubmitting}) => {
        setSubmitting(false);
        onValueChange({
            name: values.name,
            faith: values.faith,
            faction: values.faction,
            skills: {
                physical: values.physical,
                mental: values.mental,
                social: values.social,
            }
        })
        setShowModal(true);
    }

    const skillRatingChange = (skillName, values, setFieldValue) => (e, v) => {
        const possibleSpentPoint = values.physical + values.mental + values.social - values[skillName] + v;

        if (maxPoint < possibleSpentPoint) return;

        setFieldValue(skillName, v < 1 ? 1 : v);
    }

    return (
        <>
            <StepTitle>Caratteristiche base</StepTitle>
            <Formik
                initialValues={{
                    name: baseStats.name,
                    remainingPoints: baseStats.skills.physical + baseStats.skills.mental + baseStats.skills.social,
                    faith: baseStats.faith,
                    faction: baseStats.faction,
                    physical: baseStats.skills.physical,
                    mental: baseStats.skills.mental,
                    social: baseStats.skills.social
                }}
                validate={validate}
                onSubmit={submit}>
                {({values, setFieldValue}) => (
                    <Form>
                        <Box m={2} justifyContent="center">
                            <Field component={TextField} variant="outlined" name="name" type="text"
                                   label="Nome completo" fullWidth/>
                        </Box>
                        {
                            [
                                {label: 'Fisiche', key: 'physical'},
                                {label: 'Mentali', key: 'mental'},
                                {label: 'Sociali', key: 'social'}].map((item, i) => (
                                <Grid container direction="row" justify="center" alignItems="center" spacing={2}
                                      key={item.key}>
                                    <Grid item>
                                        <Typography variant="body2"
                                                    style={{fontSize: Theme.typography.pxToRem(25)}}>{item.label}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <AppTooltip availableData={availableAttributes} data={item.label}
                                                    placement="right">
                                            <Rating
                                                name={item.key}
                                                value={values[item.key]}
                                                max={getMaxAttribute(item.key, baseStats)}
                                                onChange={skillRatingChange(item.key, values, setFieldValue)}
                                                icon={<Brightness1Icon/>}
                                            />
                                        </AppTooltip>
                                    </Grid>
                                </Grid>
                            ))
                        }
                        <Box m={2} justifyContent="center">
                            <ErrorMessage component={Typography} style={{
                                color: '#ff0000',
                                marginBottom: Theme.spacing(2),
                                fontFamily: 'Times New Roman',
                                textAlign: 'center'
                            }} name="remainingPoints"/>
                        </Box>
                        <Box m={2} justifyContent="center">
                            <Typography variant={'h4'}
                                        align={"center"}>{capitalMiniature("Scegli una fede")}</Typography>
                            <Field name="faith">
                                {({field, form}) => (
                                    <FormRadioItem field={field} form={form} availables={availableFaiths} name="faith">
                                        {({name, description}) => (
                                            <DescriptedSurface name={capitalMiniature(name)}
                                                               description1={description}/>)}
                                    </FormRadioItem>
                                )}
                            </Field>
                        </Box>
                        <Box m={2} justifyContent="center">
                            <Typography variant={'h4'}
                                        align={"center"}>{capitalMiniature("Scegli una fazione")}</Typography>
                            <Field name="faction">
                                {({field, form}) => (
                                    <FormRadioItem field={field} form={form} availables={availableFactions}
                                                   name="faction">
                                        {({name, type, visibility, description, skills}) => (
                                            <DescriptedSurface
                                                name={capitalMiniature(name)}
                                                description1={<>
                                                    <Typography
                                                        component={'span'}>{(type === 'closed' ? 'Chiusa' : 'Aperta') + ' / ' + (visibility === 'hidden' ? 'Nascosta' : 'Palese')}</Typography>
                                                    <Typography component={'span'}>{description}</Typography>
                                                </>}
                                                description2='Skill di fazione:'
                                                description3={
                                                    skills.map((s, i) => (<React.Fragment key={s}>
                                                        <FactionSkillTooltip skill={s}
                                                                             availableSkills={availableSkills}/>
                                                        {i !== skills.length - 1 && ' - '}
                                                    </React.Fragment>))
                                                }/>)
                                        }
                                    </FormRadioItem>
                                )}
                            </Field>
                        </Box>
                        <AutoSubmit/>
                        <Dialog open={showModal} onClose={handleClose}>
                            <SkillModal
                                factionSkills={values.faction ? availableFactions.find(a => a.name === values.faction).skills : null}
                                handleClose={handleClose}
                                value={factionSkills}
                                onSkillChoose={onSkillChange}
                                availableSkills={availableSkills}/>
                        </Dialog>
                    </Form>
                )}
            </Formik>
        </>
    );
}
export default BaseStats;
