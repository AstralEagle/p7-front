import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoChatbubbleEllipsesOutline, IoHeartOutline, IoHeartSharp, IoWarningOutline } from 'react-icons/io5'
import SendComment from '../Comment/PostComment'

import Request from '../../../Outil/request';
import Header from '../../../Outil/header';

import '../../../Style/Post/Page/Index.css'

export default function Index() {

    const idPost = useParams().id;

    const [post, setPost] = useState({});

    const [like, setLike] = useState(0);
    const [isLiked, setIsLike] = useState(false);
    const [comment,setComment] = useState(0);
    const [onComment,setOnComment] = useState(false);

    const getInfoPost = () => {
        const callBack = (res) => {
            setPost(res);
        }
        Request(`post/${idPost}`, Header.loged('GET'), callBack)
    }
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
        Request(`post/${idPost}/like`, Header.loged('GET'), callBack);
    }

    useEffect(() => {
        getInfoPost()
        getLike()
    }, [])

    const onLikeClick = (e) => {

        e.preventDefault();

        const value = {
            userID: localStorage.getItem('userID')
        }

        Request(`post/${idPost}/like`, Header.loged('POST', value), getLike)
    }
    const onCommentClick = (e) => {

        e.preventDefault();
    
        if (onComment)
          setOnComment(false);
        else
          setOnComment(true)
      }

    return (
        <div className="pagePostMain">
            <div className="pagePostInfoName">
                <h2 className="pagePostName">{post.name}</h2>
                <div className="pagePosteInfoLikeAndComment">
                    <p className='infoReportPage'><IoWarningOutline />?</p>
                    <p className='infoLikeMessage'>{isLiked ?
                        (<IoHeartSharp onClick={onLikeClick} className='iconLiked' />) : (<IoHeartOutline onClick={onLikeClick} className='iconNotLiked' />)}{like}</p>
            <p className='InfoCommentMessage'><IoChatbubbleEllipsesOutline onClick={onCommentClick} className='iconComments' />{comment}</p>
                        {onComment && <SendComment />}
                </div>
            </div>
            <p>{post.description}</p>


        </div>
    )
}