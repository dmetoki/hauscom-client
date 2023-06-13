import React from 'react';
import { useAuthentication } from '../context/AuthenticationContext';
import Login from './Login';
import Overview from './Overview';
import Header from './Header';
import LeftNav from './LeftNav';
import BackOffice from './BackOffice';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MentionsProvider } from '../context/MentionsContext';

function Home() {
    const loggedIn = useAuthentication();
  return (
    <React.Fragment>
      <Router>
        {
            !loggedIn
            ? <Login/>
            :
            <React.Fragment>
              <Header/>
              <LeftNav/>
              <MentionsProvider>
                <Routes>
                  <Route exact path="/" element={<Overview/>} />
                  <Route path="/backoffice" element={<BackOffice/>} />
                </Routes>
              </MentionsProvider>
            </React.Fragment>
        }
      </Router>
    </React.Fragment>
  )
}

export default Home