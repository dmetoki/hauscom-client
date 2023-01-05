import React from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Login from './components/Login';
import { AuthenticationProvider } from './context/AuthenticationContext';

function App() {
    return (
      <React.Fragment>
        <AuthenticationProvider>
          <Header/>
          <Nav/>
          <Login/>
        </AuthenticationProvider>
      </React.Fragment>
    );
  }
  
  export default App;