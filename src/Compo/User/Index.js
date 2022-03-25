import React,{useState, useEffect} from "react"
import {useParams} from 'react-router-dom'

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import ListLikes from './ListLike'
import ListPost from './ListPost'

export default function Index(){

    var idUser = useParams().id;
    const [user,setUser] = useState({});
    const [viewBox, setView] = useState(false);

    const getUser = () => {
      const callBack = (res) => {
        setUser(res);
      }

      Request(`auth/${idUser}`,Header.loged('GET'),callBack);
    }
    
    useEffect(() =>{
        getUser();
    },[]);

    const switchPost = (e) => {
      setView(false);
    }
    const switchLike = (e) => 
    setView(true);


    return (
        <div>
            <p>{user.name}{user.last_name}</p>
            <div>
              <div>
                <p onClick={switchPost}>Posts</p>
                <p onClick={switchLike}>Likes</p>
                </div>
                {viewBox ?
                (
                  <ListLikes idUser={idUser}/>
                  ):(
                  <ListPost idUser={idUser}/>
                )}
            </div>

        </div>
    )
}