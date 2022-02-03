import React from 'react';
import '../../Style/Message.css'
import { IoMdMore } from "react-icons/io";



export default function Message({message}){


  return (
    <div className="msgItem">
      <p>{message.message}</p>
        <IoMdMore className="moreOption" />
    </div>
  );
}