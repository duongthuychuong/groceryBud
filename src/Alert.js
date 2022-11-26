/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    console.log("useEffect");
    return () => {
      console.log("timeout");
      clearTimeout(timeout);
    };
  }, []);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
