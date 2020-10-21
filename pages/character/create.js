import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import React, {useEffect, useReducer, useState} from "react";
import GameMode from "../../src/character/creation/GameMode";
import Box from "@material-ui/core/Box";
import BaseStats from "../../src/character/creation/BaseStats";
import DefectChoose from "../../src/character/creation/DefectChoose";
import JobChoose from "../../src/character/creation/JobChoose";
import Paper from "@material-ui/core/Paper";
import Theme from "../../src/Theme";
import SkillChoose from "../../src/character/creation/SkillChoose";
import CenteredButton from "../../src/form/CenteredButton";
import {Grid} from "@material-ui/core";

const getSteps = () => ['Modalità', 'Difetti', 'Caratteristiche', 'Mestiere', 'Abilità', 'Background'];

const stepReducer = (state, action) => {
    switch (action) {
        case 'next':
            return state + 1;
        default:
            return state;
    }
}

const CharacterCreate = ({characterInitialValue, availableAttributes, availableDefects, availableJobsTypes, availableJobs, availableSkills, availableFaiths, availableFactions}) => {

    const steps = getSteps();

    const [characterSheet, setCharacterSheet] = useState(characterInitialValue);
    const [isDisabledNextStep, setDisabledNextStep] = useState(true);
    const [activeStep, dispatch] = useReducer(stepReducer, 0);

    useEffect(() => {
        switch (activeStep) {
            case 0:
                return setDisabledNextStep(characterSheet.mode === 0)
            case 1:
                return setDisabledNextStep(characterSheet.defects.list.length === 0)
            case 2:
                return setDisabledNextStep(characterSheet.base.faith === null
                    && characterSheet.base.faction === null
                    && characterSheet.factionSkills === null
                )
            default:
                return setDisabledNextStep(true);
        }
    }, [characterSheet])

    useEffect(() => {
        setDisabledNextStep(true);
    }, [activeStep]);

    useEffect(() => console.log(characterSheet))

    const updateCharacterSheet = (key, value) => setCharacterSheet({...characterSheet, [key]:value});

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Paper elevation={24} component={Box} mt={Theme.spacing(1)} p={Theme.spacing(1)}>
                {activeStep === 0 && <GameMode
                    mode={characterSheet.mode}
                    onModeChoose={(c) => updateCharacterSheet('mode', c)} />}
                {activeStep === 1 && <DefectChoose
                    availableDefects={availableDefects}
                    defects={characterSheet.defects}
                    onValueChange={(c) => updateCharacterSheet('defects', c)} />}
                {activeStep === 2 && <BaseStats
                    availableAttributes={availableAttributes}
                    availableFaiths={availableFaiths}
                    availableSkills={availableSkills}
                    availableFactions={availableFactions}
                    baseStats={characterSheet.base}
                    factionSkills={characterSheet.factionSkills}
                    onSkillChange={(c) => updateCharacterSheet('factionSkills', c)}
                    onValueChange={(c) => updateCharacterSheet('base', c)} />}
                {activeStep === 3 && <JobChoose
                    availableJobsTypes={availableJobsTypes}
                    availableJobs={availableJobs}
                    availableSkills={availableSkills}
                    job={characterSheet.job}
                    jobSkills={characterSheet.jobSkills}
                    mental={characterSheet.base.skills.mental}
                    onValueChange={(c) => updateCharacterSheet('job', c)}
                    onSkillChange={(c) => updateCharacterSheet('jobSkills', c)} />}
                {activeStep === 4 && <SkillChoose
                    availableSkills={availableSkills}
                    characterSheet={characterSheet}
                    dispatch={dispatch}
                    onDiscaredSkill={(c) => updateCharacterSheet('discardedSkill', c)}
                    onValueChange={(c) => updateCharacterSheet('skills', c)} />}
                <CenteredButton
                    variant="contained"
                    disabled={isDisabledNextStep}
                    onClick={() => dispatch('next')}
                    color="primary">
                    Ho scelto
                </CenteredButton>
            </Paper>
        </div>
    )
}

export async function getServerSideProps(ctx) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const characterInitialValueRes = fetch('http://' + ctx.req.headers.host + '/api/character_initial_value').then(r => r.json());
    const availableDefectsRes = fetch('http://localhost:8000/lookup/defects').then(r => r.json());
    const availableAttributesRes = fetch('http://localhost:8000/lookup/attributes').then(r => r.json());
    const availableJobsTypesRes = fetch('http://localhost:8000/lookup/jobs_types').then(r => r.json());
    const availableJobsRes = fetch('http://localhost:8000/lookup/jobs').then(r => r.json());
    const availableSkillsRes = fetch('http://localhost:8000/lookup/skills').then(r => r.json());
    const availableFaithsRes = fetch('http://localhost:8000/lookup/faiths').then(r => r.json());
    const availableFactionsRes = fetch('http://localhost:8000/lookup/factions').then(r => r.json());

    const characterInitialValue = await characterInitialValueRes
    const availableDefects = await availableDefectsRes
    const availableAttributes = await availableAttributesRes
    const availableJobsTypes = await availableJobsTypesRes
    const availableJobs = await availableJobsRes
    const availableSkills = await availableSkillsRes
    const availableFaiths = await availableFaithsRes
    const availableFactions = await availableFactionsRes

    return {
        props: {
            availableAttributes,
            availableDefects,
            availableJobsTypes,
            availableJobs,
            characterInitialValue,
            availableSkills,
            availableFaiths,
            availableFactions
        }
    }
}

export default CharacterCreate;
