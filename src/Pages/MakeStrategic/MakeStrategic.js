import { Button, Input, message,notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { HiMailOpen, HiOfficeBuilding, HiPhone } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { sendContactUsMessag } from "../../Redux/Actions/AuthActions";
import "./MakeStrategic.scss";
export const MakeStrategic = () => {
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
    <div className="createstrategic">
    <div className="contactus-content-wrap">
   
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
            <label>Strategic Name</label>
            <Input
              type={"input"}
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
              placeholder="Enter Strategic Name"
            />
          </div>
          <div className="single-field">
            <label>Message</label>
            <TextArea
              value={messageVal}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Enter your Strategic Description"
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
        <div className="left-box">
          <center><span className="title">Make Your Own Strategic</span></center>
          <div className="subtitle options">
          About Your Strategic Development
          </div>
          <div className="aboutstrategic">
            <ul className="about-bullet options">
                <li>Submit your Strategic details our Team will contact you for development.</li>
                <li>We can make your own strategic and we will add your strategic in only particular account.</li>
                <li>You strategic is confidential and we will take responsibility. </li>
                <li>After Development we can share 1 Year Back-test Data for you develop strategic.</li>
                <li>You can also do Paper trade in live market after develop your strategic.</li>
                   <li>Strategic development takes time 4-5 days.</li>
                <li>Strategic development charges will come around 4-5K.  This is only estimated for normal strategic.</li>
                
            </ul>
            </div>
          </div>
        </div>
 
    </div>
   
   
  )
}
