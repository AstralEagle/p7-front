import React, { useRef, useEffect } from "react";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import "../../Style/Message/Channel/New/CreatChan.css";

export default function CreateChannel({ getAllChan, setChannel }) {
  const divRef = useRef();

    const resizeDiv = () => {
      if (parseInt(window.innerWidth) > 768)
        divRef.current.style.height = parseInt(window.innerHeight) - 80 + 'px'
        else
        divRef.current.style.height = parseInt(window.innerHeight) - 250 + 'px'

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
