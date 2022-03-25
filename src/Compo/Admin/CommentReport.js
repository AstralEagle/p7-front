import React, { useEffect, useState,forwardRef ,useImperativeHandle } from 'react';

import Request from '../../Outil/request'
import Header from '../../Outil/header'

import {IoCloseCircle} from 'react-icons/io5'

const ListComment = forwardRef((props,ref) => {
  const [listReportMessage, setReportMessage] = useState([]);

  useImperativeHandle(ref,()=>{
    return{
      updateReport : (nbrReport) => {getReportedMessage(nbrReport)}
    }
  })

  useEffect(() => {
    getReportedMessage(1);
  }, [])

  const getReportedMessage = (nbrReport) => {
      
    const callBack = (res) => {
      setReportMessage(res)
    }
    const errorBack = () => {
      window.location = '/'
    }
    Request("admin/comment/"+nbrReport,Header.loged("GET"),callBack,errorBack)
    
  }

  const forceDeleteComment = (id) => {
    const callBack = (res) => {

    }
    Request(`admin/comment/${id}`,Header.loged('DELETE'),callBack)
  }

  return (
    <div>
      {listReportMessage.map((message) => (
        <div key={"ReportedMessage" + message.id}>
          <p>
            {message.comment} : {message.nbrReport}
          </p>
          <IoCloseCircle onClick={() => forceDeleteComment(message.id)}/>
        </div>
      ))}
    </div>
  );
});

export default ListComment;