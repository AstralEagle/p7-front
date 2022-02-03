import React, {useState, useEffect} from 'react';
import Channel from './Channel';

export default function Messages({setChannel}){

    const [channels,setChannels] = useState([]);

    const requestChannel = () =>{
        const header ={
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
            }
        }
      fetch(process.env.REACT_APP_API_URL + "channel",header)
        .then(res => {
          return res.json();
        })
        .then(res => {
          setChannels(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
    useEffect(() =>{
         requestChannel();
    },[])

    return(
        <div className="listChannels">
            {channels.map(channel =>(
                <Channel chanId={channel.id_channel} setSelect={setChannel} key={"channel"+channel.id_channel} />
            ))}
        </div>
    )
    

}