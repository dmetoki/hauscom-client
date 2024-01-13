import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

function BreakdownFilter({channels, setAdvFilter, filter}) {
  return (
    <React.Fragment>
      <div className='breakdown_filter'>
        <Dropdown
          options={['all','positive','negative','neutral']}
          selection={filter.current.advanced.tone}
          id={'id2'}
          setAdvFilter={setAdvFilter}
        />
        {/* <Dropdown
          options={channels}
          selection={'select social network...'}
          id={'id3'}
        />
        <Dropdown
          options={['top 1%','top 10%','top 20%','bottom 10%']}
          selection={'select reach range...'}
          id={'id4'}
        /> */}
      </div>
    </React.Fragment>
  )
}

export default BreakdownFilter;