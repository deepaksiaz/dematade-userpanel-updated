import { Input, notification } from "antd";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { brokerLogin ,angelBrokerLogin} from "../../../Redux/Actions/BrokerActions";
import "../Swastika/swastika.scss";

function AngelBroking({ broker }) {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onLoginBroker = async () => {
    if (!userId || !password || !broker) {
      notification.error({
        message: "Login Error",
        description: "Enter valid Broker, User ID and Password...",
      });
      return;
    }
      const data = {clientcode: userId, password: password };
      dispatch(angelBrokerLogin(data, () => {}));
  };
  return (
    <div className="container">
      <div className="single-field">
        <span>USER ID</span>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User Id"
        />
      </div>
      <div className="single-password">
        <span>PASSWORD</span>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>
      <div className="save-btn" onClick={onLoginBroker}>
        <span>LOGIN</span>
      </div>
    </div>
  );
}

export default AngelBroking;
