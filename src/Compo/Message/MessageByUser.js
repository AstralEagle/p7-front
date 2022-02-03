import React,{useState,useEffect} from 'react';
import Msg from './Message';


export default function Message({messages}){
  const [user, setUser] = useState({});

  useEffect(() => {
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
    fetch(process.env.REACT_APP_API_URL + "auth/" + messages[0], header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="msgByUser">
      <h4 className="userNameMsg">
        {user.name} {user.last_name}
      </h4>
      {messages[1].map((mess) => (
        <Msg message={mess} key={"Message"+mess.id}/>
      ))}
    </div>
  );
}