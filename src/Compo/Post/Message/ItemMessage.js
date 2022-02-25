import React, { useState, useEffect } from 'react'
import { IoChatbubbleEllipsesOutline,IoHeartOutline,IoHeartSharp } from 'react-icons/io5'

import Request from '../../../Outil/request'
import Header from '../../../Outil/header'

import '../../../Style/Post/Message/ItemMessage.css'

export default function GetMessageItem({ message }) {

    // 0=null, 1=rouge, 2=violet, 3=bleu, 4=vert, 5=jaune, 6=orange
    const tabColor = ["#b6b7b0","#f73e3e","#a63ef7","#3e56f7","#3ef76d","#f7f03e","#f7a33e"]

    const [isLiked, setLike] = useState(false)
    const messages = message.description.split("/");

    const isLike = () => {
        const callBack = (res) => {
            setLike(res.isLiked)
        };
        Request("post/isLike/" + message.id, Header.loged('GET'), callBack);
    }
    const onLikeClick = (e) =>{
        const value = {
            userID : localStorage.getItem('userID')
        }
        const callBack = (res) => {

        }
        Request("post/"+message.id+"/like",Header.loged('POST',value),callBack)
    }

    useEffect(() => {
        isLike();
    }, [])


    return (
        <div className='mainItemMessage'>
            <h4 className='namePost'>{message.name}</h4>
            <p className='userPost'>{message.userName + " " + message.userLastName}</p>
            <div className='messagePost'>
                {messages.map(oneLine => (
                    <p className='lineMessagePost' key={message.id + oneLine}>{oneLine}</p>
                ))}
            </div>
            <div className='barreMoreInfo'>
                <p className='infoLikeMessage'>{isLiked ?
                (<IoHeartSharp />):(<IoHeartOutline />)}{message.nbrLike}</p>
                <p className='InfoCommentMessage'><IoChatbubbleEllipsesOutline />{message.nbrComment}</p>
            </div>

        </div>
    )



}