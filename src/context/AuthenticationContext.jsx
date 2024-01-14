import React, {useContext, useState, useEffect } from "react";
const AuthenticationContext = React.createContext();
const SetAuthenticationContext = React.createContext();

// Replacement of useContext for this provider
export function useAuthentication() {
    return useContext(AuthenticationContext)
}

// Replacement of useContext for this provider
export function useSetAuthentication() {
    return useContext(SetAuthenticationContext)
}

// Function that groups all providers
export function AuthenticationProvider({children}) {
    // AuthenticationContext Provider
    const [loggedIn, setLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoggedIn(
            localStorage.getItem('credentials') ? true : false
        )
    }, [])
    
    // SetAuthenticationContext Provider
    function logIn(e, credentials) {
        e.preventDefault();
        if(credentials) {
            fetch('https://login-user-a73sknldvq-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            .then((res) => {
                if (!res.ok || credentials.email === '' || credentials.password === '') {
                    setError(true)
                }
                return res.json();
            })
            .then(data => {
                if(data.success) {
                    localStorage.setItem('credentials', JSON.stringify(data));
                    setLoggedIn(true)
                    setCredentials(null)
                } else {
                    setLoggedIn(false)
                    setCredentials(null)
                }
            })
            .catch(error => {
                console.log('error')
            })
        }
    }
    function logOut() {
        setLoggedIn(false)
        setCredentials(null)
    }
    return(
        <AuthenticationContext.Provider value={loggedIn}>
            <SetAuthenticationContext.Provider value={{logIn, logOut, credentials, setCredentials, error, setError}}>
                {children}
            </SetAuthenticationContext.Provider>
        </AuthenticationContext.Provider>
    )
}