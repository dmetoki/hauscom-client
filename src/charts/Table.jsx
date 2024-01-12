import React, { useState, useEffect, useRef } from 'react';
import BreakdownFilter from '../components/BreakdownFilter'
import '../css/Table.css';
import {useMentionsReducer} from '../context/MentionsContext';

function Table({channels}) {
    const {timeFrame, setTimeFrame} = useMentionsReducer();
        const tf = useRef({
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
    });
    const [items, setItems] = useState([]);
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
            from_date: tf.current.from ? `${tf.current.from.year}${String(tf.current.from.month).padStart(2, '0')}${String(tf.current.from.day).padStart(2, '0')}` : '20221001',
            to_date: tf.current.to ? `${tf.current.to.year}${String(tf.current.to.month).padStart(2, '0')}${String(tf.current.to.day).padStart(2, '0')}` : `${tf.current.from.year}${String(tf.current.from.month).padStart(2, '0')}${String(tf.current.from.day).padStart(2, '0')}`,
            limit: 10,
            skip: skip ? skip.current : 0
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
        setItems([])
        skip.current = 0;
        tf.current = timeFrame
        fetchData()  
      }
    }, [timeFrame]);

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
            <div className='marker' ref={observerTarget}></div>
        </div>
    </React.Fragment>
  );
}
export default Table;