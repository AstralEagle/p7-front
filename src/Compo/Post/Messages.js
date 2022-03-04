import React, {useState, useEffect} from 'react';
import Post from './Post';
import '../../Style/Post/Message/Message.css'

import Request from '../../Outil/request';
import Header from '../../Outil/header';


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
    return(
        <div className="AllMsg">
            {data.map(value =>(
                <Post valueMessage={value} key={value.id+"POST"} />
            ))}
        </div>
    )
    

}