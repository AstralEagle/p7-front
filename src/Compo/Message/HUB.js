import React, {useState} from "react";
import ChannelList from "./BannerChannel";
import MessageList from './ListMessage';
import '../../Style/hub.css';


export default function HUB(){
  const [channel, setChannelId] = useState({
    name: "Second",
    id: 3,
  });

  return (
    <div className="hubMessage">
      <ChannelList setChannel={setChannelId} />
      <MessageList channel={channel} />
    </div>
  );
}