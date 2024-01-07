import React, { useState, useEffect, useRef } from 'react';
import BreakdownFilter from '../components/BreakdownFilter'
import '../css/Table.css';
import {useMentionsReducer} from '../context/MentionsContext';

function Table({channels}) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [skip, setSkip] = useState({value: 0});
    const observerTarget = useRef(null);
    const initialLoad = useRef(true);
    const {timeFrame, setTimeFrame} = useMentionsReducer();
    const [filter, setFilter] = useState({
        tone: null,
        channel: 'test'
    });

    const f = new Intl.NumberFormat("en-us", {
        notation: 'compact'
    })

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        fetch(
            `https://get-mentions-a73sknldvq-uc.a.run.app?from_date=${timeFrame.from ? `${timeFrame.from.year}${String(timeFrame.from.month).padStart(2, '0')}${String(timeFrame.from.day).padStart(2, '0')}` : '20221001'}&to_date=${timeFrame.to ? `${timeFrame.to.year}${String(timeFrame.to.month).padStart(2, '0')}${String(timeFrame.to.day).padStart(2, '0')}` : `${timeFrame.from.year}${String(timeFrame.from.month).padStart(2, '0')}${String(timeFrame.from.day).padStart(2, '0')}`}&limit=10&skip=${skip ? skip?.value : 0}&filter=${filter.tone}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            payload => {
                setItems(prevItems => [...prevItems, ...payload]);
            }
        )
        .catch(err => setError(err))
        .finally(setIsLoading(false))
    };

    useEffect(() => {
      fetchData()
      return () => {
        initialLoad.current = false
      }
    }, [skip])

    useEffect(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setSkip(
              prevSkip => {return {...prevSkip, value: prevSkip.value + 10};
            })
          }
        },
        {
          threshold: 1,
          rootMargin: "-70px 0px 0px 0px"
        }
      );
    
      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }
      
      return () => {
        if (observerTarget.current) {
          observer.unobserve(observerTarget.current);
        }
      };
    }, [observerTarget]);

    useEffect(() => {
      if(timeFrame.to !== null && !initialLoad.current) {
        setItems([])
        setSkip(prevSkip => {return {...prevSkip, value: 0}})
      }
    }, [timeFrame]);

    useEffect(() => {
      if(filter !== null && !initialLoad.current) {
        setItems([])
        setSkip(prevSkip => {return {...prevSkip, value: 0}})
      }
    }, [filter]);

  return (
    <React.Fragment>
      <BreakdownFilter
        channels={channels}
        filter={filter}
        setFilter={setFilter}
      />
        <div className='mentions-table'>
            <div>
                {
                    items.map((item, index) => (
                        <div className='row' key={index}>
                            <div>{`${new Date(item.published_at).toLocaleDateString()}`}</div>
                            <div>
                                <div className='wrapper'>{item.title}</div>
                            </div>
                            <div>
                                <div className='wrapper'>
                                    <a href={item.url}>{item.source_name}</a>
                                </div>
                            </div>
                            <div className={`tone ${item.tone}`}></div>
                            <div className={`social ${item.source_type}`}></div>
                            <div>{item.reach !== null ? f.format(item.reach) : '-'}</div>
                        </div>
                    ))
                }
            </div>
            {isLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
            {error && <p>Error: {error.message}</p>}
            <div ref={observerTarget}></div>
        </div>
    </React.Fragment>
  );
}
export default Table;