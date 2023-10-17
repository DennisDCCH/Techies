import React from "react";
import { Link } from "react-router-dom";

import "./mapSidebar.css";


export default function MapSidebar(props) {

  return (
    <div className="mapsidebar-background">
      <div className="mapsidebar-user-info">
        <img className="mapsidebar-user-info-pic" src={`images/${props.item.userImg}`} alt="User Logo" />
        <h1 className="mapsidebar-user-info-username">{props.item.username}</h1>
      </div>
      <div className="mapsidebar-listing">
        <Link className="mapsidebar-home" to="/homepage">
          Home
        </Link>
      </div>
    </div>
  );
}
