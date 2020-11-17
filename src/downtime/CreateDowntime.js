import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Divider, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import {CheckboxWithLabel, RadioGroup} from 'formik-material-ui';
import React, {useEffect, useState} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {ErrorMessage, Field, Form, Formik} from "formik";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from "@material-ui/core/Box";
import {TextField} from 'formik-material-ui';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ItemTooltip from "../tooltip/ItemTooltip";
import {showImage} from "./ShowImage";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const CreateDowntime = ({downtimeDefinition, downtime, inventory, open, onClose, onSubmit}) => {

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(downtime.recipe?.downtimeDefinition?.id);
    }, [downtime])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const isInInventory = (item) => inventory[0].entries.map(e => e.item.name).includes(item.name);

    const getRecipe = (d, recipeId) => d.recipes.find(r => r.id + '' === recipeId)

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <Formik initialValues={{
                id: downtime.id ?? null,
                name: downtime.name ?? '',
                description: downtime.description ?? '',
                recipe: (downtime.recipe?.id ?? '') + '',
                relatedItems: downtime.relatedItems?.map(i => i.item.name) ?? []
            }}
                    validate={(values) => {
                        const errors = {};
                        if (values.name === '') {
                            errors.name = 'Devi decidere un titolo per questa azione'
                        }
                        if (values.definition === '') {
                            errors.definition = 'Devi associare una definizione a questa azione'
                        }
                        return errors
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        const downtime = {
                            id: values.id,
                            description: values.description,
                            name: values.name,
                            resolution: null,
                            resolutionTime: null,
                            createdAt: new Date().toISOString(),
                            recipe: values.recipe,
                            relatedItems: inventory[0].entries.filter(i => values.relatedItems.includes(i.item.name))
                        }
                        setSubmitting(false)
                        onSubmit(downtime);
                        fetch('/api/downtime/save', {
                            method: 'post',
                            body: JSON.stringify(downtime)
                        }).then(r => {
                            if (r.status === 200) {
                                return r.json();
                            } else if (r.status === 401) {
                                throw Error('Non sei autorizzato a salvare alcuna azione');
                            } else {
                                throw Error('Errore sconosciuto');
                            }
                        }).then(j => onSubmit(j))
                    }}>
                {({values, isSubmitting, submitForm, handleSubmit}) => (<>
                    <DialogTitle disableTypography={true}>
                        <Typography variant="subtitle1">
                            {downtime.name ? "Modifica " + downtime.name : "Crea azione in narrativa"}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Form>
                            <Field component={RadioGroup} name="recipe">
                                {
                                    downtimeDefinition.map((d) => (
                                        <Accordion key={d.id}
                                                   expanded={expanded === d.id}
                                                   onChange={handleChange(d.id)}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-label="Expand"
                                                aria-controls="additional-actions1-content"
                                                id="additional-actions1-header"
                                            >{d.name}</AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container direction="column" justify="space-between"
                                                      alignItems="stretch" spacing={1}>
                                                    <Grid item>
                                                        <Typography component={Box}
                                                                    color="textSecondary"
                                                                    dangerouslySetInnerHTML={{__html: d.description}}/>
                                                    </Grid>
                                                    <Grid item container justify="flex-start" spacing={1}>
                                                        {
                                                            d.items.map(i => (
                                                                <Field
                                                                    key={i.name}
                                                                    value={i.name}
                                                                    component={CheckboxWithLabel}
                                                                    type="checkbox"
                                                                    name="relatedItems"
                                                                    Label={{
                                                                        label: <ItemTooltip item={i}
                                                                                            additional={!isInInventory(i) ? "non hai questo oggetto" : null}>
                                                                            <Avatar variant="rounded"
                                                                                    className={classes.large}
                                                                                    src={showImage(i)}
                                                                            />
                                                                        </ItemTooltip>,
                                                                        disabled: isSubmitting || !isInInventory(i)
                                                                    }}
                                                                />
                                                            ))
                                                        }
                                                    </Grid>
                                                    {
                                                        d.recipes.map((r, i) => (<React.Fragment key={r.id}>
                                                            <Grid item>
                                                                <Box mt={1} mb={1}><Divider/></Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <FormControlLabel key={r.id}
                                                                                  value={r.id + ''}
                                                                                  control={<Radio
                                                                                      disabled={isSubmitting}/>}
                                                                                  label={<>
                                                                                      <strong>{r.name}</strong>
                                                                                      <Typography component="span"
                                                                                          dangerouslySetInnerHTML={{__html: r.description}}/>
                                                                                  </>}
                                                                                  disabled={isSubmitting}/>
                                                            </Grid>
                                                            <Grid item>
                                                                {
                                                                    r.items.map(i => (
                                                                        <Field
                                                                            key={i.name}
                                                                            value={i.name}
                                                                            component={CheckboxWithLabel}
                                                                            type="checkbox"
                                                                            name="relatedItems"
                                                                            Label={{
                                                                                label: <ItemTooltip item={i}
                                                                                                    additional={!isInInventory(i) ? "non hai questo oggetto" : null}>
                                                                                    <Avatar variant="rounded"
                                                                                            className={classes.large}
                                                                                            src={showImage(i)}/>
                                                                                </ItemTooltip>,
                                                                                disabled: isSubmitting || !isInInventory(i) || values.recipe+'' !== r.id+''
                                                                            }}
                                                                        />
                                                                    ))
                                                                }
                                                            </Grid>
                                                        </React.Fragment>))
                                                    }
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                }
                                <ErrorMessage name="definition" component={Typography} style={{
                                    color: 'rgba(154, 0, 0, 1)',
                                    margin: '0 14px',
                                    fontSize: '0.75rem',
                                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                                }}/>
                            </Field>
                            <Box mt={2}>
                                <Field component={TextField} variant="outlined" name="name" type="text"
                                       label="Titolo dell'azione" fullWidth/>
                            </Box>
                            <Box mt={2}>
                                <Field component={TextField} variant="outlined" name="description" type="text"
                                       rowsMax={8} multiline={true} rows={5} label="Descrizione" fullWidth/>
                            </Box>
                            <Box mt={2}>
                            </Box>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={onClose}>Chiudi</Button>
                        <Button type="submit" variant={"outlined"} onClick={handleSubmit}>Crea</Button>
                    </DialogActions>
                </>)}
            </Formik>
        </Dialog>
    )
}

export default CreateDowntime;
