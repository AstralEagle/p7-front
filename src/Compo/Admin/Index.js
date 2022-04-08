import React, { useEffect, useState, useRef } from "react";

import ReportMessage from "./MessageReport";
import ReportPost from "./PostReport";
import ReportComment from "./CommentReport";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import "../../Style/Admin/Index.css";

export default function IndexAdmin() {
  const refMessage = useRef();
  const refPost = useRef();
  const refComment = useRef();
  const refInput = useRef();

  const [reportViewer, setView] = useState(0);
  const [nbrRep, setNbrRep] = useState(2);

  const callMessage = (e) => {
    setView(0);
  };
  const callPost = (e) => {
    setView(1);
  };
  const callComment = (e) => {
    setView(2);
  };

  const onChange = (e) => {
    console.log(refInput.current.value);
    setNbrRep(e.target.value);

    switch (reportViewer) {
      case 0:
        refMessage.current.updateReport(e.target.value);
        break;
      case 1:
        refPost.current.updateReport(e.target.value);
        break;
      case 2:
        refComment.current.updateReport(e.target.value);
        break;
    }
  };

  return (
    <div>
      <div>
        <div className="barreReportView">
          <p onClick={callMessage}>Message</p>
          <p onClick={callPost}>Post</p>
          <p onClick={callComment}>Comment</p>
        </div>
        <input
          type="number"
          name="NbrReport"
          defaultValue={nbrRep}
          min="1"
          max="25"
          onChange={onChange}
          ref={refInput}
        />
      </div>
      {reportViewer === 0 && (
        <ReportMessage ref={refMessage} nbrInit={nbrRep} />
      )}
      {reportViewer === 1 && <ReportPost ref={refPost} nbrInit={nbrRep} />}
      {reportViewer === 2 && (
        <ReportComment ref={refComment} nbrInit={nbrRep} />
      )}
    </div>
  );
}
