import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'
import { useRouter } from 'next/router'

const Navbar = ({searchTerm, setSearchTerm, user}) => {

  const router = useRouter();

  if(!user) return null

  const handleSubmit = async () => {
    router.push({
      pathname: '/search',
      query: {
          searchTerm
      }
  })
  }

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1 cursor-pointer" onClick={handleSubmit} />
        <input 
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        value={searchTerm}
        onFocus={() => {}}
        className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <a  href={`profile/${user._id}`} className="hidden md:block cursor-pointer rounded-full">
          <img src={user.img} className="w-14 h-12 rounded-lg" alt="" />
        </a>
        <a  href={`create`} className="bg-black text-white rounded-full w-12 h-12 md:w-14 flex justify-center items-center">
          <IoMdAdd />
        </a>
      </div>
    </div>
  )
}

export default Navbar