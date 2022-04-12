import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { IoCloseCircle } from 'react-icons/io5'

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import '../../Style/Admin/Section/Section.css'

const ListComment = forwardRef(({ nbrInit }, ref) => {
  const [listReportMessage, setReportMessage] = useState([]);
  const refSection = useRef();


  useImperativeHandle(ref, () => {
    return {
      updateReport: (nbrReport) => { getReportedMessage(nbrReport) }
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
    Request("admin/comment/" + nbrReport, Header.loged("GET"), callBack, errorBack)

  }

  const forceDeleteComment = (id) => {
    const callBack = (res) => {

    }
    Request(`admin/comment/${id}`, Header.loged('DELETE'), callBack)
  }

  return (
    <div className='mainReportDiv' ref={refSection}>
      {listReportMessage.map((message) => (
        <div key={"ReportedMessage" + message.id}>
          <p>
            {message.comment} : {message.nbrReport}
          </p>
          <IoCloseCircle onClick={() => forceDeleteComment(message.id)} />
        </div>
      ))}
    </div>
  );
});

export default ListComment;