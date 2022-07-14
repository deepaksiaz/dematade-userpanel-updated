import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message,notification, Select } from "antd";
import { HiSwitchHorizontal } from "react-icons/hi";
import "./OpenPosition.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOpenPositions, squareOffOrder } from "../../../../Redux/Actions/positionsActions";
import socket from "../../../../hooks/useSocket";
import AppModal from "../../../../Component/AppModal/AppModal";
import { squareOffPapertradePosition } from "../../../../Redux/Actions/PaperTradingActions";

const { Option } = Select;

function OpenPapertradePosition(props) {
  const dispatch = useDispatch();
  const [squareOffConfirmation, setSquareOffConfirmation] = useState({show: false, data: null});
  const [positionsData, setPositionsData] = useState([]);
  useEffect(() => {
    const positions_socket = socket("DEMATADE:PAPER_TRADE_ROOM", (data) => {
      setPositionsData(data.papertrade_positions);
    });
     console.log("dd",positionsData)
    return () => {
      if (positions_socket) positions_socket();
    };
   
  }, []);

  const columns = [
    // {
    //   title: "EXCHANGE",
    //   dataIndex: "exchange",
    //   key: "exchange",
    //   align: "center",
    // },
    // {
    //   title: "ORDER TYPE",
    //   dataIndex: "PCode",
    //   key: "PCode",
    //   align: "center",
    // },
    {
      title: "SYMBOL NAME",
      dataIndex: "symbol_name",
      key: "symbol_name",
      align: "center",
    },
    {
      title: "BUY QTY",
      key: "Bqty",
      dataIndex: "Bqty",
      align: "center",
      render: (qty, record) => (
        <div><span>{qty}</span></div>
      ),
    },
    {
      title: "SELL QTY",
      key: "Sqty",
      dataIndex: "Sqty",
      align: "center",
      render: (qty, record) => (
        <div><span>{qty}</span></div>
      ),
    },
    {
        title: "Entry Price",
        key: "entry_price",
        dataIndex: "entry_price",
        align: "center",
        render: (entry_price, record) => (
          <div>
            <span>{parseInt('' + entry_price).toFixed(2)}</span>
          </div>
        ),
      },
    {
      title: "LTP",
      key: "ltp",
      dataIndex: "ltp",
      align: "center",
      render: (ltp, record) => (
        <div>
          <span>{ltp?ltp > 0 ? `+ ${parseInt('' + ltp).toFixed(2)}` : `${parseInt('' + ltp).toFixed(2)}`:0}</span>
        </div>
      ),
    },
    {
      title: "P&L",
      key: "MtoM",
      dataIndex: "MtoM",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text >= 0 ? "green" : "red"}`}>
          <span>{text > 0 ? `+ ${parseInt('' + text).toFixed(2)}` : `${parseInt('' + text).toFixed(2)}`}</span>
        </div>
      ),
    },
    {
      title: "SQUARE OFF",
      key: "action",
      align: "center",
      render: (text, record) =>
        record?.Bqty !== record?.Sqty && (
          <HiSwitchHorizontal
            onClick={() => setSquareOffConfirmation({show: true, data: record})}
            className="square-off-icon"
          />
        ),
    },
  ];

  const onSquareOfConfirmation = (record) => {
    debugger;
    dispatch(squareOffPapertradePosition(record));
    setSquareOffConfirmation({show: false, data: null});
  }

  return (
    <div className="open-position-main-wrap">
      
        <Table
          columns={columns}
          dataSource={positionsData}
        />

        {squareOffConfirmation.show && (
          <AppModal
            title="Trade Confirmation"
            show={squareOffConfirmation.show}
            handleCancel={() =>
              setSquareOffConfirmation({ ...squareOffConfirmation, show: false })
            }
            handleOk={() => onSquareOfConfirmation(squareOffConfirmation.data)}
          >
            <p className="message_pop">Are you sure?</p>
          </AppModal>
        )}
      
    </div>
  );
}

export default OpenPapertradePosition;
