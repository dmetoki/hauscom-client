import React, {useRef, useState, useEffect, useLayoutEffect} from 'react'

function MentionsTable() {
  const [mentions, setMentions] = useState([]);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [isLoading, setisLoading] = useState(false)
  const f = new Intl.NumberFormat("en-us", {
    notation: 'compact'
  })

//   useEffect(() => {
//     const callback = (entries) => {
//       if(entries[0].isIntersecting) {
//         console.log('triggered')
//         getData()
//       }
//     };

//     const observer = new IntersectionObserver(callback, {
//       root: root.current
//     })
//     observer.observe(target.current)
//   }, [])
  
//   const target = useRef(null);
//   const root = useRef(null);

//   function getData() {
//     fetch(`https://get-mentions-a73sknldvq-uc.a.run.app?limit=${limit}&skip=${skip}`,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(res => res.json())
//     .then(
//       payload => {
//       payload.length > 0
//       ? payload.map((item) => {
//         let div = document.createElement('div');
//         div.innerHTML = `${item.id}`;
//         root.current.insertBefore(div, root.current.lastChild);
//       })
//       : []
//     })
//     .catch(err => console.error(err))
// }
  
  useEffect(() => {
    fetch(`https://get-mentions-a73sknldvq-uc.a.run.app?fromDate=20221101&toDate=20221201&limit=100`,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
    .then(res => res.json())
    .then(payload => {setMentions(payload)})
    .catch(err => console.error(err))

  }, [])

  return (
      <React.Fragment>
        <div className='mentions-table' id='scrollable-div'>
        <div>Date</div>
        <div>Post</div>
        <div>Source</div>
        <div>Tone</div>
        <div>Social</div>
        <div>Reach</div>
        {
          mentions.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                <div><div className='ellipsis-container'>{item.title}</div></div>
                <div><a href={item.source_url} target="_blank">{item.source_name}</a></div>
                <div className={`tone ${item.tone}`}></div>
                <div className={`social ${item.source_type}`}></div>
                <div>{item.reach !== null ? item.reach : '-'}</div>
              </React.Fragment>
            )

            })}
        {/* <div style={{border:'solid 1px red',overflowY:'scroll'}} ref={root}>
          <div>test 1</div>
          <div>test 2</div>
          <div>test 3</div>
          <div>test 4</div>
          <div>test 5</div>
          <div>test 6</div>
          <div>test 7</div>
          <div>test 8</div>
          <div>test 9</div>
          <div>test 10</div>
          <div>test 11</div>
          <div>test 12</div>
          <div>test 13</div>
          <div>test 14</div>
          <div>test 15</div>
          <div>test 16</div>
          <div ref={target} style={{border:'solid 1px yellow',color:'yellow'}}>Loading...</div>
        </div> */}
        </div>
      </React.Fragment>
  )
}

export default MentionsTable;