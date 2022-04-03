import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import { IoCloseCircle } from 'react-icons/io5'

const ReportPost = forwardRef(({nbrInit}, ref) => {

  const [listReportMessage, setReportMessage] = useState([]);

  useImperativeHandle(ref, () => {
    return {
      updateReport: (nbrReport) => {
        getReportedMessage(nbrReport)
      }
    }
  })

  useEffect(() => {
    getReportedMessage(nbrInit);
  }, [])

  const getReportedMessage = (nbrReport) => {

    const callBack = (res) => {
      setReportMessage(res)
    }
    const errorBack = () => {
      window.location = '/'
    }
    Request("admin/post/" + nbrReport, Header.loged("GET"),callBack,errorBack)

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
          <IoCloseCircle onClick={forceDelete} />
        </div>
      ))}
    </div>
  );
})
export default ReportPost;