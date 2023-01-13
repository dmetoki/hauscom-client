import React from 'react';
import HeaderProfile from './HeaderProfile';

function Header() {
  return (
      <React.Fragment>
          <header>
              <div className='top-nav'>
                  <div className='hamburger'>
                      <svg viewBox="-5 -2 30 30" width='32px' height='32px' fill='#fff'>
                          <path d="M0 0h24v24H0z" fill="none"/>
                          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                      </svg>
                  </div>
                  <div className='logo'>
                      <h1>Hauscom</h1>
                  </div>
                  <div className='logo-partner'></div>
              </div>
              <div className='top-profile'>
                  <HeaderProfile/>
              </div>
          </header>
      </React.Fragment>
  )
}
export default Header;