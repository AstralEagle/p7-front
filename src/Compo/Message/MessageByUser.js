import Msg from './Message';


export default function Message({messages, postMessage, replyMsg,scrollBootom}){

  const goUser = (e) => {
    window.location = '/user/'+messages[0].id;
  }

  return (
    <div className="msgByUser">
      <h4 className="userNameMsg" onClick={goUser}>
        {messages[0].name} {messages[0].lastName}
      </h4>
      {messages[1].map((mess) => (
        <Msg message={mess} key={"Message"+mess.id} postMessage={postMessage} replyMsg={replyMsg} scrollBootom={scrollBootom}/>
      ))}
    </div>
  );
}