import React, { useEffect } from 'react';
import { useAuthentication, useSetAuthentication } from '../context/AuthenticationContext';
import Home from './Home';


function Login() {
    const loggedIn = useAuthentication();
    const {logIn, logOut, credentials, setCredentials} = useSetAuthentication();
    const profile =
        localStorage.getItem('credentials')
        ? JSON.parse(localStorage.getItem('credentials')).profile
        : {}
    // useEffect(() => {}, [loggedIn])
    return(
        <React.Fragment>
            {
                !loggedIn
                ? <div className='login-box'>
                        <form onSubmit={(e) => {logIn(e, credentials)}}>
                            <div className="profile">
                                <input id="form1" type="text" placeholder="user name" onChange={e => setCredentials({...credentials, email: e.target.value})} />
                                <input id="form2" type="text" placeholder="password" onChange={e => setCredentials({...credentials, password: e.target.value})} />
                                <button className="btn">log in</button>
                            </div>
                        </form>
                </div>
                : <Home/>
            }
        </React.Fragment>
    )
}
export default Login;