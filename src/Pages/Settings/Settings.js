import { Col, Row } from "antd";
import React, { useState } from "react";

import Downloads from "./components/Downloads/Downloads";
import IntradayStockList from "./components/IntradayStockList/IntradayStockList";
import ProfitLossReport from "./components/ProfitLossReport/ProfitLossReport";
import Subscription from "./components/Subscription/Subscription";
import FundView from "./components/FundView/FundView";
import "./Settings.scss";


function Settings(props) {
  const [activeKey, setActiveKey] = useState("fundview");

  const renderActiveTabContent = () => {
    switch (activeKey) {
      case "fundview":
        return <div className="setting-content-wrap">
            <FundView />
          </div>;
      case "subscription":
        return <div className="setting-content-wrap">
            <Subscription />
          </div>;
      case "downloads":
        return <div className="setting-content-wrap">
          <Downloads />
        </div>;
      case "intraday-stock-list":
        return <div className="setting-content-wrap">
          <IntradayStockList />
        </div>;
      case "pl-report":
        return <ProfitLossReport />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-main-wrap">
      <Row gutter={2} className="setting-panel">
        <Col span={6}>
          <div className="setting-left-panel-wrap">
            <span className="setting-title">Settings</span>
            <div
              onClick={() => setActiveKey("fundview")}
              className={`setting-side-item-wrap ${
                activeKey == "fundview" && "active-item"
              }`}
            >
              <span className="item-title">Fund View</span>
             
            </div>
            <div
              onClick={() => setActiveKey("subscription")}
              className={`setting-side-item-wrap ${
                activeKey == "subscription" && "active-item"
              }`}
            >
              <span className="item-title">Subscription</span>
             
            </div>
            <div
              onClick={() => setActiveKey("downloads")}
              className={`setting-side-item-wrap ${
                activeKey == "downloads" && "active-item"
              }`}
            >
              <span className="item-title">Downloads</span>
             
            </div>
            <div
              onClick={() => setActiveKey("intraday-stock-list")}
              className={`setting-side-item-wrap ${
                activeKey == "intraday-stock-list" && "active-item"
              }`}
            >
              <span className="item-title">Intraday Stock List</span>
             
            </div>
            <div
              onClick={() => setActiveKey("pl-report")}
              className={`setting-side-item-wrap ${
                activeKey == "pl-report" && "active-item"
              }`}
            >
              <span className="item-title">Profit & Loss Report</span>
              
            </div>
          </div>
        </Col>
        <Col span={18}>
          {renderActiveTabContent()}
        </Col>
      </Row>
    </div>
  );
}

export default Settings;
