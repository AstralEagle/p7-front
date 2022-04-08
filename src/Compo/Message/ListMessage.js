import React, {useState, useEffect, useRef} from 'react';

import Message from './MessageByUser';
import Post from "./PostMessage";

import '../../Style/listMsg.css'

export default function Listmessages({channel}) {
  const [messages, setMessages] = useState([]);
  const [replyMsg, setReplyMsg] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    console.log("scroll to bottom");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    fetch(
      process.env.REACT_APP_API_URL + "message/" + channel.id + "/channel",
      header
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          console.error(res.error);
        } else {
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
      <Post
        channel={channel}
        postMessage={getMessages}
        reply={replyMsg}
        setReply={setReplyMsg}
      />
      <div className="infoMessage">
        <h2 onClick={scrollToBottom}>{channel.name}</h2>
        <div className="scrollMsg">
          <div className="listMsg">
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
      </div>
    </div>
  );
}