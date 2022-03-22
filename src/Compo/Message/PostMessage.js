import { useState, useRef } from 'react'
import { IoImage,IoCloseCircle } from 'react-icons/io5'
import ReplyInfo from './ReplyInfo'
import '../../Style/Message/PostMessage.css'

export default function PostMessage({ channel, postMessage, reply, setReply }) {

  const [imgMsg, setImg] = useState(undefined);
  const imageRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let value = new FormData();

    let headers = {
      Authorization:
        "Bearer " +
        localStorage.getItem("token") +
        " " +
        localStorage.getItem("userID"),
    }

    const messageValue = {
      userID: localStorage.getItem("userID"),
    };
    if (e.target['message'].value !== "")
      messageValue.message = e.target["message"].value
    if (reply !== null) {
      messageValue.replyID = reply.id;
    }
    if (imgMsg !== undefined) {
      console.log(e.target["image"].files[0])
      value.append('image', imgMsg);
      value.append('message', JSON.stringify(messageValue));
    } else {
      value = JSON.stringify(messageValue);
      headers = Object.assign(headers, {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    }


    const header = {
      method: "POST",
      headers: headers,
      body: value,
    };
    fetch(process.env.REACT_APP_API_URL + "message/" + channel.id, header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          console.error(res.error);
        } else {
          e.target["message"].value = "";
          setReply(null);
          postMessage();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChange = (e) => {
    console.log(e.target.value)
    setImg(e.target.files[0]);
  };

  const removeImg = () => {
    setImg(undefined);
  }
  return (
    <form action="#" onSubmit={onSubmit} className="postMessage" >
      <div className="replyMsg">
        {reply !== null && <ReplyInfo reply={reply} setReply={setReply} />}
      </div>

      <div className="coreInputMsg">
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
          <div>

            <IoImage
              onClick={() => imageRef.current.click()}
              className="selecImage" />
            {imgMsg !== undefined &&(
              <IoCloseCircle onClick={removeImg} />
            )}
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
      <input type="submit" />
    </form>
  );
}