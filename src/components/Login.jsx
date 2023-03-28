import React from 'react';
import { useSetAuthentication } from '../context/AuthenticationContext';
import '../css/Login.css';

function Login() {
  const {logIn, logOut, credentials, setCredentials} = useSetAuthentication();
  const clearError = (e) => {
    e.target.classList.remove('error')
    // e.target.classList.remove("error")
  }
  return (
    <React.Fragment>
      <div className='login-container'>
        <div className='login-logo'>
          <h1>Hauscom</h1>
        </div>
        <form onSubmit={(e) => {logIn(e, credentials)}}>
          <label>Email</label>
          <input className='email' placeholder='Email Address' type="email" onFocus={clearError} onChange={e => setCredentials({...credentials, email: e.target.value})} />
          <label>Password</label>
          <input className='password' placeholder='Password' type="password" onFocus={clearError} onChange={e => setCredentials({...credentials, password: e.target.value})}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Login