import React from 'react';
import './App.css';
import { AuthenticationProvider } from './context/AuthenticationContext';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment>
      <AuthenticationProvider>
        <Home/>
      </AuthenticationProvider>
    </React.Fragment>
   
  )
}

export default App
