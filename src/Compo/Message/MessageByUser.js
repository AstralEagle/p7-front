import Msg from './Message';


export default function Message({messages, postMessage, replyMsg,scrollBootom}){
  console.log(messages)
  return (
    <div className="msgByUser">
      <h4 className="userNameMsg">
        {messages[0].name} {messages[0].lastName}
      </h4>
      {messages[1].map((mess) => (
        <Msg message={mess} key={"Message"+mess.id} postMessage={postMessage} replyMsg={replyMsg} scrollBootom={scrollBootom}/>
      ))}
    </div>
  );
}