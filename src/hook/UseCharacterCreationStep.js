import {useEffect, useReducer, useState} from "react";

const stepReducer = (state, action) => {
    switch (action) {
        case 'next':
            return state + 1;
        default:
            return state;
    }
}

export const useCharacterCreationStep = (steps, character) => {

    const [canPassOver, disablePassOver] = useState(true);
    const [activeStep, dispatch] = useReducer(stepReducer, 0);

    useEffect(() => {
        switch (activeStep) {
            case 0:
                return disablePassOver(character.mode === 0)
            case 1:
                return disablePassOver(character.defects.list.length === 0)
            case 2:
                return disablePassOver(character.faith === null
                    && character.faction === null
                    && character.factionSkills === null
                )
            case 3:
                return disablePassOver(character.job === null && character.jobSkills.length === 0)
            case 4:
                return disablePassOver(character.skills.length > 0
                    && character.discardedSkill !== null)
            case 5:
                return disablePassOver(Object.keys(character.backgrounds).length === 0)
            default:
                return disablePassOver(true);
        }
    }, [character])

    useEffect(() => {
        disablePassOver(true);
    }, [activeStep]);

    return [steps, activeStep, canPassOver, () => dispatch('next')]
}