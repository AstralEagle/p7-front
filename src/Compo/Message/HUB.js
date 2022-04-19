import React, {useState} from "react";

import ChannelList from "./BannerChannel";
import MessageList from './ListMessage';
import CreateChannel from './CreateChannel'

import '../../Style/Message/HUB.css';


export default function HUB(){


  const [channel, setChannelId] = useState({
    name: "Groupomania",
    id: 1,
  });
  const [channels, setChannels] = useState([]);

  const requestChannel = () => {
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
    fetch(process.env.REACT_APP_API_URL + "channel", header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if(res.error){
          console.error(res.error);
        }
        else{
        setChannels(res);
      }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="hubMessage">
      <ChannelList setChannel={setChannelId} channels={channels} getAllChan={requestChannel}/>
      {channel.id === 0 ?
      (<CreateChannel setChannel={setChannelId} getAllChan={requestChannel}/>):
      (<MessageList channel={channel} />)
    }
    </div>
  );
}