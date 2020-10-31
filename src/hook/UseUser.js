import useSWR from "swr";
import {useCookies} from "react-cookie";

export const useUser = () => {
    const {data, mutate} = useSWR('/api/user/get')

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const login = (username, password, onLoginSuccess, onError) => {
        fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({username, password})
        })
            .then(r => r.json())
            .then(r => {
                setCookie('token', r.data, {
                    path: '/'
                });
                fetch('/api/user/get')
                    .then(r => {
                        if (r.status === 400) {
                            throw new Error("Login fallito");
                        }
                        return r.json()
                    })
                    .then(j => mutate(j))
                    .then(() => onLoginSuccess())
                    .catch(e => {
                        onError ? onError() : null;
                    })
            })
    }

    const logout = () => {
        removeCookie('token')
        mutate(null);
    }

    return {data, mutate, login, logout};
}