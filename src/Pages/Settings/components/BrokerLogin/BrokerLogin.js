import { AutoComplete, Input, notification, Select } from "antd";
import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { brokerLogin, searchBrokers } from "../../../../Redux/Actions/BrokerActions";
import "./BrokerLogin.scss";

const { Option } = AutoComplete;

function BrokerLogin(props) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [broker, setBroker] = useState(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const brokerLoggedIn = useSelector((state) => state?.BrokerLogin?.isLoggedIn);

  const onSearchSuccess = (data) => {
    const temp = {...data};
    temp.value = data.name;
    setOptions([data]);
  }

  const handleSearch = (value) => {
    console.log('handleSearch', value);
    if (value.length > 3) {
      dispatch(searchBrokers(value, onSearchSuccess));
    }
  };

  const onSelect = (value) => {
    const broker = options.find((broker) => broker.name === value);
    setBroker(broker);
  };

  const onLoginBroker = async () => {
    if (!userId || !password || !broker) {
      notification.error({ message: 'Login Error', description:("Enter valid Broker, User ID and Password...")});
      return;
    }
    const data = { broker_id: broker.id, uid: userId, pwd: password };
    dispatch(brokerLogin(data, () => {}) );
  };

  return (
    <div className="auto-login-wrap">
      <div className="login-wrap">
        <center>
          <div className=" upper-part">
            {!brokerLoggedIn ? (
                <div className="offline-btn">
                  <span>Offline</span>
                </div>
              ) : (
                <div className="online-btn">
                  <span>Online</span>
                </div>
            )}
          </div>
          <div className="search-flied">
            <AutoComplete  dropdownMatchSelectWidth={252} style={{ width: 400 }}  onSelect={onSelect} onSearch={handleSearch} placeholder="Search Broker" onChange={onSelect}>
              {options.map((option) => <Option className="options" key={option.name} value={option.name}>{option.name}</Option>)}
            </AutoComplete>
          </div>

          <div className="single-field">
            <span>USER ID</span>
            <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User Id" />
          </div>
          <div className="single-password">
            <span>PASSWORD</span>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
          </div>
          {/* <div className="single-field">
            <span>F2A Password</span>
            
          </div> */}
          <div className="save-btn" onClick={onLoginBroker}>
            <span>LOGIN</span>
          </div>
        </center>
      </div>
    </div>
  );
}

export default BrokerLogin;
