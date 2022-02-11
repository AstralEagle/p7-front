import React, {useState, useEffect} from 'react';
import {IoIosCloseCircle} from 'react-icons/io';


export default function Reply({reply,setReply}){
  const [user, setUser] = useState({});

  useEffect(() => {
      getUser();
  }, [reply]);

  const getUser = () => {
    var header = {
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
    fetch(process.env.REACT_APP_API_URL + "auth/" + reply.id_user, header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteReply = () => {
    setReply(null);
  };

  return (
    <div>
      <p>{user.name + " " + user.last_name}</p>
      <p>{reply.message}</p>
      <IoIosCloseCircle className="removeReply" onClick={deleteReply} />
    </div>
  );
}