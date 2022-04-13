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

const ReportPost = forwardRef(({ nbrInit }, ref) => {
  const [listReportMessage, setReportMessage] = useState([]);

  useImperativeHandle(ref, () => {
    return {
      updateReport: (nbrReport) => {
        getReportedMessage(nbrReport);
      },
    };
  });

  useEffect(() => {
    getReportedMessage(nbrInit);
  }, []);

  const getReportedMessage = (nbrReport) => {
    const callBack = (res) => {
      setReportMessage(res);
    };
    const errorBack = () => {
      window.location = "/";
    };
    Request(
      "admin/post/" + nbrReport,
      Header.loged("GET"),
      callBack,
      errorBack
    );
  };

  const forceDelete = (id) => {
    const callBack = (res) => {};
    Request(`admin/post/${id}`, Header.loged("DELETE"), callBack);
  };

  return (
    <div className="mainReportDiv">
      <h2>Post</h2>
      {listReportMessage.map((message, ex) => (
        <div key={ex} className="reportItem">
          <div className='divMessageReport'>
            <h4>{message.name}</h4>
            <p>
              {message.description} : {message.nbrReport}
            </p>
          </div>
          <IoCloseCircle onClick={forceDelete} className="deleteReport" />
        </div>
      ))}
    </div>
  );
});
export default ReportPost;
