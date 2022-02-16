import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Member from './Member'
import {IoIosCloseCircle} from 'react-icons/io';


export default function Index(){

    let idChan = useParams().idChan;

    const [channel,setChannel] = useState({});
    const [members,setMembers] = useState([]);

    useEffect(() =>{
        getAllAccess();
        getChannel(idChan);
    },[])
    const getAllAccess = ()=>{
      const header = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("token") +
            " " +
            localStorage.getItem("userID"),
        },
      };
      fetch(process.env.REACT_APP_API_URL + "acces/" + idChan, header)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.error) {
            console.error(res.error);
            window.location = "/beta";
          } else {
            console.log(res);
            setMembers(res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    const getChannel = (idChannel) => {
        const header = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                localStorage.getItem("token") +
                " " +
                localStorage.getItem("userID"),
            },
          };
          fetch(process.env.REACT_APP_API_URL + "channel/"+idChannel, header)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
                setChannel(res);
            })
            .catch((err) => {
              console.error(err);
            });
    }
    const deletechannel = () => {
      const header = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("token") +
            " " +
            localStorage.getItem("userID"),
        },
      };
      fetch(process.env.REACT_APP_API_URL + "channel/"+idChan, header)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          window.location = "/beta";
        })
        .catch((err) => {
          console.error(err);
        });
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