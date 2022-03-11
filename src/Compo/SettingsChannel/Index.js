import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Member from './Member'
import {IoIosCloseCircle} from 'react-icons/io';

import Request from '../../Outil/request'
import Header from '../../Outil/header'


export default function Index(){

    let idChan = useParams().idChan;

    const [channel,setChannel] = useState({});
    const [members,setMembers] = useState([]);

    useEffect(() =>{
        getAllAccess();
        getChannel(idChan);
    },[])
    const getAllAccess = ()=>{
      const callBack = (res) => {
        setMembers(res)
      }
      Request(`acces/${idChan}`,Header.loged('GET'),callBack)
    }
    const getChannel = (idChannel) => {
      const callBack = (res) => {
        setChannel(res);
      }
      Request(`channel/${idChannel}`,Header.loged('GET'),callBack)
    }
    const deletechannel = () => {
      const callBack = (res) => {
        window.location = "/beta";
      }
      Request(`channel/${idChan}`,Header.loged('DELETE',{userID : localStorage.getItem('userID')}),callBack)
    }
    return (
        <div>
            <h2>{channel.name}
            <IoIosCloseCircle className="removeReply" onClick={deletechannel} />
            </h2>
            <h3><a href={"http://localhost:3000/join/"+idChan} >{"http://localhost:3000/join/"+idChan}</a></h3>
            {members.map((member) => (
                <Member acces={member} key={"member"+member.id_user} refreshAcces={getAllAccess} />
            ))}
        </div>
    )
}