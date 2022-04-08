import React, { useState, useRef, useEffect } from "react";

import Request from "../../../Outil/request";
import Header from "../../../Outil/header";

import "../../../Style/Post/Send/Post.css";

export default function Post() {
  const [errorName, setError] = useState(null);
  const refMain = useRef();

  const resizeItem = () => {
    refMain.current.style.height = parseInt(window.innerHeight) - 80 + "px";
  };
  //860

  useEffect(() => {
      resizeItem();
      window.addEventListener("resize", resizeItem);
      
  },[])

  const onSubmit = (e) => {
    e.preventDefault();
    const callBack = (res) => {
      window.location = "/post";
    };
    const errorBack = (res) => {
      setError(res.error);
    };

    const value = {
      userID: localStorage.getItem("userID"),
      postName: e.target["name"].value,
      description: e.target["description"].value,
    };

    Request("post/", Header.loged("POST", value), callBack, errorBack);
  };

  return (
    <div className="mainDiv" ref={refMain}>
      <form onSubmit={onSubmit} className='formPost'>
        <p className="errorName">{errorName}</p>
        <div className="nameFormu">
          <label name="name">Nom</label>
          <input name="name" type="text" />
        </div>
        <div className="descripFormu">
          <label name="description">Message</label>
          <textarea type="text" name="description"></textarea>
        </div>
        <input value="Envoyer" type="submit" className='sendPost'/>
      </form>
    </div>
  );
}
