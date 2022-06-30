import React from "react";
import "./aliceBlue.scss";

function AliceBlue({ broker }) {

  const onLoginBroker = async () => {
    window.location.replace(
      "https://a3.aliceblueonline.com/?appcode=sirRVI8tZQeYpUS"
    );
  };

  return (
    <div className="container">
      <div className="save-btn" onClick={onLoginBroker}>
        <span>LOGIN</span>
      </div>
    </div>
  );
}

export default AliceBlue;
