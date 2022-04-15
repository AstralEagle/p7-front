import React, { useEffect, useState, useRef } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

import Channel from "./Channel";

import "../../Style/Message/Channel/List/Index.css";

export default function Messages({ setChannel, getAllChan, channels }) {

  const [visiChannel, setVisi] = useState(true);

  const sizeRef = useRef();

  const resizeDiv = () => {
    if(parseInt(window.innerWidth) > 768)
      sizeRef.current.style.height = parseInt(window.innerHeight) - 80 + "px";
      else
      sizeRef.current.style.height = '80px';

  }

  useEffect(() => {
    getAllChan();
    resizeDiv();
  }, []);

  const onActivFalse = (e) => {
    setVisi(false);
  };
  const onActivTrue = (e) => {
    setVisi(true);
  };

  return (
    <div className='mainBannerChannel'>
        {visiChannel && (
      <div className="listBorder">
          <div className="listChannels" ref={sizeRef}>
            {channels.map((channel) => (
              <Channel
                accesChan={channel}
                setSelect={setChannel}
                key={"channel" + channel.id_channel}
              />
            ))}
            <Channel accesChan={0} setSelect={setChannel} key="channel0" />
          </div>
        </div>
        )}
        <div className="infoListChannel">
          {visiChannel ? (
            <IoRemove onClick={onActivFalse} className="iconActiv channelIconRemove" />
          ) : (
            <IoAdd onClick={onActivTrue} className="iconActiv channelIconAdd" />
          )}
      </div>
    </div>
  );
}
