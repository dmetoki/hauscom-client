import React, { useState, useEffect, useRef } from 'react';
import BreakdownFilter from '../components/BreakdownFilter'
import '../css/Table.css';
import {useMentionsReducer} from '../context/MentionsContext';

function Table({channels}) {
    const {timeFrame, setTimeFrame} = useMentionsReducer();
    const [items, setItems] = useState([]);
    const [advFilter, setAdvFilter] = useState({
      tone: 'all',
      source: []
    });
    const filter = useRef(
      {
        period: {
          from: {
            day: timeFrame?.from?.day,
            month: timeFrame?.from?.month,
            year: timeFrame?.from?.year
          },
          to: {
            day: timeFrame?.to?.day,
            month: timeFrame?.to?.month,
            year: timeFrame?.to?.year
          }
        },
        advanced: {
          tone: advFilter.tone,
          source: advFilter.source
        }
      }
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const observerTarget = useRef(null);
    const skip = useRef(0);

    const f = new Intl.NumberFormat("en-us", {
        notation: 'compact'
    })

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        const url = 'https://get-mentions-a73sknldvq-uc.a.run.app';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from_date: filter.current.period.from ? `${filter.current.period.from.year}${String(filter.current.period.from.month).padStart(2, '0')}${String(filter.current.period.from.day).padStart(2, '0')}` : '20221001',
            to_date: filter.current.period.to ? `${filter.current.period.to.year}${String(filter.current.period.to.month).padStart(2, '0')}${String(filter.current.period.to.day).padStart(2, '0')}` : `${filter.current.period.from.year}${String(filter.current.period.from.month).padStart(2, '0')}${String(filter.current.period.from.day).padStart(2, '0')}`,
            limit: 10,
            skip: skip ? skip.current : 0,
            tone: filter.current.advanced.tone,
            source: filter.current.advanced.source
          })
};
        
        fetch(url, options)
        .then(res => res.json())
        .then(
            payload => {
                setItems(prevItems => [...prevItems, ...payload]);
            }
        )
        .catch(err => setError(err))
        .finally(setIsLoading(false))
    };

    const updatePagination = () => {
      // Read the current value of the ref
      const currentCounterValue = skip.current;
      // Increase it by one
      const newCounterValue = currentCounterValue + 10;
      // Update the ref with the new value
      skip.current = newCounterValue;
    }

    useEffect(() => {
      if(timeFrame.to !== null) {
        setIsLoading(true)
        setItems([])
        skip.current = 0;
        filter.current.period = timeFrame
        filter.current.advanced = advFilter
        fetchData()  
      }
    }, [timeFrame, advFilter]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            updatePagination()
            fetchData()
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

  return (
    <React.Fragment>
      <BreakdownFilter
        channels={channels}
        setAdvFilter={setAdvFilter}
        filter={filter}
      />
        <div className='mentions-table'>
            <div>
              <div className='header_row'>
                <div>Date</div>
                <div>Post</div>
                <div>Author</div>
                <div>Tone</div>
                <div>Social</div>
                <div>Reach</div>
              </div>
                {
                    !isLoading && items.map((item, index) => (
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
            <div className='marker' ref={observerTarget}></div>
        </div>
    </React.Fragment>
  );
}
export default Table;