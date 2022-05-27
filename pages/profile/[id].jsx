import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import {HiMenu} from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai';
import {axiosReq} from '../../util/apiCalls'
import { getSession } from "next-auth/react";
import MasonryLayout from '../../components/MasonryLayout'
import { AiOutlineLogout } from 'react-icons/ai';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,techonology'

function Profile({user}) {
  const router = useRouter()
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [profile, setProfile] = useState({})
  const [userProfile, setUserProfile] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created');
  
  useEffect(() => {
    const pushUser = async () => {
      if(!user){
        router.push('/login')
      }
      try {
        const res = await axiosReq.get(`user?user=${user.name}`)
        setProfile(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    pushUser()
    
  }, [])

  useEffect(() => {
      const getUserProfile = async () => {
        try {
          const id = location.pathname.split('/')[2]
          const res = await axiosReq.get(`user?id=${id}`)
          setUserProfile(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      getUserProfile()
  }, []) 

  useEffect(() => {
    const getPins = async () => {
      try {
        let res;
        const id = location.pathname.split('/')[2]
        if(text=== 'created'){
           res = await axiosReq.get(`posts?user=${id}&created=${"true"}`)
        } else {
           res = await axiosReq.get(`posts?user=${id}&created=${"false"}`)
        }
        setPins(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getPins()
  }, [text]) 
  

  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=' w-full flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
          <Sidebar user={profile && profile} />
        </div>
        <div className='flex md:hidden flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link passHref href="/">
            <img src="/logo.png" className='w-28' />
          </Link>
          <Link passHref href={`/profile/${profile._id}`}>
          <img src={user.image}  className='w-12 h-12 py-2 mr-2 rounded-full'  />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={profile && profile} closeToggle={setToggleSidebar} />
          </div>
        )}
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' >
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={profile} />
          <div className="relative flex pb-2 h-full justify-center items-center">
              <div className="flex flex-col pb-5">
                  <div className="relative flex flex-col mb-7">
                      <div className="flex flex-col justify-center items-center">
                        <img src={randomImg} className='w-full h-370 2xl:h-510 shadow-lg object-cover' alt="" />
                        <img src={userProfile?.img} className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover' alt="" />
                        <h1 className="font-bold text-3xl text-center mt-3">{userProfile?.username}</h1>
                        <div className="absolute top-0 z-1 right-0 p-2">
                          {profile._id === userProfile?._id && (
                            <button
                            type="button"
                            className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                            onClick={() => {}}
                            >
                            <AiOutlineLogout color="red" fontSize={21}/>
                          </button>
                          )}
                        </div>
                      </div>
                      <div className="text-center mb-7">
                        <button className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`} onClick={(e) =>{ setText('created'); setActiveBtn('created')}}>Created</button>
                        <button className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`} onClick={(e) =>{ setText('saved'); setActiveBtn('saved')}}>Saved</button>
                      </div>
                     {pins?.length ? (
                        <div className="px-2">
                          <MasonryLayout pins={pins} user={profile} />
                        </div>
                     ) : (
                        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                          No pins Found!
                        </div>
                     )}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}

export default Profile;