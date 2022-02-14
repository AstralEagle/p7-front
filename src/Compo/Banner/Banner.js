import React,{useState,useEffect} from 'react';
import Logo from '../../IMG/icon-left-font-monochrome-black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Style/Banner.css';



export default function Banner(){

  const [myUser,setMyUser] = useState({});
  

  useEffect(() => {
    getUser(localStorage.getItem('userID'))
  },[])

  const getUser = () => {
    var header = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          localStorage.getItem("token") +
          " " +
          localStorage.getItem("userID"),
      }
    };
    fetch(process.env.REACT_APP_API_URL+"auth/"+localStorage.getItem('userID'),header)
    .then(res => {return res.json()})
    .then(res => {
      if(res.error){
        console.error(res.error);
      }
      else{
        setMyUser(res);
      }
    }
    )
    .catch(err => {console.error(err)})
  }
  const logOut = (event) => {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    window.location = "/";
  }
  const onBeta = (e) => {
      window.location = "/beta";
  }

  return (
    <div className="banner">
      <img src={Logo} alt="Logo" onClick={onBeta}/>
      <div>
        <ul>
          <li>
            {myUser.name+" "+ myUser.last_name}
          </li>
          <li>
            <FontAwesomeIcon icon='sign-out-alt' onClick={logOut} size="2x" />
          </li>
        </ul>
      </div>
    </div>
  );
}
