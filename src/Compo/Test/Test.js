import React ,{useState} from 'react';
import MoreInfo from '../Message/MoreInfoMessage';
import { IoMdMore } from "react-icons/io";


export default function Test(){

  const [isMore, getMoreInfo] = useState(false);

  const item = {id_user : 13}
  const request = () => {
    var obj = {
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
    fetch(process.env.REACT_APP_API_URL + "message/3/channel", obj)
      .then((res) => res.json())
      .then((res) => {
        if(res.error){
          console.error(res.error);
        }
        else{
        console.log(res);
        onChange(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onClick = (event) => {
    getMoreInfo(true);
  };
  const onChange = (value) => {
    const tableau = [[value[0].id_user, []]];
    let compteur = 0;
    for (let val of value) {
      if (tableau[compteur][0] === val.id_user) {
        tableau[compteur][1].push(val);
      } else {
        tableau.push([val.id_user, [val]]);
        compteur++;
      }
    }
    console.log(tableau);
  };

  return (
    <div>
      <p onClick={onClick}>Test</p>
      {isMore ? <MoreInfo message={item} />:      <IoMdMore onClick={onClick} />}
    </div>
  );
}