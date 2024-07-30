import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setSelectedUser } from '../redux/userSlice.js';

const OtherUser = (props) => {
  const user = props.user

  const dispatch = useDispatch();

  const {selectedUser, onlineUsers} = useSelector(store => store.user);

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
      // console.log(user);
      dispatch(setSelectedUser(user));
  }

  return (
    <>
    <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-green-500 ' : 'text-white'} flex items-center justify-between gap-4 text-white
     hover:bg-green-600 rounded-xl p-1 cursor-pointer transition duration-300 ease-in-out`}>
              <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-12 rounded-full'>
                    <img src={user?.profilePhoto} alt='User-profile' />
                </div>
              </div>
        

        <div className=' flex flex-col flex-1'>
                <div className='flex justify-between gap-2  '>
                    <p> {user?.fullName}</p>
                </div>
         </div>
    </div>
    <div className='divider'></div>
</>
  )
}

export default OtherUser