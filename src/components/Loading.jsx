import React from "react";
import "../styles/Loading.css";

const Loading = () => {
  return (
    <div className="lds-ring__container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
