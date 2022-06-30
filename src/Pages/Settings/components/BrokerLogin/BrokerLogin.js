import { AutoComplete, Input, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBrokers,
  aliceBrokerLogin,
} from "../../../../Redux/Actions/BrokerActions";
import "./BrokerLogin.scss";
import Swastika from "../../../../Component/Broker/Swastika/swastika";
import AliceBlue from "../../../../Component/Broker/AliceBlue/aliceBlue";

const { Option } = AutoComplete;

function BrokerLogin(props) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [broker, setBroker] = useState(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const brokerLoggedIn = useSelector((state) => state?.BrokerLogin?.isLoggedIn);

  const onSearchSuccess = (data) => {
    const temp = { ...data };
    temp.value = data.name;
    setOptions([data]);
  };

  const handleSearch = (value) => {
    console.log("handleSearch", value);
    if (value.length > 3) {
      dispatch(searchBrokers(value, onSearchSuccess));
    }
  };

  const onSelect = (value) => {
    const broker = options.find((broker) => broker.name === value);
    setBroker(broker);
  };

  useEffect(() => {
    let search = {};
    if (window.location.search.length) {
      window.location.search
        .substring(1)
        .split("&")
        .map((a) => {
          let b = a.split("=");
          search[b[0]] = b[1];
        });
      if ("authCode" in search && "userId" in search) {
        let { authCode, userId } = search;

        if (!userId || !authCode) {
          notification.error({
            message: "Login Error",
            description: "Enter valid Broker, User ID and Password...",
          });
          return;
        }
        const data = { userId: userId, authToken: authCode };
        dispatch(aliceBrokerLogin(data, () => {}));
      }
    }
  }, []);

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
            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{ width: 400 }}
              onSelect={onSelect}
              onSearch={handleSearch}
              placeholder="Search Broker"
              onChange={onSelect}
            >
              {options.map((option) => (
                <Option
                  className="options"
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </Option>
              ))}
            </AutoComplete>
          </div>

          <AliceBlue />
          {/* <Swastika broker={broker} /> */}
        </center>
      </div>
    </div>
  );
}

export default BrokerLogin;
