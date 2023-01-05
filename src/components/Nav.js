import React, {useState} from 'react';
import HeaderProfile from './HeaderProfile';

function Nav() {
    const [navState, setNavState] = useState('');
    const menuToggle = () => { navState === '' ? setNavState('open') : setNavState('')}
  return (
      <React.Fragment>
          <nav className={navState}>
              <div className='active'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7 -7 36 36" width="32px" height="32px">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                  <span>Mentions</span>
              </div>
              {/* <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -3 30 30" width="32px" height="32px">
                      <path d="M0 0h24v24H0V0z" fill="none"/>
                      <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>Stakeholders</span>
              </div>
              <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -4 30 30" width="32px" height="32px">
                      <path d="M0 0h24v24H0V0z" fill="none"/>
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
                  </svg>
                  <span>Analytics</span>
              </div>
              <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -4 32 32" width="32px" height="32px">
                      <path d="M0 0h24v24H0V0z" fill="none"/>
                      <circle cx="6.18" cy="17.82" r="2.18"/>
                      <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
                  </svg>
                  <span>Reach</span>
              </div> */}
          </nav>
      </React.Fragment>
  )
}
export default Nav;