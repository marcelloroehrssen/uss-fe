import React, {useEffect} from "react";
import GameMode from "../../src/character/creation/GameMode";
import Box from "@material-ui/core/Box";
import BaseStats from "../../src/character/creation/BaseStats";
import DefectChoose from "../../src/character/creation/DefectChoose";
import JobChoose from "../../src/character/creation/JobChoose";
import Paper from "@material-ui/core/Paper";
import Theme from "../../src/Theme";
import SkillChoose from "../../src/character/creation/SkillChoose";
import CenteredButton from "../../src/form/CenteredButton";
import BackgroundChoose from "../../src/character/creation/BackgroundChoose";
import {IntroductionTextProvider} from "../../src/context/IntroductionTextProvider";
import {LookupProvider} from "../../src/context/LookupProvider";
import {useCharacter} from "../../src/hook/UseCharacter";
import {useCharacterCreationStep} from "../../src/hook/UseCharacterCreationStep";
import CharacterCreationStepper from "../../src/stepper/CharacterCreationStepper";
import AppContainer from "../../src/layout/AppContainer";
import Resume from "../../src/character/creation/Resume";

const CharacterCreate = (
    {
        availableAttributes, availableDefects, availableJobsTypes, availableJobs, availableSkills, availableFaiths,
        availableFactions, availableBackgrounds, availableIntroductionText
    }) => {

    const [characterSheet, isValidating, updateCharacterSheet, setCharacterSheet] = useCharacter();
    const [steps, activeStep, canPassOver, passOver] = useCharacterCreationStep(
        ['Modalità', 'Difetti', 'Caratteristiche', 'Mestiere', 'Abilità', 'Background'], characterSheet
    );

    const updateBaseValues = (name, faith, faction, attributes) => {
        setCharacterSheet({...characterSheet, name, faith, faction, attributes})
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activeStep]);

    return (
        <LookupProvider values={{
            availableAttributes, availableDefects, availableJobsTypes, availableJobs,
            availableSkills, availableFaiths, availableFactions, availableBackgrounds,
        }}>
            <IntroductionTextProvider values={availableIntroductionText}>
                {
                    !isValidating && <div>
                        <CharacterCreationStepper activeStep={activeStep} steps={steps}/>
                        <AppContainer>
                            {activeStep === 0 && <GameMode
                                mode={characterSheet.mode}
                                onModeChoose={(c) => updateCharacterSheet('mode', c)}/>}
                            {activeStep === 1 && <DefectChoose
                                defects={characterSheet.defects}
                                onValueChange={(c) => updateCharacterSheet('defects', c)}/>}
                            {activeStep === 2 && <BaseStats
                                name={characterSheet.name}
                                attributes={characterSheet.attributes}
                                faith={characterSheet.faith}
                                faction={characterSheet.faction}
                                factionSkills={characterSheet.factionSkills}
                                updateBaseValues={updateBaseValues}
                                onFactionSkillChange={(c) => updateCharacterSheet('factionSkills', c)}/>}
                            {activeStep === 3 && <JobChoose
                                job={characterSheet.job}
                                jobSkills={characterSheet.jobSkills}
                                mental={characterSheet.attributes.mental}
                                onValueChange={(c) => updateCharacterSheet('job', c)}
                                onSkillChange={(c) => updateCharacterSheet('jobSkills', c)}/>}
                            {activeStep === 4 && <SkillChoose
                                selectedSkills={characterSheet.skills}
                                factionSkills={characterSheet.factionSkills}
                                jobSkills={characterSheet.jobSkills}
                                discardedSkill={characterSheet.discardedSkill}
                                mental={characterSheet.attributes.mental}
                                onDiscaredSkill={(c) => updateCharacterSheet('discardedSkill', c)}
                                onValueChange={(c) => updateCharacterSheet('skills', c)}/>}
                            {activeStep === 5 && <BackgroundChoose
                                characterSheet={characterSheet}
                                selectedbackgrounds={characterSheet.backgrounds}
                                onValueChange={(c) => updateCharacterSheet('backgrounds', c)}/>}
                            {activeStep === 6 && <Resume characterSheet={characterSheet}/>}
                            <CenteredButton
                                variant="contained"
                                disabled={canPassOver}
                                onClick={() => passOver()}
                                color="primary">
                                Ho scelto
                            </CenteredButton>
                        </AppContainer>
                    </div>
                }
            </IntroductionTextProvider>
        </LookupProvider>
    )
}

export async function getStaticProps(ctx) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const availableDefectsRes = fetch('http://localhost:8000/lookup/defects').then(r => r.json());
    const availableAttributesRes = fetch('http://localhost:8000/lookup/attributes').then(r => r.json());
    const availableJobsTypesRes = fetch('http://localhost:8000/lookup/jobs_types').then(r => r.json());
    const availableJobsRes = fetch('http://localhost:8000/lookup/jobs').then(r => r.json());
    const availableSkillsRes = fetch('http://localhost:8000/lookup/skills').then(r => r.json());
    const availableFaithsRes = fetch('http://localhost:8000/lookup/faiths').then(r => r.json());
    const availableFactionsRes = fetch('http://localhost:8000/lookup/factions').then(r => r.json());
    const availableBackgroundsRes = fetch('http://localhost:8000/lookup/background').then(r => r.json());
    const availableIntroductionTextRes = fetch('http://localhost:8000/lookup/introduction_text').then(r => r.json());

    const availableDefects = await availableDefectsRes
    const availableAttributes = await availableAttributesRes
    const availableJobsTypes = await availableJobsTypesRes
    const availableJobs = await availableJobsRes
    const availableSkills = await availableSkillsRes
    const availableFaiths = await availableFaithsRes
    const availableFactions = await availableFactionsRes
    const availableBackgrounds = await availableBackgroundsRes
    const availableIntroductionText = await availableIntroductionTextRes

    return {
        props: {
            availableAttributes,
            availableDefects,
            availableJobsTypes,
            availableJobs,
            availableSkills,
            availableFaiths,
            availableFactions,
            availableBackgrounds,
            availableIntroductionText
        }
    }
}

export default CharacterCreate;
