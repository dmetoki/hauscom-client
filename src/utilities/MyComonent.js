import React, { useState, useEffect, useRef } from 'react';

function MyComponent() {
  // Create refs for the root and target elements
  const rootRef = useRef(null);
  const targetRef = useRef(null);
  const [skip, setSkip] = useState(0)

  // Define the callback for the IntersectionObserver
  const callback = (entries) => {
    // Check if the target element is intersecting with the root element
    if (entries[0].isIntersecting) {
      getData();
    }
  };

  // Create an instance of the IntersectionObserver with the callback and options
  const observer = new IntersectionObserver(callback, {
    root: rootRef.current
  });

  useEffect(() => {
    // Start observing the target element
    observer.observe(targetRef.current);

    // Clean up the IntersectionObserver when the component unmounts
    return () => observer.disconnect();
  }, []); // Empty array ensures that the effect only runs once

  function getData() {
    fetch(`https://get-mentions-a73sknldvq-uc.a.run.app?fromDate=20221101&toDate=20221201&limit=10&skip=${skip}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(
      payload => {
      payload.length > 0
      ? payload.map((item) => {
        let div = document.createElement('div');
        div.innerHTML = `${item.published_at}`;
        rootRef.current.insertBefore(div, rootRef.current.lastChild);
      })
      : []
    })
    .catch(err => console.error(err))

    // Fetch data and update state or props here
    
  }

  return (
    <div>
      <div id="root-element" ref={rootRef} style={{height:'200px',border:'solid 1px red',overflowY:'scroll'}}>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div>test</div>
       <div id="target-element" ref={targetRef}>
        Target element
      </div>
      </div>
      
    </div>
  );
}

export default MyComponent