import { Tabs } from "antd";
import React from "react";
import DayTrading from "./components/DayTrading/DayTrading";
import OpenPosition from "./components/OpenPosition/OpenPosition";
import "./index.scss";
import OrderHistory from '../../Pages/OrderHistory/OrderHistory'
const { TabPane } = Tabs;

function Dashboard(props) {
  const [activeTab, setActiveTab] = React.useState("1");

  const onTabChange = (key) => {
    setActiveTab(key);
  }

  return (
    <div className="dashboard-main-wrapper">
      <div className="dashboard-tabs-wrap">
        <Tabs defaultActiveKey="1" type="card" onChange={onTabChange}>
          <TabPane tab="Day Trading" key="1">
            {activeTab == 1 && <DayTrading />}
          </TabPane>
          {/* <TabPane tab="Positional Trading" key="2">
            <PositionTrading />
          </TabPane> */}
          {/* <TabPane tab="Paper Trading" key="3">
            <DayTrading isPaperTrading={true} />
          </TabPane> */}
          <TabPane tab="Open Position" key="3">
            {activeTab == 3 && <OpenPosition />}
          </TabPane>
          <TabPane tab="Order History" key="4">
            {activeTab == 4 && <OrderHistory />}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
