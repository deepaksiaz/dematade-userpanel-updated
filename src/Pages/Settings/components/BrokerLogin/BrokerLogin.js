import { AutoComplete, Input, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBrokers,
  aliceBrokerLogin,
  angelBrokerLogin
} from "../../../../Redux/Actions/BrokerActions";
import "./BrokerLogin.scss";
import Swastika from "../../../../Component/Broker/Swastika/swastika";
import AliceBlue from "../../../../Component/Broker/AliceBlue/aliceBlue";
import  AngelBroking from "../../../../Component/Broker/AngelBroking/angelbroking";

const { Option } = Select;

function BrokerLogin(props) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [broker, setBroker] = useState(null);
  const [valued,setvalued]=useState(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const brokerLoggedIn = useSelector((state) => state?.BrokerLogin?.isLoggedIn);

  const onSearchSuccess = (data) => {
    const temp = { ...data };
    temp.value = data.name;
    setOptions([data]);
  };

  const handleSearch = (value) => {
    
    if (value.length > 3) {
      dispatch(searchBrokers(value, onSearchSuccess));
    }
  };

  const onSelect = (value) => {
    const broker = options.find((broker) => broker.name === value);
    setBroker(broker);
    const name=broker.name
      setvalued(name);
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
            <Select
            showSearch
            className="options"
            style={{ width: 200,textAlign:"left" }}
              onSelect={onSelect}
              onSearch={handleSearch}
              placeholder="Search Broker"
              onChange={onSelect}
              notFoundContent={null}
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
            </Select>
          </div>
          { valued==="SWASTIKA" && <div><Swastika broker={broker}></Swastika></div>}
          { valued==="ALICE BLUE" && <div><AliceBlue broker={broker}></AliceBlue></div>}
          { valued==="ANGEL BROKING" && <div><AngelBroking broker={broker}/></div>}
          
          {/* <Swastika broker={broker} /> */}
        </center>
      </div>
    </div>
  );
}

export default BrokerLogin;
