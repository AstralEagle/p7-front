import React, {useState, useEffect} from 'react';
import {IoIosCloseCircle} from 'react-icons/io';


export default function Reply({reply,setReply}){

  const deleteReply = () => {
    setReply(null);
  };

  return (
    <>
      <p className='textReply'>{reply.message}</p>
      <IoIosCloseCircle className="removeReply" onClick={deleteReply} />
    </>
  );
}