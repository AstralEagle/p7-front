import React,{useState,useEffect} from 'react';
import { IoLogOutOutline , IoStarOutline } from 'react-icons/io5';

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import Logo from '../../IMG/icon-left-font-monochrome-black.png';

import '../../Style/Banner.css';



export default function Banner(){

  const [myUser,setMyUser] = useState({});
  

  useEffect(() => {
    getUser()
  },[])

  const getUser = () => {
    const callBack = (res) => {
      setMyUser(res);
    }
    Request(`auth/`,Header.loged('GET'),callBack)
  }
  const logOut = (event) => {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    window.location = "/";
  }
  const goAdmin = (e) => {
    window.location = '/admin';
  }
  const goUser = (e) => {
    window.location = '/user/'+localStorage.getItem('userID');
  }
  const onIcon = (e) => {
      window.location = "/";
  }
  const goPost = (e) => {
    window.location = "/post";
  }
  const goMessage = (e) => {
    window.location = "/message";
  }

  return (
    <div className='mainBanner'>
      <div className="banner">
        <img src={Logo} alt="Logo" onClick={onIcon} />
        <div>
          <ul>
            <li onClick={goUser}>{myUser.name + " " + myUser.last_name}</li>
            {myUser.op && (
            <li>
              <IoStarOutline onClick={goAdmin} />
            </li>
              )}
            <li>
              <IoLogOutOutline onClick={logOut} />
            </li>
          </ul>
        </div>
      </div>
      <div className='menuBarre'>
        <p onClick={goPost}>Post</p>
        <p onClick={goMessage}>Message</p>
      </div>
    </div>
  );
}
