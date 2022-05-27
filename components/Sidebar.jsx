import React from 'react'
import {NavLink, navLink} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import Link from 'next/link';
import {categories} from '../util/data'
import { useRouter } from 'next/router'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';


const Sidebar = ({user, closeToggle}) => {
    const router = useRouter();
    const dir = router.asPath.split('/')

    const handleCloseSidebar = () => {
        if(closeToggle) closeToggle(false)
    }
    
  return (
    <div className='flex flex-col justify-between h-full bg-white overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className="flex flex-col">
            <a className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}  href={`/`}>
                <img src="/logo.png" alt="logo" className='w-full'  />
            </a>
            <div className="flex flex-col gap-5">
                <a  href="/" className={dir.length === 2 ? isActiveStyle : isNotActiveStyle}    onClick={handleCloseSidebar}>                    
                    <RiHomeFill />
                    Home
                </a>
                <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
                {categories.slice(0, categories.length - 1).map((category) => (
                    <a className={dir.length > 2 && dir[2] === category.name ? isActiveStyle : isNotActiveStyle}  href={`/category/${category.name}`} key={category.name}>
                        <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt="" />
                        {category.name}
                    </a>
                ))}
            </div>
        </div>
        {user && (
            <a href={`profile/${user._id}`} className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={closeToggle}>
                <img src={user.img} alt="user-profile" className='w-10 h-10 rounded-full' />
                <p>{user.username}</p>
            </a>
        )}
    </div>
  )
}

export default Sidebar