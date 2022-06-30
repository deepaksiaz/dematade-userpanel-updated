import { Col, DatePicker, Row, Select } from "antd";
import React from "react";
import OrderHistory from "../../../OrderHistory/OrderHistory";
import "./ProfitLossReport.scss";

const { Option } = Select;

function ProfitLossReport(props) {
  return (
    <OrderHistory showLabel={false} showSearch={false} showRefresh={true} showDownload={true} showDateFilters={true}></OrderHistory>
  );
}

export default ProfitLossReport;
