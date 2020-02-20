import React from "react";

import logo from "../images/notepad.png";
import "./Navi.scss";

export const Navi = () => {
  return (
    <div className="Navi ui borderless main menu ">
      <div className="ui text container">
        <div className="header item">
          <img className="logo" src={logo} alt="logo"></img>
          Notepad by Karol Kołodziej
        </div>
      </div>
    </div>
  );
};
