import React,{useEffect,useState} from 'react';

export default function MessageReport(){

    const [listReportMessage, setReportMessage] = useState([]);

    useEffect(() => {
        getReportedMessage();
    },[])

    const getReportedMessage = () => {
      var header = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("token") +
            " " +
            localStorage.getItem("userID"),
        },
      };
      fetch(process.env.REACT_APP_API_URL + "report/",header)
      .then(res => {return res.json()})
      .then(res =>{
          if(res.error){
              console.error(res.error)
          }else{
              setReportMessage(res)
            }

      })
      .catch(err => console.error(err))
    }


    return (
      <div>
        {listReportMessage.map((message) => (
          <div key={"ReportedMessage"+message.id}>
            <p>
              {message.message} : {message.nbrReport}
            </p>
          </div>
        ))}
      </div>
    );
}