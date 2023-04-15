import React from 'react';
import { useAuthentication } from '../context/AuthenticationContext';
import Login from './Login';
import Overview from './Overview';
import Header from './Header';
import LeftNav from './LeftNav';
import BackOffice from './BackOffice';

function Home() {
    const loggedIn = useAuthentication();
  return (
    <React.Fragment>
        {
            !loggedIn
            ? <Login/>
            :
            <React.Fragment>
              <Header/>
              <LeftNav/>
              <BackOffice/>
              {/* <Overview/> */}
            </React.Fragment>
        }
    </React.Fragment>
  )
}

export default Home