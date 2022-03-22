import React,{useState, useEffect} from "react"
import {useParams} from 'react-router-dom'

import Request from '../../Outil/request'
import Header from '../../Outil/header'

export default function Index(){

    var idUser = useParams().id;
    const [user,setUser] = useState({});

    useEffect(() =>{
        getUser();
    },[]);

    const getUser = () => {
      const callBack = (res) => {
        setUser(res);
      }

      Request(`auth/${idUser}`,Header.loged('GET'),callBack);
    }


    return (
        <div>
            <p>{user.name}{user.last_name}</p>
            

        </div>
    )
}