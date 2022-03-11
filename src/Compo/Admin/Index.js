import React, { useEffect, useState } from 'react';

import ReportMessage from './MessageReport'
import ReportPost from './PostReport'
import ReportComment from './CommentReport'


import Request from '../../Outil/request'
import Header from '../../Outil/header'

export default function MessageReport() {

  const [reportViewer, setView] = useState(0);
  console.log(reportViewer)
  const callMessage = (e) => {
    setView(0);
  }
  const callPost = (e) => {
    setView(1)
  }
  const callComment = (e) => {
    setView(2)
  }


  return (
    <div>
      <div className='barreReportView'>
          <p onClick={callMessage}>1</p>
          <p onClick={callPost}>2</p>
          <p onClick={callComment}>3</p>
      </div>
      {reportViewer === 0 && <ReportMessage/>}
      {reportViewer === 1 && <ReportPost/>}
      {reportViewer === 2 && <ReportComment/>}

    </div>
  );
}