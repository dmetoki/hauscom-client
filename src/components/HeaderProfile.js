import React from 'react';
import { useAuthentication, useSetAuthentication } from '../context/AuthenticationContext';

function HeaderProfile() {
    const loggedIn = useAuthentication();
    const {logIn, logOut, credentials, setCredentials} = useSetAuthentication();
    const profile =
        localStorage.getItem('credentials')
        ? JSON.parse(localStorage.getItem('credentials')).profile
        : {}
  return (
      <React.Fragment>
          {
              loggedIn
              ?
              <div className="profile">
                  <div className="profile-data">
                      <h3>{profile.name}</h3>
                      <p>{profile.role}</p>
                  </div>
                  <div className="profile-image">
                      <svg width="32px" height="32px" preserveAspectRatio='xMinYMin'>
                          <defs>
                              <pattern id="image" height="100%" width="100%" viewBox="0 0 32 32">
                                  <image width="100%" height="100%" xlinkHref='/profile.svg'></image>
                              </pattern>
                          </defs>
                          <circle cx="50%" cy="50%" r="40%" fill="url(#image)" />
                          <circle cx="50%" cy="50%" r="48%" stroke="#f2304a" strokeWidth='2px' fillOpacity='0' />
                      </svg>
                  </div>
              </div>
              :
              <form onSubmit={(e) => {logIn(e, credentials)}}>
                  <div className="profile">
                      <input id="form1" type="text" placeholder="user name" onChange={e => setCredentials({...credentials, email: e.target.value})} />
                      <input id="form2" type="text" placeholder="password" onChange={e => setCredentials({...credentials, password: e.target.value})} />
                      <button className="btn">log in</button>
                  </div>
              </form>
          }
      </React.Fragment>
  )
}
export default HeaderProfile;