import {useEffect, useState} from "react";

export const useCharacter = () => {

    const [isValidating, setIsValidating] = useState(true);
    const [characterSheet, setCharacterSheet] = useState({});

    useEffect(() => {
        fetch('/api/character_initial_value')
            .then(r => r.json())
            .then(j => setCharacterSheet(j))
            .finally(() => setIsValidating(false))
    }, [])

    useEffect(() => {
        if (characterSheet.discardedSkill === null) {
            updateCharacterSheet('discardedSkill', characterSheet.factionSkills)
        }
    }, [characterSheet.factionSkills])

    useEffect(() => {
        console.log(JSON.stringify(characterSheet))
    },[characterSheet])

    const updateCharacterSheet = (key, value) => setCharacterSheet({...characterSheet, [key]: value});

    return [characterSheet, isValidating, updateCharacterSheet, setCharacterSheet];
}
