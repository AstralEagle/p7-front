import React,{useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {IoSend,IoHeart,IoCloseCircle} from 'react-icons/io5'

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

    const deleteUser = (e) => {
      const callBack = (res) => {
        localStorage.removeItem('userID');
        localStorage.removeItem('token');
        window.location = '/';
      }
      Request(`auth/${idUser}`,Header.loged('DELETE'),callBack)
    }
    const switchPost = (e) => {
      setView(false);
    }
    const switchLike = (e) => 
    setView(true);


    return (
        <div>
            <p>{user.name}{user.last_name}{localStorage.getItem('userID') === idUser && (<IoCloseCircle onClick={deleteUser} />)}</p>
            <p>Inscrit depuis {user.date[0]}/{user.date[2]}/{user.date[1]}</p>

            <div>
              <div>
                <p onClick={switchPost}><IoSend />{user.nbrPost}</p>
                <p onClick={switchLike}><IoHeart />{user.nbrLike}</p>
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