import { Button, Input, message,notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { HiMailOpen, HiOfficeBuilding, HiPhone } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { sendContactUsMessag } from "../../Redux/Actions/AuthActions";
import "./index.scss";

function ContactUs(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [messageVal, setMessage] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function checkIfValidIndianMobileNumber(str) {
    // Regular expression to check if string is a Indian mobile number
    const regexExp = /^[6-9]\d{9}$/gi;

    return regexExp.test(str);
  }

  const onSendMessage = () => {
    if (
      !name ||
      !email ||
      !mobileNum ||
      !messageVal ||
      !validateEmail(email) ||
      !checkIfValidIndianMobileNumber(mobileNum)
    ) {
      notification.error({ message: 'Notification',
      description:("Please enter valid details...", 2)});
    
      return;
    }
    setLoading(true);
    const payload = {
      name: name,
      email: email,
      mobile: mobileNum,
      message: messageVal,
    };
    dispatch(
      sendContactUsMessag(
        payload,
        () => {
          notification.success({ message: 'Notification',
        description:("Thank you for contact us..our team will contact you with 3 hours..")});
          setName("");
          setEmail("");
          setMobileNum("");
          setMessage("");
          setLoading(false);
        },
        (e) => {
          notification.error({ message: 'Notification',
          description:(e || "Failed to send message..")});
         
          setLoading(false);
        }
      )
    );
  };
  return (
    <div className="contact-us-main-wrap">
      <div className="contactus-content-wrap">
        <div className="left-box">
          <span className="title">Contact Us</span>
          <div className="subtitle">
            Please call or email and we will be happy to assist you.

            7777777777
          </div>
          <div className="single-box">
            <HiPhone className="icon" />
            <div className="box-content">
              <span className="box-content-label">Phone</span>
              <span className="box-content-value">+91 9321446611</span>
              <span className="box-content-value">+91 9321446622</span>
              <span className="box-content-value">+91 9321446633</span>
            </div>
          </div>
          <div className="single-box">
            <HiMailOpen className="icon" />
            <div className="box-content">
              <span className="box-content-label">Email</span>
              <span className="box-content-value">support@dematadesolution.com</span>
            </div>
          </div>
          <div className="single-box">
            <HiOfficeBuilding className="icon" />
            <div className="box-content">
            <span className="box-content-label">Address</span>
              <span className="box-content-value">
                Office No. 604, Shagun Insignia, Sector-19, Plot No. 195, Ulwe, Navi Mumbai-410206
              </span>
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="single-field">
            <label>Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </div>
          <div className="single-field">
            <label>Email Id</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Id"
            />
          </div>
          <div className="single-field">
            <label>Mobile No</label>
            <Input
              type={"number"}
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="single-field">
            <label>Message</label>
            <TextArea
              value={messageVal}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Enter your message here"
            />
          </div>
          <div className="send-message-btn">
            <Button
              loading={loading}
              onClick={onSendMessage}
              variant="contained"
              className="send-btn"
            >
              SEND Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
