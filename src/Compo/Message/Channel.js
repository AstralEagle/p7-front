import React, {useState, useEffect} from 'react';
import '../../Style/Channel.css';


export default function Channel({chanId,setSelect}){
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
    fetch(process.env.REACT_APP_API_URL + "channel/" + chanId, header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setChannel(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    requestChannel();
  }, []);

  const onClick = (e) => {
    console.log("Channel clicked")
    setSelect(channel);
  };

  return (
    <div className="itemChannel" onClick={onClick}>
      <p>{channel.name}</p>
    </div>
  );
}