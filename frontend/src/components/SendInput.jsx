import React, { useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import {useSelector , useDispatch} from "react-redux"
import axios from "axios"
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
     const [message, setMessage] = useState("")

     const dispatch = useDispatch();
     const {selectedUser} = useSelector(store => store.user);
     const {messages} = useSelector(store => store.message);

     const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message},
        {
          headers:{
            'Content-Type' : 'application/json'
          },
          withCredentials: true
        })
        console.log(res);
        dispatch(setMessages([...messages, res?.data?.sentMessage]))

      } catch (error) {
        console.log(error);
      }
     
      //after sending the message the message input box should become empty
      setMessage(" ")
     }

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
        <div className='w-full relative '>
            <input 
              value = {message}
              onChange = {(e) => setMessage(e.target.value)}
              type = "text"
              placeholder = "Send a message..."
              className='border border-black text-sm rounded-lg block w-full p-2 bg-gray-600 text-black'
            />
            <button type = "submit" className='absolute flex items-center inset-y-0 end-0  pr-3'>
            <BsFillSendFill className='text-black w-6 h-6 '/>
            </button>
        </div>
    </form>
  )
}

export default SendInput