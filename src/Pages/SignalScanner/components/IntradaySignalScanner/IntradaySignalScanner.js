import { Input, Pagination, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getStrtegicOptionsData } from "../../../../Redux/Actions/dayTradingActions";
import { getPositionalSignalscannerData } from "../../../../Redux/Actions/signalScannerActions";
import DayTrading from "../../../../data/DayTrading.json";
import "./IntradaySignalScanner.scss";
import socket from "../../../../hooks/useSocket";

const { Option } = Select;

function IntradaySignalScanner(props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [positionalData, setPositionalData] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [trendType, setTrendType] = useState(null);
  const [strategic, setStrategic] = useState(null);
  const [tradeType, setTradeType] = useState(null);
  const positionalScannerData = useSelector((state) => state?.SignalScanner?.positionalSignalScannerData);
  const loading = useSelector((state) => state?.SignalScanner?.loadingGetPositionalSignalScanner);
  const strategicOptionsData = useSelector((state) => state?.DayTrading?.strategicOptions);
  const [prices, setPrices] = useState({}); 

  useEffect(() => {
    const price_socket_fn = (data) => setPrices(data);
    const price_socket = socket("DEMATADE:SCANNER_PRICES_ROOM", price_socket_fn);
    return () => {
      if (price_socket) price_socket("DEMATADE:SCANNER_PRICES_ROOM", price_socket_fn);
    };
  }, []);

  useEffect(() => {
    const filter = { type: 1 };
    if (search) filter.search = search;
    if (tradeType && tradeType !== "select all") filter.tradeType = tradeType;
    if (strategic && strategic !== "select all") filter.strategic = strategic;
    if (trendType && trendType !== "BOTH" ) filter.trend = trendType;
    setPage(1);
    dispatch(getPositionalSignalscannerData(filter));
  }, [search, tradeType, trendType, strategic])

  useEffect(() => {
    const queryPayload = { type: 1 };
    dispatch(getPositionalSignalscannerData(queryPayload));
    dispatch(getStrtegicOptionsData());
  }, []);

  useEffect(() => {
    setPositionalData(
      positionalScannerData?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    );
  }, [
    positionalScannerData,
    search,
    trendType,
    strategic,
    tradeType,
    pageSize,
    page,
  ]);

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
      dataIndex: "symbol_name",
      key: "symbol_name",
      align: "center",
    },
    {
      title: "TREND",
      dataIndex: "trend",
      key: "trend",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text == "BUY" ? "green" : "red"}`}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "CURRENT PRICE",
      key: "current_price",
      dataIndex: "current_price",
      align: "center",
      render: (text, record) => (
        <div>
          <span>{prices[record.symbol_token]}</span>
        </div>
      ),
    },
    {
      title: "ENTRY PRICE",
      key: "entry_price",
      dataIndex: "entry_price",
      align: "center",
    },
    {
      title: "STOP LOSS",
      key: "stop_loss",
      dataIndex: "stop_loss",
      align: "center",
    },
    {
      title: "Target",
      key: "target",
      dataIndex: "target",
      align: "center",
    },
    {
      title: "SIGNAL TYPE",
      key: "signal_type",
      dataIndex: "signal_type",
      align: "center",
    },
    {
      title: "Signal Date",
      key: "action",
      dataIndex: "createdAt",
      align: "center",
      render: (text, record) => (
        <div>
          <span>{new Date(text).toLocaleString()}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="intraday-signal-scanner-main-wrap">
      <div className="table-top-panel-section">
        <div className="left-section">
          <Select
            value={tradeType}
            onChange={(value) => setTradeType(value)}
            allowClear
            onClear={() => setTradeType(undefined)}
            className="options-select options"
            placeholder="select option"
          >
            <Option className="options" value="select all" key="Select All">Select All</Option>
            {DayTrading.map(item => {
              return (
                <Option className="options" value={item.tradeType} key={item.tradeType}>
                  {item.type}
                </Option>
              );
            })
            }
          </Select>
          <Select
            className="options-select options"
            value={strategic}
            allowClear
            onClear={() => setStrategic(undefined)}
            onChange={(value) => setStrategic(value)}
            placeholder="Select Strategic"
          >
            <Option className="options" value="select all" key="Select All">Select All</Option>
            {strategicOptionsData?.map((item) => {
              return (
                <Option className="options" key={item?.id} value={item?.strategicName}>
                  {item?.strategicName}
                </Option>
              );
            })}
          </Select>
          <Select
            value={trendType}
            onChange={(value) => setTrendType(value)}
            className="buy-sell-select options"
            placeholder="Select trend"
            allowClear
            onClear={() => setTrendType(undefined)}
          >
            <Option value={"BOTH"}>BOTH</Option>
            <Option value={"BUY"}>BUY</Option>
            <Option value={"SELL"}>SELL</Option>
          </Select>
        </div>
        <div className="right-section">
          <Input
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            suffix={<HiSearch />}
          />
        </div>
      </div>
      <div className="table-wrap">
        <Table
          loading={loading}
          pagination={false}
          columns={columns}
          dataSource={positionalData}
        />
        <div className="pagination-wrap">
          <Pagination
            pageSize={pageSize}
            current={page}
            showSizeChanger={false}
            onChange={(page) => setPage(page)}
            total={positionalScannerData?.length}
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
            {(page - 1) * pageSize + pageSize > positionalScannerData?.length
              ? positionalScannerData?.length
              : (page - 1) * pageSize + pageSize}{" "}
            of {positionalScannerData?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default IntradaySignalScanner;
