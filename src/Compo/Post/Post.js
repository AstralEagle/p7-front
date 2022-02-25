import React, { useState, useEffect } from 'react';
import { IoChatbubbleEllipsesOutline, IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import PostComment from './Comment/PostComment'

import Request from '../../Outil/request';
import Header from '../../Outil/header';

import '../../Style/Post/Message/ItemMessage.css'



export default function Post({ message }) {

  const description = message.description.split('\n');

  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);
  const [isLiked, setIsLike] = useState(false);
  const [onComment, setOnComment] = useState(false);


  const getLike = () => {
    const callBack = (res) => {
      if (res.isLike) {
        setIsLike(true);
      }
      else {
        setIsLike(false);
      }
      setLike(res.nbrLike)
    }
    Request(`post/${message.id}/like`, Header.loged('GET'), callBack);
  }

  const getComment = () => {
    const callBack = (res) => {
      setComment(res.length)
    }
    Request(`post/${message.id}/comment`, Header.loged('GET'), callBack);
  }

  useEffect(() => {
    getLike();
    getComment();
  }, [])


  const onLikeClick = (e) => {

    e.preventDefault();

    const value = {
      userID: localStorage.getItem('userID')
    }

    Request(`post/${message.id}/like`, Header.loged('POST', value), getLike)
  }
  const onCommentClick = (e) => {

    e.preventDefault();

    if (onComment)
      setOnComment(false);
    else
      setOnComment(true)
  }
  const goToPost = () => {
    window.location = `/post/${message.id}`
  }
  const afterComment = () => {
    getComment();
    setOnComment(false);
  }
  return (
    <div className='mainItemMessage'>
        <a href={`/post/${message.id}`}>

          <h4 className='namePost'>{message.name}</h4>
          <div className='messagePost'>
            {description.map(oneLine => (
              <p className='lineMessagePost' key={message.id + oneLine}>{oneLine}</p>
              ))}
          </div>
              </a>
        <p className='userPost'>{message.userName + " " + message.userLastName}</p>
        <div className='barreMoreInfo'>
          <div className='iconMoreInfo'>
            <p className='infoLikeMessage'>{isLiked ?
              (<IoHeartSharp onClick={onLikeClick} className='iconLiked' />) : (<IoHeartOutline onClick={onLikeClick} className='iconNotLiked' />)}{like}</p>
            <p className='InfoCommentMessage'><IoChatbubbleEllipsesOutline onClick={onCommentClick} className='iconComments' />{comment}</p>
          </div>
        </div>
        {onComment &&
          <PostComment message={message} onDisable={afterComment} />}

      </div>
  );
}
