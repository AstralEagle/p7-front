import React, { useEffect, useState, useRef } from 'react';

import ReportMessage from './MessageReport'
import ReportPost from './PostReport'
import ReportComment from './CommentReport'


import Request from '../../Outil/request'
import Header from '../../Outil/header'

export default function IndexAdmin() {

  const refMessage = useRef();
  const refPost = useRef();
  const refComment = useRef();

  const [reportViewer, setView] = useState(0);
  const callMessage = (e) => {
    setView(0);
  }
  const callPost = (e) => {
    setView(1)
  }
  const callComment = (e) => {
    setView(2)
  }

  const onChange = (e) => {
    console.log(e.target.value);
    switch(reportViewer){
      case 0:
        refMessage.current.updateReport(e.target.value);
        break;
      case 1:
        refPost.current.updateReport(e.target.value)
        break;
      case 2:
        refComment.current.updateReport(e.target.value)
        break;
    }
  }

  return (
    <div>
      <div className='barreReportView'>
          <p onClick={callMessage}>Message</p>
          <p onClick={callPost}>Post</p>
          <p onClick={callComment}>Comment</p>
      <input type="number" name='NbrReport' defaultValue='2' min='1' max='25' onChange={onChange} />
      </div>
      {reportViewer === 0 && <ReportMessage ref={refMessage}/>}
      {reportViewer === 1 && <ReportPost ref={refPost}/>}
      {reportViewer === 2 && <ReportComment ref={refComment}/>}

    </div>
  );
}