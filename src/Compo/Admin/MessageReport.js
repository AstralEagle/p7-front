import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { IoCloseCircle } from "react-icons/io5";

import Request from "../../Outil/request";
import Header from "../../Outil/header";

import "../../Style/Admin/Section/Section.css";

const MessageReport = forwardRef(({ nbrInit }, ref) => {
  const [listReportMessage, setReportMessage] = useState([]);

  const getReportedMessage = (nbrReport) => {
    const callBack = (res) => {
      setReportMessage(res);
    };
    const errorBack = () => {
      window.location = "/";
    };
    Request(
      "admin/message/" + nbrReport,
      Header.loged("GET"),
      callBack,
      errorBack
    );
  };

  useEffect(() => {
    getReportedMessage(nbrInit);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      updateReport: (nbrReport) => {
        getReportedMessage(nbrReport);
      },
    };
  });

  const forceDelete = (nbrIndex) => {
    const callBack = () => {};
    Request(`admin/message/${nbrIndex}`, Header.loged("DELETE"), callBack);
  };

  return (
    <div className="mainReportDiv">
      <h2>Message</h2>
      {listReportMessage.map((message, ex) => (
        <div key={ex} className="reportItem">
          <div className="divMessageReport">
            <p>
              {message.message} : {message.nbrReport}
            </p>
          </div>
          <IoCloseCircle
            onClick={() => forceDelete(message.id)}
            className="deleteReport"
          />
        </div>
      ))}
    </div>
  );
});

export default MessageReport;
