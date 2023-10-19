import React from "react";
import { Link } from "react-router-dom";

import "./mapSidebar.css";


export default function MapSidebar(props) {
  const userImgSrc = props.item.userImg !== "" ? `/images/${props.item.userImg}` : "/images/human-logo.png";
  return (
    <div className="mapsidebar-background">
      <div className="mapsidebar-user-info">
        <img className="mapsidebar-user-info-pic" src={userImgSrc} alt="User Logo" />
        <h1 className="mapsidebar-user-info-username">{props.item.username}</h1>
      </div>
      <div className="mapsidebar-listing">
        <Link className="mapsidebar-home" to="/homepage">Home</Link>
      </div>
    </div>
  );
}
