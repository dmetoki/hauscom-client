import React, {useState, useEffect} from 'react'

function MentionsTable() {
  const [mentions, setMentions] = useState([])
  
  useEffect(() => {
    fetch('https://get-mentions-a73sknldvq-uc.a.run.app?limit=20&skip=20',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
          // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}`
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
          </div>
      </React.Fragment>
  )
}

export default MentionsTable;