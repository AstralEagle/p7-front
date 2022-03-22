import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import { IoCloseCircle } from 'react-icons/io5'

const ReportPost = forwardRef((props, ref) => {

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

    Request("admin/post/" + nbrReport, Header.loged("GET"), (res) => setReportMessage(res))

  }

  const forceDelete = (id) => {
    const callBack = (res) => {

    }
    Request(`admin/post/${id}`,Header.loged('DELETE'),callBack)
  }


  return (
    <div>
      {listReportMessage.map((message) => (
        <div key={"ReportedMessage" + message.id}>
          <h4>{message.name}</h4>
          <p>
            {message.description} : {message.nbrReport}
          </p>
          <IoCloseCircle />
        </div>
      ))}
    </div>
  );
})
export default ReportPost;