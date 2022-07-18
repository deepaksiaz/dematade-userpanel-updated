import React, { useEffect, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Switch, Select } from "antd";
import { Form, Button, Input, Space, Tabs, Table } from "antd";
import "./CopyTrade.scss";
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 26,
      color: "#1890ff",
    }}
  />
);

const onSearch = (value) => console.log(value);

const columnsuser = [
  {
    title: "Broker Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mobile No",
    dataIndex: "mob",
    key: "mob",
  },
  {
    title: "Broker ID",
    dataIndex: "Brokerid",
    key: "Brokerid",
  },
  {
    title: "Status",
    dataIndex: "Brokerid",
    key: "Brokerid",
  },
];
const pending = [
  {
    title: "Client Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mobile No",
    dataIndex: "mob",
    key: "mob",
  },
  {
    title: "Broker ID",
    dataIndex: "Brokerid",
    key: "Brokerid",
  },
  {
    title: "Status",
    dataIndex: "Brokerid",
    key: "Brokerid",
  },
];

const active = [
  {
    title: "Client Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mobile No",
    dataIndex: "mob",
    key: "mob",
  },
  {
    title: "Broker ID",
    dataIndex: "Brokerid",
    key: "Brokerid",
  },
  {
    title: "Copy ON/OFF",
    dataIndex: "Brokerid",
    key: "Brokerid",
  },
];
const options = ["USER", "BROKER"];

const CopyTrade = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
  const [valued, setvalued] = useState(null);
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  const [size, setSize] = useState("large");
  const onSelect = (value) => {
    const broker = options.find((broker) => broker === value);

    const name = broker;
    setvalued(name);
    console.log(name);
  };
  const onChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className="copytrade">
      <div className="copy-body">
        <div className="c-heading">COPY TRADE</div>
        <div>
          <Select
            showSearch
            className="options options-1"
            style={{ width: 200, textAlign: "left" }}
            placeholder="SELECT ROLE"
            onSelect={onSelect}
            onChange={onSelect}
            notFoundContent={null}
          >
            {options.map((option) => (
              <Option className="options" key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>{" "}
          Copy Trade ON/OFF
          <Switch
            style={{
              backgroundColor: "#73d13d",
              marginBottom: "5px",
              marginLeft: "10px",
            }}
          ></Switch>
        </div>
      </div>
      {valued === "BROKER" && (
        <div className="copy-body-1">
          <div className="sub-copy-body">
            <h1>Send Request</h1>
            <div>
              <Space>
                <Search
                  placeholder="Enter Client Mobile No"
                  allowClear
                  enterButton="Search"
                  size="large"
                  style={{ marginBottom: "20px" }}
                  onSearch={onSearch}
                />
              </Space>
              <Form form={form} name="horizontal_login" layout="inline">
                <Form.Item>
                  <Input placeholder="Client Name" disabled size="large" />
                </Form.Item>
                <Form.Item>
                  <Input placeholder="Broker client ID" size="large" disabled />
                </Form.Item>
                <Form.Item>
                  <Button size="large" type="primary">
                    Send Request
                  </Button>
                </Form.Item>
              </Form>
              <br></br>
              <br></br>
              <Tabs defaultActiveKey="1" type="card" size={size}>
                <TabPane tab=" Active" key="1">
                  <Table pagination={false} columns={active} />
                </TabPane>
                <TabPane tab="Pending" key="2">
                  <Table pagination={false} columns={pending} />
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="sub-copy-body">
            <h1 style={{ margin: "10px" }}>DO</h1>
            <ul>
              <li>Always select a reliable copy trader.</li>
              <li>
                Always analysis performance report of the copy trader on weekly
                basis.
              </li>
              <li>
                Anytime Copy trade button can be turn off If not satisfied with
                copy trader performance or product.
              </li>
            </ul>
            <h1 style={{ margin: "10px" }}>Don’t</h1>
            <ul>
              <li>
                Don’t share your broker id & password with anyone /copy trader
              </li>
              <li>
                Don’t share your DeMatade mobile no. and OTP with anyone /copy
                trader.
              </li>
              <li>
                Don’t close your copy trader button if your position is running.
              </li>
            </ul>
            <br></br>
            <br></br>
            <h4>
              note : - We are not responsible of profit and loss between the
              user and copy trader.{" "}
            </h4>
          </div>
        </div>
      )}
      {valued === "USER" && (
     
        <div className="copy-body-1">
          <div className="sub-copy-body">
          <Table pagination={false} columns={columnsuser} />
            
          </div>
          <div className="sub-copy-body">
            <h1 style={{ margin: "10px" }}>DO</h1>
            <ul>
              <li>Always select a reliable copy trader.</li>
              <li>
                Always analysis performance report of the copy trader on weekly
                basis.
              </li>
              <li>
                Anytime Copy trade button can be turn off If not satisfied with
                copy trader performance or product.
              </li>
            </ul>
            <h1 style={{ margin: "10px" }}>Don’t</h1>
            <ul>
              <li>
                Don’t share your broker id & password with anyone /copy trader
              </li>
              <li>
                Don’t share your DeMatade mobile no. and OTP with anyone /copy
                trader.
              </li>
              <li>
                Don’t close your copy trader button if your position is running.
              </li>
            </ul>
            <br></br>
            <br></br>
            <h4>
              note : - We are not responsible of profit and loss between the
              user and copy trader.{" "}
            </h4>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default CopyTrade;
