import { Input, Pagination, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HiChatAlt, HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { downloadPapertradOrderHistory, getPapertradOrderHistory } from "../../Redux/Actions/orderHistoryAction";
import "./OrderHistory.scss";

const { Option } = Select;

function PapertradeOrderHistory(props) {
  const [ordersData, setOrdersData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState(props.search);
  const dispatch = useDispatch();
  const orderHistoryData = useSelector((state) => state?.OrderHistory?.papertradeOrderHistory);
  const loadingGetOrderHistory = useSelector((state) => state?.OrderHistory?.loadingGetOrderHistory);

  useEffect(() => {
    const payload = {};
    if (props.startDate) payload.startDate = props.startDate;
    if (props.endDate) payload.endDate = props.endDate;
    dispatch(getPapertradOrderHistory(payload));
  }, [props.refreshPapertrade]);


  useEffect(() => {
    if (props.downloadPapertrade > 0) {
      const payload = {};
      if (props.startDate) payload.startDate = props.startDate;
      if (props.endDate) payload.endDate = props.endDate;
      dispatch(downloadPapertradOrderHistory(payload));
    }
  }, [props.downloadPapertrade]);
  
  useEffect(() => {
    setOrdersData(
      orderHistoryData
        ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
        ?.filter((item) =>
          search
            ? item?.Trsym?.toLowerCase()?.includes(search?.toLowerCase())
            : true
        )
    );
  }, [orderHistoryData, page, pageSize, search]);

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
      title: "ORDER ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "QTY",
      key: "qty",
      dataIndex: "qty",
      align: "center",
    },
    {
      title: "ENTRY PRICE",
      key: "entry_price",
      dataIndex: "entry_price",
      align: "center",
    },
    {
      title: "DATE/ TIME",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (text, record) => (
        <div>
          <span>{new Date(record.createdAt).toLocaleString()}</span>
        </div>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
      align: "center"
    }
  ];

  return (
    <div>
      <div className="table-wrap">
          {props.search}
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
    </div>
  );
}

export default PapertradeOrderHistory;
