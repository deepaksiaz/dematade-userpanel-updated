import { Input, message, Modal, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brokerLogin } from "../../Redux/Actions/BrokerActions";
import "./LoginModal.scss";

function LoginModal(props) {
  const { visible, setvisible } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state?.BrokerLogin?.brokerLoginLoading
  );

  const onLoginBroker = async () => {
    if (!userId || !password) {
      message.error("Enter valid userID and password..");
      return;
    }
    const data = { uid: userId, pwd: password };
    dispatch(
      brokerLogin(data, () => {
        setvisible(false);
      })
    );
  };

  return (
    <div className="login-modal-main-wrap">
      <Modal
        className="login-broker-modal"
        visible={visible}
        title="Login Broker"
        okText="Login"
        cancelText="Cancel"
        onOk={() => onLoginBroker()}
        onCancel={() => setvisible(false)}
        okButtonProps={{ loading: loading }}
       
      >
        <Row className="row-wrap">
          <label>User ID</label>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User Id"
          />
        </Row>
        <Row className="row-wrap">
          <label>Password</label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Row>
      </Modal>
    </div>
  );
}

export default LoginModal;
