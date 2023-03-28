import React from 'react';
import { useAuthentication } from '../context/AuthenticationContext';
import Login from './Login';
import Overview from './Overview';

function Home() {
    const loggedIn = useAuthentication();
  return (
    <React.Fragment>
        {
            !loggedIn
            ? <Login/>
            : <Overview/>
        }
    </React.Fragment>
  )
}

export default Home