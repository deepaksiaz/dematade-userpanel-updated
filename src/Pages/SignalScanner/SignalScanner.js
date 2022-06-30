import React from "react";
import { Tabs } from "antd";
import "./SignalScanner.scss";
import IntradaySignalScanner from "./components/IntradaySignalScanner/IntradaySignalScanner";
import PositionalSignalScanner from "./components/PositionalSignalScanner/PositionalSignalScanner";

const { TabPane } = Tabs;

function SignalScanner(props) {
  return (
    <div className="signal-scanner-main-wrap">
      <div className="signal-scanner-tabs-wrap">
        <IntradaySignalScanner />
        {/* <Tabs destroyInactiveTabPane defaultActiveKey="1" type="card">
          <TabPane tab="Intraday Signal Scanner" key="1">
            <IntradaySignalScanner />
          </TabPane>
          <TabPane tab="Positional Signal Scanner" key="2">
            <PositionalSignalScanner />
          </TabPane>
        </Tabs> */}
      </div>
    </div>
  );
}

export default SignalScanner;
