import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { useRouter } from 'next/router'
import {axiosReq} from '../util/apiCalls'
import axios from 'axios'

const Pin = ({pin, user}) => {
  const router = useRouter();
  const [postHovered, setPostHovered] = useState(false);
  const [author, setAuthor] = useState({});

  let alreadySaved = pin.save.filter((item) => item === user?.name);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  console.log(pin.author);
  
  useEffect(() => {
      const getAuthor = async () => {
        try {
          const res = await axiosReq.get(`author?id=${pin.author}`)
          setAuthor(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      getAuthor()
  }, [])

  const savePin = async () => {
    if(alreadySaved.length === 0){
      try {
        const res = await axiosReq.post(`pin?id=${pin._id}`, {
          user: user.name
        })
        router.reload(window.location.pathname)
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const deletePin = async () => {
      try {
        const res = await axiosReq.delete(`pin?id=${pin._id}`)
        router.reload(window.location.pathname)
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className='m-2'>
      <div className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out' onMouseEnter={() => setPostHovered(true)} onMouseLeave={() => setPostHovered(false)} onClick={() => router.push(`/detail/${pin._id}`)}>
        <img className='rounded-lg w-full' src={pin.image} alt="" />
        {postHovered && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style={{height: '100%'}}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${pin.image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                  </a>
              </div>
              {alreadySaved.length !== 0 ? (
                <button className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {pin.save.length} Saved
                </button>
              ) : (
                <button className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none' onClick={(e) => {e.stopPropagation(); savePin()}}>
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {pin.destination && (
                <a href={pin.destination} target="_blank" rel='noreferrer' className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 20 ?  pin.destination.slice(8, 20) : pin.destination.slice(8)}
                </a>
              )}
              {pin.author === user.name && (
                <button onClick={(e) => {e.stopPropagation(); deletePin()}} className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold  text-base rounded-3xl hover:shadow-md outline-none'>
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <a href={`profile/${author._id}`} className="flex gap-2 mt-2 items-center">
          <img src={author.img} className='w-8 h-8 rounded-full object-cover' alt="" />      
          <p className='font-semibold capitalize'>{author.username}</p>
      </a>  
    </div>
  )
}

export default Pin