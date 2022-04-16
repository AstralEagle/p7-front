import React,{useState,useEffect} from "react";
import {IoHeartOutline, IoChatbubbleEllipsesOutline} from 'react-icons/io5'

import '../../Style/User/Item/Item.css'

export default function Item({ post }) {

  const [descriptionMessage,setDesc] = useState([]);

  useEffect(() => {
    console.log(post)
    setDesc(post.description.split('\\n'));
  },[])

  const goToPost = () => {
    window.location = `/post/${post.id}`
  }

  return (
    <div className="itemOfUser" onClick={goToPost}>
      <div className="infoNameAndMoreUser">
        <p className="postName">{post.name}</p>
        <div className="infoPostUser">
          <p className="postComment"><IoHeartOutline />{post.nbrComment}</p>
          <p className="postLike"><IoChatbubbleEllipsesOutline />{post.nbrLike}</p>
        </div>
      </div>
      <div className="postDesc">{descriptionMessage.map((message,ex)=> (
        <p className="postOneLinePost" key={ex}>{message}</p>
      ))}</div>
    </div>
  );
}
