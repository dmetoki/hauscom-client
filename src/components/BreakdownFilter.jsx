import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import { ACTIONS } from '../reducers/ACTIONS';
import { useMentionsReducer } from '../context/MentionsContext';

function BreakdownFilter() {
  
  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 10);
    }
  };


  return (
    <React.Fragment>
            <Dropdown
                options={['news.eseuro.com','pharmaboardroom.com','...']}
                selection={'source'}
                id={'id1'}
                entity={'stakeholder'}
            />
            <Dropdown
                options={['positive','negative','neutral']}
                selection={'tone'}
                id={'id2'}
                entity={'stakeholder'}
            />
            <Dropdown
                options={['facebook','twitter','...']}
                selection={'social'}
                id={'id3'}
                entity={'stakeholder'}
            />
            <Dropdown
                options={['top 1%','top 10%','top 20%','bottom 10%']}
                selection={'reach'}
                id={'id4'}
                entity={'stakeholder'}
            />
    </React.Fragment>
  )
}

export default BreakdownFilter;