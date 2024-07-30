import React from 'react'
import Messages from './Messages.jsx'
import SendInput from './SendInput.jsx'
import { useSelector } from "react-redux"
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

function MessageContainer() {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // },[])

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {
        selectedUser !== null ? (
          <div className='md:min-w-[750px] flex flex-col '>
            <div className='flex items-center justify-between gap-4 text-white font-bold bg-gray-900 rounded-md p-1 cursor-pointer '>
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-12 rounded-full'>
                  <img src={selectedUser?.profilePhoto} alt='User-profile' />
                </div>
              </div>


              <div className=' flex flex-col flex-1'>
                <div className='flex justify-between gap-2 '>
                  <p> {selectedUser?.fullName}</p>
                </div>
              </div>
            </div>
            <Messages />
            <SendInput />
          </div>
        ) : (
          <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
            <div className='flex mt-4 gap-4 items-center'>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>
            <HiOutlineChatBubbleLeftRight className='text-white h-32 w-32'/>
            </div>


          </div>
        )
      }
    </>
  )
}


export default MessageContainer