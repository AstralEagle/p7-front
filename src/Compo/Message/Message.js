import React, {useState} from 'react';
import { IoIosReturnLeft , IoIosCloseCircle, IoIosAlert } from "react-icons/io"
import '../../Style/Message.css'



export default function Message({message,postMessage,replyMsg}){
  const deleteItem = (e) => {
    var header = {
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
      body: JSON.stringify({ userID: localStorage.getItem("userID") }),
    };
    fetch(process.env.REACT_APP_API_URL + "message/" + message.id, header)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        postMessage();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const reportItem = (e) => {
    console.log("reportItem");
  };
  const replyItem = (e) => {
    replyMsg = message;
    console.log(replyMsg);
    console.log("test")
  };

  return (
    <div className="msgItem">
      <p>{message.message}</p>
      <div className="moreOption">
        {message.id_user === parseInt(localStorage.getItem("userID")) ? (
          <IoIosCloseCircle className="iconItem" onClick={deleteItem} />
        ) : (
          <IoIosAlert className="iconItem" onClick={reportItem} />
        )}
        <IoIosReturnLeft className="iconItem" onClick={replyItem} />
      </div>
    </div>
  );
}