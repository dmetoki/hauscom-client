import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <React.Fragment>
        <header>
          <div className='logo-menu'>
            <div className='hamburger'>
              <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 50 960 960" width="32" fill="#fff">
                <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/>
              </svg>
            </div>
            <div className='logo'>
              <h1>Hauscom</h1>
            </div>
          </div>
          <div className='top-right-menu'></div>
        </header>
    </React.Fragment>
  )
}

export default Header