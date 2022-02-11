import React, {useEffect} from 'react';
import Channel from './Channel';

export default function Messages({setChannel,getAllChan,channels}){
  
  useEffect(() => {
    getAllChan();
  }, []);

  return (
    <div className="listChannels">
      {channels.map((channel) => (
        <Channel
        accesChan={channel}
          setSelect={setChannel}
          key={"channel" + channel.id_channel}
        />
      ))}
      <Channel
          accesChan={0}
          setSelect={setChannel}
          key="channel0"
        />
    </div>
  );
}