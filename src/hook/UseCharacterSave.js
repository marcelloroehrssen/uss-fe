import {useState} from "react";

export const useCharacterSave = () => {

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const save = (characterSheet) => {
        setIsSaving(true)
        return fetch('/api/character/save', {
            method: 'post',
            body: JSON.stringify(characterSheet)
        })
            .then(r => {
                if (r.status === 200) {
                    return true;
                } else if (r.status === 401) {
                    throw Error('Non sei autorizzato a salvare alcun personaggio');
                } else {
                    throw Error('Errore sconosciuto');
                }
            })
            .finally(() => setIsSaving(false))
    }

    return [isSaving, error, save];
}
