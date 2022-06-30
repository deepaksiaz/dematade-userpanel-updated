import { Col, Divider, Input, Row, Select, Switch } from "antd";
import React from "react";
import "./PositionTrading.scss";

const { Option } = Select;

function PositionTrading(props) {
  return (
    <div className="day-trading-panel-wrap">
      <Row gutter={[40, 24]}>
        {[
          {
            tradeType: "BANKNIFTY NFO",
            note: "For 1 Lot 2 Lacs capital required.",
          },
          {
            tradeType: "NIFTY NFO",
            note: "For 1 Lot 1.8 Lacs capital required.",
          },
        ]?.map((item) => {
          return (
            <Col span={8}>
              <div className="single-card">
                <div className="card-header">
                  <span className="header-title">{item?.tradeType}</span>
                </div>
                <div className="card-body">
                  <Row align="middle" justify="center">
                    <div className="count-value success">
                      <span>+123456789.OO</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="single-field">
                      <span className="label">Apply Strategic</span>
                      <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </div>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Lot Size *</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Profit Limit</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Loss Limit</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Profit Limit</span>
                        <Switch
                          className="trade-switch"
                          defaultChecked={true}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Loss Limit</span>
                        <Switch
                          className="trade-switch"
                          defaultChecked={true}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div className="save-btn">
                        <span>Save</span>
                      </div>
                      <span>
                        <b>Note: </b>
                        {item?.note}
                      </span>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          );
        })}
        {[
          {
            tradeType: "NSE CASH",
            note: "For CNC Full margin required according to stock price",
          },
          {
            tradeType: "STOCK NFO",
            note: "For 1 Lot one symbol 2.5 Lacs capital required.",
          },
          {
            tradeType: "MCX NFO",
            note: "For 1 Lot one symbol 3 Lacs capital required.",
          },
          {
            tradeType: "NSE-CURRENCY",
            note: "For 1 Lot one symbol 20k capital required.",
          },
        ]?.map((item) => {
          return (
            <Col span={8}>
              <div className="single-card">
                <div className="card-header">
                  <span className="header-title">{item?.tradeType}</span>
                </div>
                <div className="card-body">
                  <Row align="middle" justify="center">
                    <div className="count-value success">
                      <span>+123456789.OO</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="single-field">
                      <span className="label">Apply Strategic</span>
                      <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </div>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Lot Size *</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Count of Stock *</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Profit Limit</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Loss Limit</span>
                        <Input
                          className="input-number"
                          defaultValue={20}
                          size="large"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Profit Limit</span>
                        <Switch
                          className="trade-switch"
                          defaultChecked={true}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Loss Limit</span>
                        <Switch
                          className="trade-switch"
                          defaultChecked={true}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div className="save-btn">
                        <span>Save</span>
                      </div>
                      <span>
                        <b>Note: </b>
                        {item?.note}
                      </span>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default PositionTrading;
