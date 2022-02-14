import React, {useState, useEffect} from 'react';
import {IoMdAdd,IoMdSettings} from 'react-icons/io'
import '../../Style/Channel.css';


export default function Channel({accesChan,setSelect}){
  const [channel, setChannel] = useState({});

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
    fetch(process.env.REACT_APP_API_URL + "channel/" + accesChan.id_channel, header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if(res.error){
          console.error(res.error);
        }
        else{
          res.initial = res.name.substring(0,1);
          setChannel(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    if(accesChan !== 0)
    requestChannel();

  }, []);

  if(accesChan === 0){
    const onClickAdd = (e) => {
      setSelect({
        name: "Create Channel",
        id : 0
      })
    }

    return(
      <div className="itemChannel" onClick={onClickAdd}>
      <IoMdAdd className="addChannel"/>
    </div>
    )
  }
  const onClick = (e) => {
    setSelect(channel)
  }
  const toSettings = (e) => {
    window.location = "/channel/"+channel.id;

  }

  return (
    <div className="itemChannel" onClick={onClick}>
      <p>{channel.initial}</p>
      {accesChan.op === 1 &&
      <IoMdSettings className="settingsChannel" onClick={toSettings}/>
      }
    </div>
  );
}