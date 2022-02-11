import ReplyInfo from './ReplyInfo'
import {IoIosCloseCircle} from 'react-icons/io'
import '../../Style/PostMessage.css'

export default function PostMessage({channel,postMessage,reply,setReply}){
  const onSubmit = (e) => {
    e.preventDefault();
    const value = {
      userID: localStorage.getItem("userID"),
      message: e.target["message"].value,
    };
    if (reply !== null) {
      value.replyID = reply.id;
    }
    const header = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          localStorage.getItem("token") +
          " " +
          localStorage.getItem("userID"),
      },
      body: JSON.stringify(value),
    };
    fetch(process.env.REACT_APP_API_URL + "message/" + channel.id, header)
      .then((res) => {
        e.target["message"].value = "";
        setReply(null)
        postMessage();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <form action="#" onSubmit={onSubmit} className="postMessage">
      <div className="replyMsg">{reply !== null && 
      <ReplyInfo reply={reply} setReply={setReply}/>}</div>
      <input type="text" name="message" className="messageInput" />
      <input type="submit" />
    </form>
  );
}