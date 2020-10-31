
export const useRegister = () => {

    const register = (username, password, onRegisterSuccess, onError) => {
        fetch('/api/user/register', {
            method: 'post',
            body: JSON.stringify({username, password})
        })
            .then(r => r.json())
            .then(r => onRegisterSuccess(r, username, password))
            .catch(e => {
                onError ? onError() : null;
            })
        ;
    }

    const validateEmail = (values, ValidationRules) => {
        return fetch('/api/user/email', {
            method: 'post',
            body: JSON.stringify({email: values.username})
        })
            .then(r => r.json())
            .then(j => {
                const errors = {};
                console.log(j);
                if (j.exists) {
                    errors.username = 'Username già esistente';
                }
                return ValidationRules(values, errors)
            })
    }

    return {register, validateEmail};
}