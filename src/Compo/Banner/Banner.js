import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    Request(`auth/${localStorage.getItem('userID')}`,Header.loged('GET'),callBack)
  }
  const logOut = (event) => {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    window.location = "/";
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
            <li>
              <FontAwesomeIcon icon="sign-out-alt" onClick={logOut} size="2x" />
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
