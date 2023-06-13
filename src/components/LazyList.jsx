import React, { useState, useEffect, useRef } from 'react';
import '../css/LazyList.css';
import Dropdown from './Dropdown';
import { ACTIONS } from '../reducers/ACTIONS';
import { useMentionsReducer } from '../context/MentionsContext';

function LazyList() {
  const {state, dispatch} = useMentionsReducer();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const loaderRef = useRef(null);

  const stakeholders = ["Autoridad","Empresa","Periodista","Profesional","Usuario"];
  const dimensions = ["Comercial","Institucional","Laboral"];
  const tones = ["positive","neutral","negative"];

  // setup lazy loading
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef && loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  // fetch mentions
  useEffect(() => {
    if (!hasLoaded) {
      // Only fetch once on initial load
      setHasLoaded(true);
      setPage(0);
    } else {
      // Fetch additional data when page changes
      fetch(`https://get-mentions-a73sknldvq-uc.a.run.app?fromDate=20221101&toDate=20221201&limit=10&skip=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setRecords(prevRecords => [...prevRecords, ...data]);          
        })
        .catch(error => console.error(error));
    }
  }, [page, hasLoaded]);
  
  // feed reducer every time new mentions are fetched
  useEffect(() => {
    dispatch({type: ACTIONS.GET_MENTIONS, payload: records})
  }, [records])
  

  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 10);
    }
  };

  return (
    <React.Fragment>
    <div className='lazy-list'>
      <div className='fav header'></div>      
      <div className='centered-text'>Header title</div>
      <div className='centered-text'>Stakeholder</div>
      <div className='centered-text'>Topic</div>
      <div className='tone tone-header'></div>
      <div className='tone chatgpt'></div>
      <div className='social-generic'></div>
      <div className='centered-text'>Tags</div>
      <div className='check header'></div>
      {state.map((record, index) => (
        <React.Fragment key={index}>
          <div className={`fav ${record.favorite ? 'selected' : ''}`} onClick={(e) => (dispatch({type: ACTIONS.SET_FAVORITE, id: record.id, favorite: record.favorite}))}></div>          
          <div className='centered-text'>
            <div className='post-title'>
              {record.title}
            </div>
          </div>
          <div>
            <Dropdown
              options={stakeholders.filter(item => item !== record.stakeholder)}
              selection={record.stakeholder}
              id={record.id}
              entity={'stakeholder'}
            />
          </div>
          <div>
            <Dropdown
              options={dimensions.filter(item => item !== record.dimension)}
              selection={record.dimension}
              id={record.id}
              entity={'dimension'}
            />
          </div>
          <div>
            <Dropdown
              options={tones.filter(item => item !== record.tone)}
              selection={record.tone}
              id={record.id}
              entity={'tone'}
              type={'icons'}
            />
          </div>
          <div className={`tone ${record.tone}`}></div>
          <div className={`social ${record.source_type}`}></div>
          <div className='centered-text'>
            <div className='tag purple'>tag <span>x</span></div>
            <div className='tag orange'>tag <span>x</span></div>
            <div className='tag yellow'>tag <span>x</span></div>
          </div>
          <div className='check'></div>
        </React.Fragment>
      ))}
      <div className='lds-center'>
        <div ref={loaderRef} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default LazyList;