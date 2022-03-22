import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import { IoCloseCircle } from 'react-icons/io5'

const MessageReport = forwardRef((props, ref) => {

  const [listReportMessage, setReportMessage] = useState([]);

  useImperativeHandle(ref, () => {
    return {
      updateReport: (nbrReport) => {
        getReportedMessage(nbrReport)
      }
    }
  })

  useEffect(() => {
    getReportedMessage(2);
  }, [])

  const getReportedMessage = (nbrReport) => {
    Request("admin/message/" + nbrReport, Header.loged("GET"), (res) => setReportMessage(res))

  }
  const forceDelete = (nbrIndex) => {
    const callBack = () => {

    }
    Request(`admin/message/${nbrIndex}`,Header.loged('DELETE'),callBack)
  }


  return (
    <div>
      {listReportMessage.map((message) => (
        <div key={"ReportedMessage" + message.id}>
          <p>
            {message.message} : {message.nbrReport}
          </p>
          <IoCloseCircle onClick={() => forceDelete(message.id)} />
        </div>
      ))}
    </div>
  );
})

export default MessageReport;