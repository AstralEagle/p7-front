import React, { useEffect, useState } from 'react';

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import {IoCloseCircle} from 'react-icons/io5'

export default function MessageReport() {

  const [listReportMessage, setReportMessage] = useState([]);

  useEffect(() => {
    getReportedMessage(2);
  }, [])

  const getReportedMessage = (nbrReport) => {
      
    Request("admin/comment/"+nbrReport,Header.loged("GET"),(res) =>       setReportMessage(res))
    
  }


  return (
    <div>
      {listReportMessage.map((message) => (
        <div key={"ReportedMessage" + message.id}>
          <p>
            {message.comment} : {message.nbrReport}
          </p>
          <IoCloseCircle />
        </div>
      ))}
    </div>
  );
}