import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {Typography} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";

const useStyle = makeStyles({
    root: {
        filter: 'grayscale(80%)'
    },
    active: {
        filter: 'grayscale(40%)'
    },
    completed: {
        filter: 'grayscale(0%)'
    },
});

const WaxStep = ({ active, completed }) => {
    const classes = useStyle();

    return <div className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
    })}>
        <img src="/images/wax.png" />
    </div>
}

const CharacterCreationStepper = ({steps, activeStep}) => (
    <Stepper activeStep={activeStep} alternativeLabel connector={null}>
        {steps.map((step) => (
            <Step key={step}>
                <StepLabel StepIconComponent={WaxStep}>
                    <Typography variant="subtitle2">{step}</Typography>
                </StepLabel>
            </Step>
        ))}
    </Stepper>
)

export default CharacterCreationStepper;
