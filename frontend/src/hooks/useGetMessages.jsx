import  { useEffect } from 'react'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {

    const {selectedUser} = useSelector(store => store.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`);
                // console.log(res);

                //store the messages in the message slice
                dispatch(setMessages(res.data.messages))
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 404) {
                    // If 404, clear the messages
                    dispatch(setMessages([]));
                } else {
                    console.log(error);
                }
            }  
        }

        fetchMessages();

        }
    ,[selectedUser]);  
}

export default useGetMessages