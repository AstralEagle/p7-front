import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { IoSend, IoHeart, IoCloseCircle } from "react-icons/io5";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import ListLikes from "./ListLike";
import ListPost from "./ListPost";

import '../../Style/User/Index.css'

export default function Index({ myUser }) {
  var idUser = useParams().id;

  const [user, setUser] = useState({});
  const [viewBox, setView] = useState(false);

  const resizeRef = useRef();

  const resizeDiv = () => {
    if (parseInt(window.innerWidth) > 768)
      resizeRef.current.style.height = parseInt(window.innerHeight) - 250 + "px";
    else
      resizeRef.current.style.height = parseInt(window.innerHeight) - 70 + "px";
  };

  const getUser = () => {
    const callBack = (res) => {
      setUser(res);
    };

    Request(`auth/${idUser}`, Header.loged("GET"), callBack);
  };

  useEffect(() => {
    getUser();
    resizeDiv();
    
  }, []);

  const deleteUser = (e) => {
    if (window.confirm("Supprimer l'utilisateur?")) {
      const callBack = (res) => {
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
        window.location = "/";
      };
      const value = { userID: localStorage.getItem("userID") };
      Request(`auth/${idUser}`, Header.loged("DELETE", value), callBack);
    }
  };
  const switchPost = (e) => {
    setView(false);
  };
  const switchLike = (e) => setView(true);

  return (
    <div className='mainDivUserPage'>
      <h2>
        {user.name} {user.last_name}{" "}
        {(localStorage.getItem("userID") === idUser) | myUser.op ? (
          <IoCloseCircle onClick={deleteUser} />
        ) : (
          <></>
        )}
      </h2>
      <p className='infoDateUser'>Inscrit depuis {user.date}</p>

      <div>
        <div className="selectInfoPostUser">
          <p onClick={switchPost}>
            <IoSend />
            {user.nbrPost}
          </p>
          <p onClick={switchLike}>
            <IoHeart />
            {user.nbrLike}
          </p>
        </div>
        <div className="listPostUser" ref={resizeRef}>
          {viewBox ? (
            <ListLikes idUser={idUser} />
          ) : (
            <ListPost idUser={idUser} />
          )}
        </div>
      </div>
    </div>
  );
}
