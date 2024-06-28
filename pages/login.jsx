import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {signIn, signOut, useSession} from 'next-auth/react'

export default function Login() {


  const loginGoogle =  () => signIn("google")
  return (
    <div className={`flex justify-start items-center flex-col h-screen `}>
      <div className={`relative w-full h-full`}>
        <video
         src="/share.mp4"
         type="video/mp4"
          loop controls={false}
          muted autoPlay
          className={`w-full h-full object-cover`}
        ></video>
        
        <div className={`absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay`}>
          <div className='p-5'>
            <img src="/logowhite.png" width={130} alt="alt" />
          </div>
          <div className="shadow-2xl">
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={loginGoogle}
              >
                <FcGoogle className="mr-4" /> Sign in with google
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}
