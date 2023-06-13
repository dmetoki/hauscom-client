import React, { useState, useEffect, useRef } from 'react';
import '../css/Inbox.css';
import Dropdown from './Dropdown';
import { ACTIONS } from '../reducers/ACTIONS';
import { useMentionsReducer } from '../context/MentionsContext';

function Inbox() {
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
      <div className='inbox lazy-list'>
        <div className='list'>
        {state.map((record, index) => (
        <React.Fragment key={index}>
          <div className='item'>
            <div className='post'>
              <div className={`social ${record.source_type}`}></div>
              <div className='post-title'>
                <h1>
                  <a href={`${record.url}`} target='_blank'>
                    {
                      record.source_type == 'twitter' ||
                      record.source_type == 'facebook'
                        ? `@${record.source_name}`
                        : record.title
                    }
                  </a>
                </h1>
                <p>{record.description}</p>
              </div>
            </div>
            <div className='lvl1'>
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
              <div>
              <div className={`tone ${record.tone}`}></div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className='lds-center'>
        <div ref={loaderRef} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      </div>
      <div className='preview'>
        <div className='preview-top'>top bar</div>
        <div className='preview-content'>
          <div className='preview-post'>
            <div className='image'>
              <img src='./posts/sample-post.png' width={'423px'} height={'423px'} />
            </div>
            <div className='body'>
              <div className='user'>
                <img src='./posts/sample-avatar.jpeg' width={'30px'} height={'30px'} className='avatar' />
                <span>direito.unifacemp</span>
              </div>
              <div className='text'>
                Se liga nessa super oportunidade para você avançar na sua graduação. Em parceria com a Unifacemp, o programa Santander Graduação vai ofertar 04 bolsas de R$ 300 por mês durante um ano. Alunos novos e veteranos podem participar. Para concorrer, basta fazer a inscrição até 16/05 no link bit.ly/santanderunifacemp ou usando o QR Code. Participe! #unifacemp #santander #bolsa #auxílio #graduação
              </div>
            </div>
            {/* <div className='header'>
              <img src='./posts/sample-avatar.jpeg' width={'30px'} height={'30px'} className='avatar' />
            </div>
            <div className='image'>
              <img src='./posts/sample-post.png' width={'423px'} height={'423px'} />
            </div>
            <div className='body'>
            Se liga nessa super oportunidade para você avançar na sua graduação. Em parceria com a Unifacemp, o programa Santander Graduação vai ofertar 04 bolsas de R$ 300 por mês durante um ano. Alunos novos e veteranos podem participar. Para concorrer, basta fazer a inscrição até 16/05 no link bit.ly/santanderunifacemp ou usando o QR Code. Participe! #unifacemp #santander #bolsa #auxílio #graduação
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Inbox;