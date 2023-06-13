import React from 'react'
import ToolBar from './ToolsBar';
import Inbox from './Inbox';
import { MentionsProvider } from '../context/MentionsContext';
import '../css/BackOffice.css'
// import LazyList from './LazyList';

function BackOffice() {
  return (
    <React.Fragment>
      <MentionsProvider>
        <div className='container backoffice'>
            <ToolBar
                title={'Back Office'}
                total={3440}
                variation={-53}
            />
            <main>
              {/* <LazyList/> */}
              <Inbox/>
            </main>
        </div>
        </MentionsProvider>
    </React.Fragment>
  )
}

export default BackOffice;