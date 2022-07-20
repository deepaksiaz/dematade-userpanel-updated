import { Button, Col, DatePicker, Input, Pagination, Row, Select, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HiChatAlt, HiDownload, HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../Redux/Actions/orderHistoryAction";
import { ReloadOutlined } from '@ant-design/icons';
import moment from "moment";

import "./OrderHistory.scss";
import PapertradeOrderHistory from "./PapertradeOrders";

const { Option } = Select;

function OrderHistory({ showLabel = true, showSearch = true, showRefresh = true, showDownload=false, showDateFilters=false }) {
  const [ordersData, setOrdersData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [userTradeSelection, setUserTradeSelection] = useState("LIVE");
  const [refreshPapertrade, setRefreshPapertrade] = useState(0);
  const [downloadPapertrade, setDownloadPapertrade] = useState(0);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const dispatch = useDispatch();
  const orderHistoryData = useSelector(
    (state) => state?.OrderHistory?.orderHistory
  );
  const loadingGetOrderHistory = useSelector(
    (state) => state?.OrderHistory?.loadingGetOrderHistory
  );

  useEffect(() => {
    dispatch(getOrderHistory({startDate, endDate}));
  }, []);

  const refeshOrderHistory = () => {
    if (userTradeSelection === "LIVE") dispatch(getOrderHistory());
    if (userTradeSelection === "PAPER") setRefreshPapertrade(refreshPapertrade + 1);
  }

  const downloadOrderHistory = () => {
    if (userTradeSelection === "LIVE") dispatch(getOrderHistory());
    if (userTradeSelection === "PAPER") setDownloadPapertrade(downloadPapertrade + 1);
  }

  useEffect(() => {
    if (userTradeSelection === "LIVE") {
      setOrdersData(
        orderHistoryData
          ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
          ?.filter((item) =>
            search
              ? item?.Trsym?.toLowerCase()?.includes(search?.toLowerCase())
              : true
          )
      );
    }
  }, [userTradeSelection, orderHistoryData, page, pageSize, search]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text, record, index) => (
        <span>{(page - 1) * pageSize + (index + 1)}</span>
      ),
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "Trsym",
      key: "Trsym",
      align: "center",
    },
    {
      title: "TREND",
      dataIndex: "Trantype",
      key: "Trantype",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text == "B" ? "green" : "red"}`}>
          <span>{text == "B" ? "BUY" : "SELL"}</span>
        </div>
      ),
    },
    {
      title: "ORDER ID",
      dataIndex: "Nstordno",
      key: "Nstordno",
      align: "center",
    },
    {
      title: "QTY",
      key: "Qty",
      dataIndex: "Qty",
      align: "center",
    },
    {
      title: "ENTRY PRICE",
      key: "Avgprc",
      dataIndex: "Avgprc",
      align: "center",
    },
    {
      title: "DATE/ TIME",
      key: "OrderedTime",
      dataIndex: "OrderedTime",
      align: "center",
    },
    {
      title: "STATUS",
      key: "Status",
      dataIndex: "Status",
      align: "center",
      render: (text, record) => (
        <span
          className={`status ${
            text == "complete" ? "green-status" : "red-status"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "REJECTION REASON",
      key: "action",
      dataIndex: "RejReason",
      align: "center",
      render: (text, record) => (
        <span>
          <Tooltip arrowPointAtCenter placement="topRight" title={text}>
            <HiChatAlt className="chat-icon-wrap" />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div className="order-history-main-wrap">
      <div className="table-top-panel-section">
        <div className="">
          {showLabel && <span className="title">Order Histor</span>}
          
        </div>
        <div className="right-section">
          <Space>
          {showDateFilters && (
            <Row gutter={12} align="bottom" style={{"border": "0px solid red"}}>
              <Col span={12}>
                  <DatePicker placeholder="Start Date" size="middle" value={startDate} onChange={(date) => setStartDate(date)} />
              </Col>

              <Col span={12}>
                  <DatePicker placeholder="End Date" size="middle" value={endDate} onChange={(date) => setEndDate(date)} />
              </Col>
            </Row>
            )}
            <Select defaultValue={"LIVE"} value={userTradeSelection} onChange={value => setUserTradeSelection(value)}>
              <Option value="LIVE">LIVE TRADE ORDERS</Option>
              <Option value="PAPER">PAPER TRADE ORDERS</Option>
            </Select>
            {showSearch && <Input
              className="search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              suffix={<HiSearch />}
            />}
            {showRefresh && <Button type="primary" shape="circle" icon={<ReloadOutlined />} onClick={refeshOrderHistory} />}
            {showDownload && <Button type="primary" shape="circle" icon={<HiDownload />} onClick={downloadOrderHistory} />}
          </Space>
        </div>
      </div>
      {userTradeSelection === "PAPER" && <PapertradeOrderHistory search={search} refreshPapertrade={refreshPapertrade} downloadPapertrade={downloadPapertrade} startDate={startDate} endDate={endDate}></PapertradeOrderHistory>}
      {userTradeSelection === "LIVE" && <div className="table-wrap">
        <Table
          loading={loadingGetOrderHistory}
          pagination={false}
          columns={columns}
          dataSource={ordersData}
        />
        <div className="pagination-wrap">
          <Pagination
            pageSize={pageSize}
            current={page}
            onChange={(page) => setPage(page)}
            total={orderHistoryData?.length}
          />
          <span className="rows-per-page-title">Rows per page:</span>
          <Select
            className="page-select"
            value={pageSize}
            onChange={(value) => setPageSize(value)}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
          <span className="page-range">
            {(page - 1) * pageSize + 1}-
            {(page - 1) * pageSize + pageSize > orderHistoryData?.length
              ? orderHistoryData?.length
              : (page - 1) * pageSize + pageSize}{" "}
            of {orderHistoryData?.length}
          </span>
        </div>
      </div>
      }
    </div>
  );
}

export default OrderHistory;
