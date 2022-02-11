import React, {useState, useEffect} from 'react';
import { IoIosReturnLeft , IoIosCloseCircle, IoIosAlert } from "react-icons/io"
import '../../Style/Message.css'



export default function Message({message,postMessage,replyMsg}){
  const [reply,setReply] = useState(null);
  useEffect(() => {
    if(message.id_reply !== null){
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
        },
      };
      fetch(process.env.REACT_APP_API_URL+"message/"+message.id_reply,header)
      .then(res => {return res.json()})
      .then(res => {
        setReply(res)
      })
      .catch(err => console.error(err));
      
    }
  },[message])
  

  if(message.id_reply !==null){
    return (
      <div className="msgItem">
        {reply !== null ? (
          <div className="replyItem">
            <p className="replyUser">
              {reply.user_name} {reply.user_last_name} :
            </p>
            <p className="replyMsg">{reply.message}</p>
          </div>
        ) : (
          <div className="replyItem">
            <p className="replyUser">Le message original a été supprimé.</p>
          </div>
        )}
        <Render message={message} postMessage={postMessage} replyMsg={replyMsg} />
      </div>
    );
  }
  else{
    return (
      <div className="msgItem">
        <Render message={message} postMessage={postMessage} replyMsg={replyMsg} />
      </div>
    )
  }
}
function Render({message,postMessage,replyMsg}){
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
        postMessage();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const reportItem = (e) => {
    var header = {
      method: "POST",
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
    fetch(process.env.REACT_APP_API_URL+'report/'+message.id, header)
    .then((res) => res.json())
    .then((res) => {
      if(res.error){
        console.error(res.error)
    }else{
      console.log(res);
    }
    })
    .catch((err) => console.error(err));
  };
  const replyItem = (e) => {
    replyMsg(message);
  };

  return (
    <div className="coreMsgItem">
        <p>{" - "+message.message}</p>
        <div className="moreOption">
          {message.id_user === parseInt(localStorage.getItem("userID")) ? (
            <IoIosCloseCircle className="iconItem" onClick={deleteItem} />
          ) : (
            <IoIosAlert className="iconItem" onClick={reportItem} />
          )}
          <IoIosReturnLeft className="iconItem" onClick={replyItem} />
        </div>
      </div>
  )
}
