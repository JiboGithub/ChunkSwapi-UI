import React from "react";
import "../styles/buttonLoader.css";

const ButtonLoader = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ButtonLoader;
