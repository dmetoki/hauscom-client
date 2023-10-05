import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../css/Table.css';

function Table() {
  const root = useRef(null);
  const target = useRef(null);
  const observer = useRef(null);
  const [skip, setSkip] = useState(-10)
  const [temp, setTemp] = useState([])
  const [didMount, setDidMount] = useState(false);

  const f = new Intl.NumberFormat("en-us", {
    notation: 'compact'
  })

  useEffect(() => {
    if(!didMount) {
      setDidMount(true);
      return;
    }
    fetch(`https://get-mentions-a73sknldvq-uc.a.run.app?fromDate=20221101&toDate=20221201&limit=-${skip < 0 ? 0 : skip}&skip=${skip < 0 ? 0 : skip}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(payload => {setTemp(payload)})
    .catch(err => console.error(err))
  }, [skip]);

  useEffect(() => {
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        setSkip(prevSkip => prevSkip + 10)
      }
    };
    observer.current = new IntersectionObserver(callback, {
      root: root.current,
      rootMargin: "-100px 0px 0px 0px"
    });
    if (target.current) {
        observer.current.observe(target.current);
    }
    return () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    }
  }, [target.current]);

  useEffect(() => {
    const parent = document.getElementById('root-element');
    const lastChild = parent.lastChild;

    temp.map(item => {
      let date = document.createElement('div');
      date.innerHTML = `${new Date(item.published_at).toLocaleDateString()}`
      parent.insertBefore(date, lastChild);
      let post = document.createElement('div');
      post.innerHTML = `<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.title}</div>`
      parent.insertBefore(post, lastChild);
      let source = document.createElement('div');
      source.innerHTML = `<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><a href=${item.url} target="_blank">${item.source_name}</a></div>`
      parent.insertBefore(source, lastChild);
      let tone = document.createElement('div');
      tone.className = (`tone ${item.tone}`);
      parent.insertBefore(tone, lastChild);
      let social = document.createElement('div');
      social.className = (`social ${item.source_type}`);
      parent.insertBefore(social, lastChild);
      let reach = document.createElement('div');
      reach.innerHTML = `${item.reach !== null ? f.format(item.reach) : '-'}`
      parent.insertBefore(reach, lastChild);
    })
    if(!temp.length > 0 && skip > 0) {
      target.current.remove()
    }
  }, [temp]);

  return (
    <React.Fragment>
      <div id="root-element" className='mentions-table' ref={root}>
        <div><b>DATE</b></div>
        <div><b>POST</b></div>
        <div><b>SOURCE</b></div>
        <div className='icons-header'><b>TONE</b></div>
        <div className='icons-header'><b>SOCIAL</b></div>
        <div><b>REACH</b></div>
        <div ref={target}>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Table;