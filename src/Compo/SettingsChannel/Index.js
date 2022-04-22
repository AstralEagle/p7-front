import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Member from "./Member";
import { IoCloseCircle } from "react-icons/io5";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import "../../Style/Message/Channel/Setting/Index.css";

export default function Index() {
  let idChan = useParams().idChan;

  const [channel, setChannel] = useState({});
  const [members, setMembers] = useState([]);

  const divRef = useRef();

  const resizeDiv = () => {
    if (parseInt(window.innerWidth) > 768)
      divRef.current.style.height = parseInt(window.innerHeight) - 200 + "px";
    else
      divRef.current.style.height = parseInt(window.innerHeight) - 250 + "px";
  };

  useEffect(() => {
    console.log(window.location)
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
        <IoCloseCircle className="removeChannel" onClick={deletechannel} />
      </h2>
      <h3>
        Lien :
        <a href={window.location.origin + "/join/" + idChan}>
          {window.location.origin + "/join/"  + idChan}
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
