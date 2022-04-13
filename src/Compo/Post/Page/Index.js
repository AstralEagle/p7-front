import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  IoChatbubbleEllipsesOutline,
  IoHeartOutline,
  IoHeartSharp,
  IoWarningOutline,
  IoCloseCircle,
} from "react-icons/io5";

import ItemComment from "./Comment";
import SendComment from "../Comment/PostComment";

import Request from "../../../Outil/request";
import Header from "../../../Outil/header";

import "../../../Style/Post/Page/Index.css";

export default function Index() {
  const idPost = useParams().id;

  const [post, setPost] = useState({});
  const [comments, setComment] = useState([]);
  const [description, setDescription] = useState([]);

  const refComments = useRef();

  const [onComment, setOnComment] = useState(false);

  const getInfoPost = () => {
    const callBack = (res) => {
      setDescription(res.description.split("\n"));
      setPost(res);
    };
    Request(`post/${idPost}`, Header.loged("GET"), callBack);
  };
  const getAllComment = () => {
    const callBack = (res) => {
      setComment(res);
    };
    Request(`post/comment/${idPost}`, Header.loged("GET"), callBack);
  };
  const resizeComment = () => {
    if (parseInt(window.innerWidth) > 768)
      refComments.current.style.height =
        parseInt(window.innerHeight) - 164 + "px";
    else refComments.current.style.height = "auto";
  };

  useEffect(() => {
    getInfoPost();
    getAllComment();
    resizeComment();
    window.addEventListener("resize", resizeComment);
  }, []);

  const onLikeClick = (e) => {
    e.preventDefault();

    const value = {
      userID: localStorage.getItem("userID"),
    };

    Request(`post/${idPost}/like`, Header.loged("POST", value), getInfoPost);
  };
  const onCommentClick = (e) => {
    e.preventDefault();

    if (onComment) setOnComment(false);
    else setOnComment(true);
  };
  const onReportClick = (e) => {
    const callBack = (res) => {
      console.log(res);
    };

    Request(
      `report/post/${idPost}`,
      Header.loged("POST", { userID: localStorage.getItem("userID") }),
      callBack
    );
  };
  const onDeleteClick = (e) => {
    if (window.confirm("Supprimer ce post?")) {
      const callBack = (res) => {
        window.location = "/post";
      };
      Request(`post/${idPost}`, Header.loged("DELETE"), callBack);
    }
  };
  const afterComment = () => {
    getInfoPost();
    getAllComment();
    setOnComment(false);
  };

  return (
    <div className="pagePostMain">
      <div className="pagePostInfoName">
        <h2 className="pagePostName">{post.name}</h2>
        <div className="pagePosteInfoLikeAndComment">
          <p className="infoReportPage">
            {localStorage.getItem("userID") == post.userID ? (
              <IoCloseCircle onClick={onDeleteClick} />
            ) : (
              <IoWarningOutline onClick={onReportClick} />
            )}
          </p>
          <p className="infoLikeMessage">
            {post.isTrue ? (
              <IoHeartSharp onClick={onLikeClick} className="iconLiked" />
            ) : (
              <IoHeartOutline onClick={onLikeClick} className="iconNotLiked" />
            )}
            {post.nbrLike}
          </p>
          <p className="InfoCommentMessage">
            <IoChatbubbleEllipsesOutline
              onClick={onCommentClick}
              className="iconComments"
            />
            {post.nbrComment}
          </p>
          {onComment && (
            <SendComment messageID={post.id} onDisable={afterComment} />
          )}
        </div>
      </div>
      <div className="infoPostDown">
        <div className="textPost">
          {description.map((oneLine, ex) => (
            <p key={"description" + ex}>{oneLine}</p>
          ))}
        </div>
        <div className="borderComment">
          <div className="listComment" ref={refComments}>
            {comments.map((comment) => (
              <ItemComment
                comment={comment}
                refreshComment={afterComment}
                key={comment.id + "Comment"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
