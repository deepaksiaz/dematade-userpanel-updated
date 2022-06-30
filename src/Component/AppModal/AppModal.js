import React, { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import featured from "../../../src/Assets/Images/Featured.svg"
import "./AppModal.css";

AppModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

function AppModal(props) {
  const [show, setShow] = useState(props.show);
  if (!show) return null;

  const onHide = () => {
    props.onHide();
    setShow(false);
  };

  const handleOk = () => {
    if (props.handleOk) props.handleOk();
  };

  const handleCancel = () => {
    if (props.handleCancel) props.handleCancel();
    setShow(false);
  };
  return (
    <Modal
      title={props.title}
      okText="Yes"
      cancelText="No"
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel} footer={null}
    >
      <div className="img_pop">
        <img src={featured} alt=""></img>
      </div>
      {props.children}
      <div className="footer1">
        <button className="button_1" onClick={handleOk}>
          Confirm
        </button>
        <button className="button_2" onClick={handleCancel}>
          Discard
        </button>
      </div>
    </Modal>
  );
}

export default AppModal;
