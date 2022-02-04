import React, {useState, useEffect, useRef} from 'react';
import Message from './MessageByUser';
import Post from "./PostMessage";
import '../../Style/listMsg.css'

export default function Listmessages({channel}) {
  const [messages, setMessages] = useState([]);
  const replyMsg = null;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    console.log("scroll to bottom");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getTest = ()=>{
    console.log("getTest");
  }
  const getMessages = () => {
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

    console.log("Requesting messages ", channel.id);
    fetch(
      process.env.REACT_APP_API_URL + "message/" + channel.id + "/channel",
      header
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.length > 0) {
          const tableau = [[res[0].id_user, []]];
          let compteur = 0;
          for (let val of res) {
            if (tableau[compteur][0] === val.id_user) {
              tableau[compteur][1].push(val);
            } else {
              tableau.push([val.id_user, [val]]);
              compteur++;
            }
          }
          setMessages(tableau);
          scrollToBottom();
        } else {
          setMessages([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMessages();
  }, [channel]);

  return (
    <div className="sectionMessage">
      <Post channel={channel} postMessage={getMessages} reply={replyMsg} />
      <div className="infoMessage">
        <h2 onClick={scrollToBottom}>{channel.name}</h2>
        <div className="scrollMsg">
          <div ref={messagesEndRef} />
          <div className="listMsg">
            {messages.map((message) => (
              <Message messages={message} postMessage={getTest} replyMsg={replyMsg} key={"message" + message[1][0].id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}