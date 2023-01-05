import React, { useEffect } from 'react';
import { useAuthentication } from '../context/AuthenticationContext';
import Home from './Home';

function Login() {
    const loggedIn = useAuthentication();
    // useEffect(() => {}, [loggedIn])
    return(
        <React.Fragment>
            {
                !loggedIn
                ? <div className='login-box'>
                    <div className='message'>Bienvenido!</div>
                </div>
                : <Home/>
            }
        </React.Fragment>
    )
}
export default Login;