import React, { useRef, useEffect } from "react";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import "../../Style/Message/CreateChan/CreatChan.css";

export default function CreateChannel({ getAllChan, setChannel }) {
  const divRef = useRef();

    const resizeDiv = () => {
        divRef.current.style.height = parseInt(window.innerHeight) - 80 + 'px'
    }

    useEffect(() => {
        resizeDiv();
        window.addEventListener('resize', resizeDiv);
    },[])

  const onSubmit = (e) => {

    e.preventDefault();

    const value = {
      nameChan: e.target["name"].value,
      userID: localStorage.getItem("userID"),
    };
    const callBack = () => {
      getAllChan();
    };

    Request("channel", Header.loged("POST", value), callBack);
  };

  return (
    <div className='newChanDiv' ref={divRef}>
      <h3>Nouveau Channel</h3>
      <form action="#" onSubmit={onSubmit} className="formCreateChannel">
        <label htmlFor="name" className="labelName">
          Nom du channel
        </label>
        <input type="text" name="name" className="inputName" />
        <input type="submit" />
      </form>
    </div>
  );
}
