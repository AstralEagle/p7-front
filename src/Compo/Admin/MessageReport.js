import React, { useEffect, useState } from 'react';
import Request from '../../Outil/request'
import Header from '../../Outil/header'

export default function MessageReport() {

  const [listReportMessage, setReportMessage] = useState([]);

  useEffect(() => {
    getReportedMessage();
  }, [])

  const getReportedMessage = () => {
    const afterRequest = (res) => {
      setReportMessage(res)
    }
    Request("report/",Header.loged("GET"),(res) =>       setReportMessage(res))
    
  }


  return (
    <div>
      {listReportMessage.map((message) => (
        <div key={"ReportedMessage" + message.id}>
          <p>
            {message.message} : {message.nbrReport}
          </p>
        </div>
      ))}
    </div>
  );
}