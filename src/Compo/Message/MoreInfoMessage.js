import { IoIosReturnLeft , IoIosCloseCircle, IoIosAlert } from "react-icons/io"

export default function MoreInfo ({message}){

    const deleteItem = (e) => {
        var header = {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                localStorage.getItem("token") +
                " " +
                localStorage.getItem("userID"),
            },
            body: JSON.stringify({userId: localStorage.getItem("userID")})
          };
          fetch(process.env.REACT_APP_API_URL + "message/"+message.id, header)
      .then((res) => res.json())
      .then((value) => {
      })
      .catch((err) => {
        console.error(err);
      });
    };
    const reportItem = (e) => {
        console.log("reportItem")
    };
    const replyItem = (e) => {
        console.log("replyItem")
    };
    return (
        <div className="moreOption moreMenu">
            {(message.id_user === parseInt(localStorage.getItem("userID")))?
            <IoIosCloseCircle className="iconItem" onClick={deleteItem} /> :
            <IoIosAlert className="iconItem" onClick={reportItem} />
            }
            <IoIosReturnLeft className="iconItem" onClick={replyItem} />
        </div>
    );
}