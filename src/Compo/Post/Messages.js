import React, {useState, useEffect} from 'react';
import {IoAddCircle} from 'react-icons/io5'

import Post from './Post';

import Request from '../../Outil/request';
import Header from '../../Outil/header';

import '../../Style/Post/Message/Message.css'

export default function Messages(){

    const [data,setData] = useState([]);

    const getMessages = () => {

        const callBack = (res) => {
            setData(res)
        }

        Request('post/',Header.loged('GET'),callBack)
    }

    useEffect(() =>{
        getMessages();              
    },[])
    const goSend = (e) => {
        window.location = '/send'
    }
    return(
        <div className="AllMsg">
            {data.map(value =>(
                <Post valueMessage={value} key={value.id+"POST"} />
            ))}
            <IoAddCircle className='sendMessage' onClick={goSend}/>
        </div>
    )
    

}