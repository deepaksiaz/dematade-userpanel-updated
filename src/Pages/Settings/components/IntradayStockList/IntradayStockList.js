import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIntradayStockListData } from "../../../../Redux/Actions/settingActions";
import "./IntradayStockList.scss";

function IntradayStockList(props) {
  const [intradayStockList, setIntradayStockList] = useState();
  const intradayStockListData = useSelector(
    (state) => state?.Setting?.intradayStockListData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIntradayStockListData());
  }, []);

  useEffect(() => {
    setIntradayStockList(intradayStockListData);
  }, [intradayStockListData]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 100,
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "symbol",
      key: "symbol",
      align: "center",
      width: 200,
    },
  ];

  return (
    <div className="intraday-stock-list-main-wrap">
      <Row>
        <Col span={10}>
          <Table
            pagination={false}
            columns={columns}
            dataSource={intradayStockList}
          />
        </Col>
      </Row>
    </div>
  );
}

export default IntradayStockList;
