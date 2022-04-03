import React, { useState, useEffect } from 'react';
import { IoChatbubbleEllipsesOutline, IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import PostComment from './Comment/PostComment'

import Request from '../../Outil/request';
import Header from '../../Outil/header';

import '../../Style/Post/Message/ItemMessage.css'



export default function Post({ valueMessage }) {
  
  
  const description = valueMessage.description.split('\n');
  const [message,setMessage] = useState({})
  const [onComment, setOnComment] = useState(false);
  
  
  const updateMessage = () => {
    
    
    const callBack = (res) => {
      setMessage(res)
    }
    Request(`post/${valueMessage.id}`,Header.loged('GET'),callBack)
  }


  useEffect(() => {
    setMessage(valueMessage)
  }, [])

  const onUserClick = (e) => {
    window.location = `/user/${message.userID}`
  }
  const onLikeClick = (e) => {

    e.preventDefault();

    const value = {
      userID: localStorage.getItem('userID')
    }

    Request(`post/${message.id}/like`, Header.loged('POST', value), updateMessage)
  }
  const onCommentClick = (e) => {

    e.preventDefault();

    if (onComment)
      setOnComment(false);
    else
      setOnComment(true)
  }
  const afterComment = () => {
    updateMessage();
    setOnComment(false);
  }
  return (
    <div className='mainItemMessage'>
        <a href={`/post/${valueMessage.id}`}>

          <h4 className='namePost'>{message.name}</h4>
          <div className='messagePost'>
            {description.map(oneLine => (
              <p className='lineMessagePost' key={message.id + oneLine}>{oneLine}</p>
              ))}
          </div>
              </a>
        <p className='userPost' onClick={onUserClick}>{message.userName + " " + message.userlastName}</p>
        <div className='barreMoreInfo'>
          <div className='iconMoreInfo'>
            <p className='infoLikeMessage'>{message.isTrue ?
              (<IoHeartSharp onClick={onLikeClick} className='iconLiked' />) : (<IoHeartOutline onClick={onLikeClick} className='iconNotLiked' />)}{message.nbrLike}</p>
            <p className='InfoCommentMessage'><IoChatbubbleEllipsesOutline onClick={onCommentClick} className='iconComments' />{message.nbrComment}</p>
          </div>
        </div>
        {onComment &&
          <PostComment messageID={message.id} onDisable={afterComment} />}

      </div>
  );
}
