import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { useRouter } from 'next/router'
import {axiosReq} from '../util/apiCalls'
import axios from 'axios'

const PinDetail = ({pin, user}) => {
  const router = useRouter();
  const [postHovered, setPostHovered] = useState(false);
  const [author, setAuthor] = useState({});
  const [comment, setComment] = useState("");

  let alreadySaved = pin.save.filter((item) => item === user?._id);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  
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

  const handleComment = async () => {
      try {
          const res = await axiosReq.put(`pin?id=${pin._id}`, {
            text: comment,
            username: user.username,
            img: user.img
          })
          router.reload(window.location.pathname)
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div className='flex xl-flex-row flex-col m-auto bg-white' style={{maxWidth: '1500px', borderRadius: "32px"}}>
        <div className="flex justify-center items-center md:items-start flex-initial">
            <img src={pin.image} alt="pin image" className='rounded-t-3xl rounded-b-lg' />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
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
                <a href={`${pin.destination}`} target="_blank">{pin.destination?.length > 20 ?  pin.destination.slice(8, 20) : pin.destination.slice(8)}</a>
            </div>
            <div>
                <h1 className='text-4xl font-bold break-words mt-3'>
                    {pin.title}
                </h1>
                <p className='mt-3'>{pin.about}</p>
            </div>
            <a href={`profile/${author._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                <img src={author.img} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{author.username}</p>
            </a>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
                {pin.comments?.length > 0 && pin.comments.map((comment, i) => (
                    <div className="flex gap-2 mt-5 items-center bg-white ronded-lg" key={i}>
                        <img src={comment.img} className="w-10 h-10 rounded-full cursor-pointer" alt="" />
                        <div className="flex flex-col">
                            <p className="font-bold">{comment.username}</p>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
                <div className="flex flex-wrap mt-6 gap-3">
                    <a href={`https://share-me-five.vercel.app/profile/${user._id}`} >
                        <img src={user.img} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                    </a>
                    <input type="text" name="" className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none' onClick={handleComment}>Comment</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PinDetail