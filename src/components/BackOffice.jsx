import React from 'react'
import ToolBar from './ToolsBar';
import LazyList from './LazyList';
import '../css/BackOffice.css'

function BackOffice() {
  return (
    <React.Fragment>
        <div className='container backoffice'>
            <ToolBar
                title={'Back Office'}
                totals={3440}
                variation={-53}
            />
            <main>
              <LazyList/>
            </main>
        </div>
    </React.Fragment>
  )
}

export default BackOffice;