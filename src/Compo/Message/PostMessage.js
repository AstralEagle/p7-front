import '../../Style/PostMessage.css'

export default function PostMessage({channel,postMessage,reply,setReply}){

    const onSubmit = (e)=>{
        e.preventDefault();
        const value = {
            userID : localStorage.getItem('userID'),
            message : e.target['message'].value
        }
        const header ={
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')+" "+localStorage.getItem('userID'),
            },
            body: JSON.stringify(value)
        }
        fetch(process.env.REACT_APP_API_URL+'message/'+channel.id, header)
        .then(res => {
            return res.json();
        })
        .then(
            res => {
                e.target['message'].value = "";
                postMessage();
            }
        )
        .catch(err => {
            console.error(err);
        })
    }
    return (
      <form action="#" onSubmit={onSubmit} className="postMessage">
          <p>{reply !==null ? reply.id: "test"}</p>
        <input type="text" name="message" className="messageInput" />
        <input type="submit" />
      </form>
    );
}