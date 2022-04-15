import { useState, useRef } from "react";
import { IoImage, IoCloseCircle } from "react-icons/io5";

import ReplyInfo from "./ReplyInfo";

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import "../../Style/Message/Message/Send/Post.css";

export default function PostMessage({ channel, postMessage, reply, setReply }) {
 
  const [imgMsg, setImg] = useState(undefined);
  const [errorMessage,setError] = useState(undefined);


  const imageRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let header = Header.loged('POST')
    

    const messageValue = {
      userID: localStorage.getItem("userID"),
    };
    if (e.target["message"].value !== "")
      messageValue.message = e.target["message"].value;
    if (reply !== null) {
      messageValue.replyID = reply.id;
    }
    if (imgMsg !== undefined) {
      let value = new FormData();
      value.append("image", imgMsg);
      value.append("message", JSON.stringify(messageValue));
      header = Header.loged('POST',value,true)
    } else {
      header = Header.loged('POST',messageValue)
      
    }

    const callBack = (res) => {
      e.target["message"].value = "";
      setReply(null);
      postMessage();
    }
    const errorBack = (res) => {
    
    }

    Request(`message/${channel.id}`,header,callBack,errorBack)

  };

  const onChange = (e) => {
    console.log(e.target.value);
    setImg(e.target.files[0]);
  };

  const removeImg = () => {
    setImg(undefined);
  };
  return (
    <form action="#" onSubmit={onSubmit} className="postMessage">
      <div className="replyMsg">
        {reply !== null && <ReplyInfo reply={reply} setReply={setReply} />}
      </div>

      <div className="coreInputMsg">
        <p className="errorMsg">{errorMessage}</p>
        <input type="text" name="message" className="messageInput"></input>
        <div className="coreInputImg">
          <input
            ref={imageRef}
            className="imageInput"
            type="file"
            name="image"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onChange}
          />
          <div className="imageSectionPostMessage">
            <div className="inputImageSetting">
              <IoImage
                onClick={() => imageRef.current.click()}
                className="selecImage"
              />
              {imgMsg !== undefined && <IoCloseCircle onClick={removeImg} />}
            </div>
            {imgMsg !== undefined && (
              <img
                className="imageRevisual"
                src={URL.createObjectURL(imgMsg)}
                alt="Image_a_envoyer"
              />
            )}
          </div>
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}
