import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {axioReq, axiosReq} from '../util/apiCalls'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = ({user}) => {
  const router = useRouter();
  const dir = router.asPath.split('/')
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      setLoading(true)
      if(dir.length > 2){
        const res = await axiosReq.get(`posts?cat=${dir[2]}`)
        setPins(res.data)
      } else {
        const res = await axiosReq.get(`posts`)
        setPins(res.data)
      }
    
      setLoading(false)
    }
    fetchPins()
  }, [])

  if(loading) return <Spinner message="We are adding new ideas to your feed!" />
  
  if(!pins?.length) return <h2>No pins available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} user={user} />}
    </div>
  )
}

export default Feed