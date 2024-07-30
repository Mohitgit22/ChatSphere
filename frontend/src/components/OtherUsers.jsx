import React from 'react'
import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx';
import OtherUser from './OtherUser.jsx'
import {useSelector} from "react-redux"

const OtherUsers = () => {

    useGetOtherUsers();//our custom hook
  
    const {otherUsers} = useSelector(store => store.user)

    if(!otherUsers) //early return in react-when OtherUsers is null  
        return;


  return (
     <div className='overflow-auto flex-1' >

     {
        otherUsers?.map((user) => {
            return (
                <OtherUser key = {user._id} user = {user}/>
            )
        })
     }
 
   </div>
  )
}

export default OtherUsers