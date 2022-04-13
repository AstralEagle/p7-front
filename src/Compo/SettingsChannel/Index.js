import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Member from "./Member";
import { IoIosCloseCircle } from "react-icons/io";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import "../../Style/Message/SettingChannel/Index.css";

export default function Index() {
  let idChan = useParams().idChan;

  const [channel, setChannel] = useState({});
  const [members, setMembers] = useState([]);

  const divRef = useRef();

  const resizeDiv = () => {
    divRef.current.style.height = parseInt(window.innerHeight) - 200 + "px";
  };

  useEffect(() => {
    getAllAccess();
    getChannel(idChan);
    resizeDiv();
    window.addEventListener("resize", resizeDiv);
    
  }, []);
  const getAllAccess = () => {
    const callBack = (res) => {
      setMembers(res);
    };
    Request(`acces/${idChan}`, Header.loged("GET"), callBack);
  };
  const getChannel = (idChannel) => {
    const callBack = (res) => {
      setChannel(res);
    };
    Request(`channel/${idChannel}`, Header.loged("GET"), callBack);
  };
  const deletechannel = () => {
    const callBack = (res) => {
      window.location = "/beta";
    };
    Request(
      `channel/${idChan}`,
      Header.loged("DELETE", { userID: localStorage.getItem("userID") }),
      callBack
    );
  };
  return (
    <div>
      <h2>
        {channel.name}
        <IoIosCloseCircle className="removeReply" onClick={deletechannel} />
      </h2>
      <h3>Lien : 
        <a href={"http://localhost:3000/join/" + idChan}>
          {"http://localhost:3000/join/" + idChan}
        </a>
      </h3>
      <div className="listUserChan" ref={divRef}>
      
        {members.map((member) => (
          <Member
            acces={member}
            key={"member" + member.id_user}
            refreshAcces={getAllAccess}
          />
        ))}
      </div>
    </div>
  );
}
