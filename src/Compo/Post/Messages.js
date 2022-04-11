import React, {useState, useEffect, useRef} from 'react';
import {IoAddCircle} from 'react-icons/io5'

import Post from './Post';

import Request from '../../Outil/request';
import Header from '../../Outil/header';

import '../../Style/Post/Message/Message.css'

export default function Messages(){

    const [data,setData] = useState([]);

    const refViewPost = useRef();

    const getMessages = () => {

        const callBack = (res) => {
            setData(res)
        }

        Request('post/',Header.loged('GET'),callBack)
    }

    const resizeView = () => {
        refViewPost.current.style.height = parseInt(window.innerHeight) - 129 + "px";
  
      }

    useEffect(() =>{
        getMessages(); 
        resizeView();
        window.addEventListener('resize', resizeView)             
    },[])
    const goSend = (e) => {
        window.location = '/send'
    }
    return(
        <div className="AllMsg" ref={refViewPost}>
            {data.map(value =>(
                <Post valueMessage={value} key={value.id+"POST"} />
            ))}
            <IoAddCircle className='sendMessage' onClick={goSend}/>
        </div>
    )
    

}