import React, { useState, useEffect, useRef } from "react";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import Message from "./MessageByUser";
import Post from "./PostMessage";

import '../../Style/Message/Message/List/Index.css'

export default function Listmessages({ channel }) {
  const [messages, setMessages] = useState([]);
  const [replyMsg, setReplyMsg] = useState(null);

  const messagesEndRef = useRef(null);
  const sizeRef = useRef();

  const scrollToBottom = () => {
    console.log("scroll to bottom");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getMessages = () => {
    const callBack = (res) => {
      if (res.length > 0) {
        const tableau = [
          [
            {
              id: res[0].id_user,
              name: res[0].user_name,
              lastName: res[0].user_last_name,
            },
            [],
          ],
        ];
        let compteur = 0;
        for (let val of res) {
          if (tableau[compteur][0].id === val.id_user) {
            tableau[compteur][1].push(val);
          } else {
            tableau.push([
              {
                id: val.id_user,
                name: val.user_name,
                lastName: val.user_last_name,
              },
              [val],
            ]);
            compteur++;
          }
        }
        setMessages(tableau);
        scrollToBottom();
      } else {
        setMessages([]);
      }
    };
    Request(`message/${channel.id}/channel`, Header.loged("GET"), callBack);
  };

  const mainResize = () => {
    if (parseInt(window.innerWidth) > 768){
      sizeRef.current.style.height = parseInt(window.innerHeight) - 320 + "px";
    }
    else{
      sizeRef.current.style.height = parseInt(window.innerHeight) - 420 + "px";
    }
  };

  useEffect(() => {
    getMessages();
  }, [channel]);

  useEffect(() => {
    mainResize();
    window.addEventListener("resize", mainResize);
  }, []);

  return (
    <div className="sectionMessage">
    
      <div className="infoMessage">
        <h2 onClick={scrollToBottom}>{channel.name}</h2>
          <div className="listMsg" ref={sizeRef}>
            {messages.map((message) => (
              <Message
                scrollBootom={scrollToBottom}
                messages={message}
                postMessage={getMessages}
                replyMsg={setReplyMsg}
                key={"messageByUser" + message[1][0].id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
      </div>
      <Post
        channel={channel}
        postMessage={getMessages}
        reply={replyMsg}
        setReply={setReplyMsg}
      />
    </div>
  );
}
