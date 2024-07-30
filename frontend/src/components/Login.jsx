import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

import { setAuthUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


const Login =() => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const res =await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            });

        //after signing in, the user should be navigated to homepage
           navigate("/");

          //  console.log(res.data);
           dispatch(setAuthUser(res.data))
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setUser({
            username: "",
            password: ""
        })
    }
  return (
    
    <div className="min-w-96 mx-auto">
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
      <h1 className='text-3xl font-bold text-center text-green-500'>Login</h1>
      <form onSubmit={onSubmitHandler} action="">
 

          <div className="relative">
          <label className='label p-2'>
            {/* <span className='text-base label-text'>Username</span> */}
          </label>
          <input
            value = {user.username}
            onChange ={(e) => setUser({...user, username : e.target.value})}
            className='w-full input input-bordered h-10 pl-10'
            type="text"
            placeholder='Username' />
              <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16"
               fill="currentColor"
               className="w-4 h-4 opacity-70 absolute top-1/2 transform  left-3"
               >
             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
             </svg>
             </div>



          <div className="relative">
          <label className='label p-2'>
            {/* <span className='text-base label-text'>Password</span> */}
          </label>
          <input
            value= {user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            className='w-full input input-bordered h-10 pl-10'
            type="password"
            placeholder='Password' />
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 absolute top-1/2 transform  left-3"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
           </div>


       

        <p className='text-center my-3'>Don't have an account? <Link to="/register"   className="text-blue-500 underline cursor-pointer ml-1"> Signup </Link></p>
        <div>
          <button type='submit' className='btn btn-block btn-md mt-2 border border-slate-700'>Login</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login