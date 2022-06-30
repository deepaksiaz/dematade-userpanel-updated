import React from "react";
import "./index.scss";

function Tutorials(props) {
  return (
    <div className="contact-us-main-wrap">
      <div className="contactus-content-wrap">
        <div className="top-section">
          <p className="header">Tutorial</p>
          <p className="sub-header">
            How to start algo automatic trading with swasktika broker
          </p>
          <iframe
            width="629"
            height="450"
            src="https://www.youtube.com/embed/iDrHA55l3SE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;
