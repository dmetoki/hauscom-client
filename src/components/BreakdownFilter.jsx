import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

function BreakdownFilter({channels, filter, setFilter}) {
  return (
    <React.Fragment>
      <div className='breakdown_filter'>
        <Dropdown
          options={['positive','negative','neutral']}
          selection={'select tone...'}
          id={'id2'}
          filter={filter}
          setFilter={setFilter}
        />
        <Dropdown
          options={channels}
          selection={'select social network...'}
          id={'id3'}
          filter={filter}
          setFilter={setFilter}
        />
        <Dropdown
          options={['top 1%','top 10%','top 20%','bottom 10%']}
          selection={'select reach range...'}
          id={'id4'}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </React.Fragment>
  )
}

export default BreakdownFilter;