import React, { useState, useEffect, useRef } from 'react';
import '../css/LazyList.css';
import Dropdown from './Dropdown';

function LazyList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const loaderRef = useRef(null);

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
      <div className='centered-text'>Tags</div>
      <div className='social-generic'></div>
      <div className='tone tone-header'></div>
      <div className='tone chatgpt'></div>
      <div className='check header'></div>
      {records.map((record, index) => (
        <React.Fragment key={index}>
          <div className='fav'></div>          
          <div className='centered-text'>
            <div className='post-title'>
              {record.title}
            </div>
          </div>
          <div className='dd' id={`stakeholder-${record.id}`}>
            <Dropdown
              options={['option 1','option 2','option 3']}
              selection={'option 2'}
              ddid={record.id}
            />
          </div>
          <div className='dd' id={`topic-${record.id}`}><Dropdown options={['option 4','option 5','option 6']} selection={'option 5'}/></div>
          <div className='centered-text'>
            <div className='tag purple'>tag <span>x</span></div>
            <div className='tag orange'>tag <span>x</span></div>
            <div className='tag yellow'>tag <span>x</span></div>
          </div>
          <div className={`social ${record.source_type}`}></div>
          <div className={`tone ${record.tone}`}></div>
          <div className={`tone ${record.tone}`}></div>
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