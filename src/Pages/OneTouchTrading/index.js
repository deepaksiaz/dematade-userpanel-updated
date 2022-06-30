import { Button, Col, Input, Modal, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { HiMailOpen, HiOfficeBuilding, HiPhone } from "react-icons/hi";
import "./index.scss";

const { Option } = Select;

function OneTouchTrading(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="onetouch-trading-main-wrap">
      <Button onClick={() => setIsOpen(true)} type="primary" size="large">
        Open one touch trading
      </Button>
      <Modal
        width={600}
        visible={isOpen}
        title="One Touch Trading"
        onCancel={() => setIsOpen(false)}
        className="onetouch-modal"
        cancelText="CLOSE"
        okText="SAVE"
        centered
        okButtonProps={{ size: "large" }}
        cancelButtonProps={{ size: "large" }}
      >
        <Row gutter={30} className="content-single-row">
          <Col span={12}>
            <div className="single-field">
              <span className="label">Exchange</span>
              <Select placeholder="select exchange">
                <Option value={"NSE"}>NSE</Option>
                <Option value={"NFO"}>NFO</Option>
                <Option value={"CDS"}>CDS</Option>
                <Option value={"MCX"}>MCX</Option>
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="single-field">
              <span className="label">Strategic</span>
              <Select placeholder="select strategic">
                <Option value={"Strategic1"}>Strategic1</Option>
                <Option value={"Strategic2"}>Strategic2</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row gutter={30} className="content-single-row">
          <Col span={12}>
            <div className="single-field">
              <span className="label">Trade Type</span>
              <Select placeholder="select trade type">
                <Option value={"NIFTY NFO"}>BANK NIFTY NFO</Option>
                <Option value={"BANK NIFTY NFO"}>BANK NIFTY NFO</Option>
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="single-field">
              <span className="label">Trading Type</span>
              <Select placeholder="select trading type">
                <Option value={"NIFTY NFO"}>BANK NIFTY NFO</Option>
                <Option value={"BANK NIFTY NFO"}>BANK NIFTY NFO</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row gutter={30} className="content-single-row">
          <Col span={12}>
            <div className="single-field">
              <span className="label">Enter Quantity</span>
              <Input
                className="input-number"
                placeholder="quntity"
                size="large"
                type={"number"}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="single-field">
              <span className="label">Order Type</span>
              <Select placeholder="select order type">
                <Option value={"MIS"}>MIS</Option>
                <Option value={"NRML"}>NRML</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row gutter={30} className="content-single-row">
          <Col span={12}>
            <div className="single-field">
              <span className="label">Profit Limit </span>
              <Input
                className="input-number"
                placeholder="profit limit"
                size="large"
                type={"number"}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="single-field">
              <span className="label">Loss Limit </span>
              <Input
                className="input-number"
                placeholder="loss limit"
                size="large"
                type={"number"}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={30} className="content-single-row">
          <Col span={24}>
            <div className="single-field">
              <span className="label">Symnol Name</span>
              <Input
                className="input-number"
                placeholder="Symbol Name"
                size="large"
              />
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default OneTouchTrading;
