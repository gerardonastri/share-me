import React, {useState} from 'react'
import Navbar from './Navbar'
import Feed from './Feed'
import Search from './Search'


const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  

  return (
    <div className='px-2 md:px-5'>
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      </div>
      <div className="h-full">
        <Feed user={user}/>
      </div>
    </div>
  )
}

export default Pins