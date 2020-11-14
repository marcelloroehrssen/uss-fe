import React, {useEffect} from "react";
import GameMode from "../../src/character/creation/GameMode";
import BaseStats from "../../src/character/creation/BaseStats";
import DefectChoose from "../../src/character/creation/DefectChoose";
import JobChoose from "../../src/character/creation/JobChoose";
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
import {useCharacterSave} from "../../src/hook/UseCharacterSave";
import {useRouter} from "next/router";
import ItemChoose from "../../src/character/creation/ItemChoose";

const CharacterCreate = (
    {
        availableAttributes, availableDefects, availableJobsTypes, availableJobs, availableSkills, availableFaiths,
        availableFactions, availableBackgrounds, availableIntroductionText, availableItemsType, availableItems, alertOpen
    }) => {

    const [characterSheet, isValidating, updateCharacterSheet, setCharacterSheet] = useCharacter({isNew: true});
    const [isSaving, , save] = useCharacterSave();
    const [steps, activeStep, disable, passOver] = useCharacterCreationStep(
        ['Modalità', 'Difetti', 'Caratteristiche', 'Mestiere', 'Abilità', 'Background', 'Oggetti']
    );
    const router = useRouter()

    const updateBaseValues = (name, faith, faction, attributes) => {
        setCharacterSheet({...characterSheet, name, faith, faction, attributes})
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activeStep]);

    return (
        <LookupProvider values={{
            availableAttributes, availableDefects, availableJobsTypes, availableJobs, availableSkills,
            availableFaiths, availableFactions, availableBackgrounds, availableItemsType, availableItems
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
                                defectMode={characterSheet.defectMode}
                                defects={characterSheet.defects}
                                onModeChoose={(c) => updateCharacterSheet('defectMode', c)}
                                onValueChange={(c) => updateCharacterSheet('defects', c)}/>}
                            {activeStep === 2 && <BaseStats
                                name={characterSheet.name}
                                attributes={characterSheet.attributes}
                                faith={characterSheet.faith}
                                faction={characterSheet.faction}
                                factionSkill={characterSheet.factionSkill}
                                updateBaseValues={updateBaseValues}
                                onFactionSkillChange={(c) => updateCharacterSheet('factionSkill', c)}/>}
                            {activeStep === 3 && <JobChoose
                                job={characterSheet.job}
                                jobSkills={characterSheet.jobSkills}
                                mental={characterSheet.attributes.mental}
                                onValueChange={(c) => updateCharacterSheet('job', c)}
                                onSkillChange={(c) => updateCharacterSheet('jobSkills', c)}/>}
                            {activeStep === 4 && <SkillChoose
                                selectedSkills={characterSheet.skills}
                                factionSkill={characterSheet.factionSkill}
                                jobSkills={characterSheet.jobSkills}
                                discardedSkill={characterSheet.discardedSkill}
                                mental={characterSheet.attributes.mental}
                                onDiscaredSkill={(c) => updateCharacterSheet('discardedSkill', c)}
                                onValueChange={(c) => updateCharacterSheet('skills', c)}/>}
                            {activeStep === 5 && <BackgroundChoose
                                characterSheet={characterSheet}
                                selectedbackgrounds={characterSheet.backgrounds}
                                onValueChange={(c) => updateCharacterSheet('backgrounds', c)}/>}
                            {activeStep === 6 && <ItemChoose
                                characterSheet={characterSheet}
                                itemsType={availableItemsType}
                                items={availableItems}
                                onValueChange={(c) => updateCharacterSheet('items', c)}/>}
                            {activeStep === 7 && <Resume characterSheet={characterSheet}/>}
                            {activeStep !== 7 && <CenteredButton
                                variant="contained"
                                disabled={disable(characterSheet)}
                                onClick={() => passOver()}
                                color="primary">
                                Ho scelto
                            </CenteredButton>}
                            {activeStep === 7 && <CenteredButton
                                disabled={isSaving}
                                variant="contained"
                                onClick={() => save(characterSheet)
                                    .then(status => {
                                        alertOpen('Successo', 'Il tuo personaggio è stato creato con successo, attendi che un narratore lo approvi')
                                        return status;
                                    })
                                    .then(status => status ? router.push('/') : null)
                                    .catch(error => alertOpen("Errore nel salvataggio", 'E\' avvenuto un errore durante il salvataggio del PG riprova o scrivi ad un narratore'))
                                }
                                color="primary">
                                Salva
                            </CenteredButton>}
                        </AppContainer>
                    </div>
                }
            </IntroductionTextProvider>
        </LookupProvider>
    )
}

export async function getStaticProps(ctx) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    const lookupUrl = process.env.BACKEND_URL + 'lookup/';

    const availableDefectsRes = fetch(lookupUrl + 'defects').then(r => r.json());
    const availableAttributesRes = fetch(lookupUrl + 'attributes').then(r => r.json());
    const availableJobsTypesRes = fetch(lookupUrl + 'jobs_types').then(r => r.json());
    const availableJobsRes = fetch(lookupUrl + 'jobs').then(r => r.json());
    const availableSkillsRes = fetch(lookupUrl + 'skills').then(r => r.json());
    const availableFaithsRes = fetch(lookupUrl + 'faiths').then(r => r.json());
    const availableFactionsRes = fetch(lookupUrl + 'factions').then(r => r.json());
    const availableBackgroundsRes = fetch(lookupUrl + 'background').then(r => r.json());
    const availableIntroductionTextRes = fetch(lookupUrl + 'introduction_text').then(r => r.json());
    const availableItemsTypeRes = fetch(lookupUrl + 'items_types').then(r => r.json());
    const availableItemsRes = fetch(lookupUrl + 'items').then(r => r.json());

    const availableDefects = await availableDefectsRes
    const availableAttributes = await availableAttributesRes
    const availableJobsTypes = await availableJobsTypesRes
    const availableJobs = await availableJobsRes
    const availableSkills = await availableSkillsRes
    const availableFaiths = await availableFaithsRes
    const availableFactions = await availableFactionsRes
    const availableBackgrounds = await availableBackgroundsRes
    const availableIntroductionText = await availableIntroductionTextRes
    const availableItemsType = await availableItemsTypeRes
    const availableItems = await availableItemsRes

    return {
        revalidate: 300,
        props: {
            availableAttributes,
            availableDefects,
            availableJobsTypes,
            availableJobs,
            availableSkills,
            availableFaiths,
            availableFactions,
            availableBackgrounds,
            availableIntroductionText,
            availableItemsType,
            availableItems
        }
    }
}

export default CharacterCreate;
