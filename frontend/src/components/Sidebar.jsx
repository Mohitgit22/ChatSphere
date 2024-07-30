import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import OtherUsers from './OtherUsers.jsx';
import { BiLogOut } from "react-icons/bi";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"
import { setAuthUser, setOtherUsers } from '../redux/userSlice.js';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const {otherUsers} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      console.log(res);
    
      navigate("/login");
      toast.success(res.data.message);

      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversationUser){
        dispatch(setOtherUsers([conversationUser]));
    }else{
        toast.error("User not found!");
    }
}
  return (
    <div className='border-r border-gray-500 p-4 flex flex-col'>
    <form onSubmit = {searchSubmitHandler} action="" className='flex items-center gap-2'>
        <input
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}
            className='input input-bordered rounded-md bg-gray-900' 
            type="text"
            placeholder='Search...'
        />
        <button type='submit' className='btn border-none rounded-full bg-green-500 text-white '>

            <IoMdSearch  className='w-6 h-6 outline-none'/>
        </button>
    </form>
    <div className="divider px-3"></div> 
    <OtherUsers /> 
    <div className='mt-2 '>
        <button  onClick={logoutHandler} className='btn btn-sm'>
        <BiLogOut className='w-6 h-6 outline-none text-white' />
        </button>
    </div>
    </div>
  )
}

export default Sidebar
