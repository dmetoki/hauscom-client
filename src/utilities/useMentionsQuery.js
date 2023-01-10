import React, {useState, useEffect} from 'react'

export default function useMentionsQuery(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [mentions, setMentions] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setMentions([])
    }, [query])
    

    useEffect(() => {
        setLoading(true)
        setError(false)
        fetch(`https://get-mentions-a73sknldvq-uc.a.run.app?limit=10`)
        .then(res => res.json())
        .then(payload => {
            setMentions(prev => {
                return [...new Set([...prev, ...payload.map(item => item.title)])]
            })
            setHasMore(payload.length > 0)
            setLoading(false)
        })
        .catch(err => {console.error(err); setError(true)})
    }, [query, pageNumber])
    
  return {loading, error, mentions, hasMore}
}
