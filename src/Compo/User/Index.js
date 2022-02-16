import React,{useState, useEffect} from "react"
import {useParams} from 'react-router-dom'

export default function Index(){

    var idUser = useParams().id;
    const [user,setUser] = useState({});

    useEffect(() =>{
        getUser();
    },[]);
    const getUser = () => {
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
          fetch(process.env.REACT_APP_API_URL + "auth/" + idUser, header)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (res.error) {
                console.error(res.error);
                window.location = "/beta";
              } else {
                setUser(res);
              }
            })
            .catch((err) => {
              console.error(err);
            }); 
    }


    return (
        <div>
            <p>{user.name}</p>
        </div>
    )
}