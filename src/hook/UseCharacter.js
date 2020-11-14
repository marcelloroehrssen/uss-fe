import {useEffect, useState} from "react";

export const useCharacter = ({isNew}) => {

    const [isValidating, setIsValidating] = useState(true);
    const [characterSheet, setCharacterSheet] = useState([]);

    useEffect(() => {
        if (isNew) {
            fetch('/api/character/initial_value')
                .then(r => r.json())
                .then(j => setCharacterSheet(j))
                .finally(() => setIsValidating(false))
        } else {
            fetch('/api/character/get')
                .then(r => r.json())
                .then(j => setCharacterSheet(j))
                .finally(() => setIsValidating(false))
        }
    }, [])

    useEffect(() => {
        if (characterSheet.discardedSkill === null) {
            updateCharacterSheet('discardedSkill', characterSheet.factionSkill)
        }
    }, [characterSheet.factionSkill])

    // useEffect(() => console.log(characterSheet), [characterSheet]);

    const updateCharacterSheet = (key, value) => setCharacterSheet({...characterSheet, [key]: value});

    return [characterSheet, isValidating, updateCharacterSheet, setCharacterSheet];
}
