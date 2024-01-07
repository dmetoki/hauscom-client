import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

function BreakdownFilter({channels, sources}) {
  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 10);
    }
  };

  return (
    <React.Fragment>
      <div className='breakdown_filter'>
        <Dropdown
          options={['positive','negative','neutral']}
          selection={'select tone...'}
          id={'id2'}
        />
        <Dropdown
          options={channels}
          selection={'select social network...'}
          id={'id3'}
        />
        <Dropdown
          options={['top 1%','top 10%','top 20%','bottom 10%']}
          selection={'select reach range...'}
          id={'id4'}
        />
      </div>
    </React.Fragment>
  )
}

export default BreakdownFilter;