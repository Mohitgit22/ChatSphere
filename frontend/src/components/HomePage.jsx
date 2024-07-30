import React from 'react'
import MessageContainer from './MessageContainer.jsx'
import Sidebar from './Sidebar.jsx'

function HomePage() {
  return (
    <div className='flex sm:h-[450px] md:h-[750px] rounded-lg  overflow-hidden  bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-10  '>
    <Sidebar />
    <MessageContainer />
    </div>
  )
}

export default HomePage