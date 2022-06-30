import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message,notification, Select,Input } from "antd";
import { HiSwitchHorizontal,HiSearch} from "react-icons/hi";
import "./OpenPosition.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOpenPositions, squareOffOrder } from "../../../../Redux/Actions/positionsActions";
import socket from "../../../../hooks/useSocket";
import AppModal from "../../../../Component/AppModal/AppModal";
import OpenPapertradePosition from "./OpenPapertradePosition";

const { Option } = Select;

function OpenPosition(props) {
  const [squareOffConfirmation, setSquareOffConfirmation] = useState({show: false, data: null});
  const [positionsData, setPositionsData] = useState([]);
  const [userTradeSelection, setUserTradeSelection] = useState("LIVE");
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.Positions.positions);
  const positionsLoading = useSelector(
    (state) => state.Positions.loadingGetPositions
  );

  const loadingSquareOffPosition = useSelector(
    (state) => state.Positions.loadingSquareOffPosition
  );

  useEffect(() => {
    dispatch(getOpenPositions());
  }, []);

  useEffect(() => {
    setPositionsData(positions || []);
  }, [positions]);

  useEffect(() => {
    const positions_socket = socket("positions", (new_data) => {
      setPositionsData(new_data);
    });
    return () => {
      if (positions_socket) positions_socket();
    };
  }, []);

  const onSquareOfOrder = (record) => {
    const data = {
      Bqty: record?.Bqty,
      Sqty: record?.Sqty,
      PCode: record?.PCode,
      broker_client_id: record?.broker_client_id,
      Tsym: record?.Tsym,
      exchange: record?.exchange,
      entry_price: record?.entry_price,
      ...record
    };
    dispatch(
      squareOffOrder(
        data,
        () => {
          notification.success({ message: 'Notification',
            description:("Squred off successfully..")});
          dispatch(getOpenPositions());
        },
        (error) => {
          notification.error({ message: 'Notification',
            description:(error || "Failed to square off order..")});
        }
      )
    );
  };

  const columns = [
    {
      title: "EXCHANGE",
      dataIndex: "exchange",
      key: "exchange",
      align: "center",
    },
    {
      title: "ORDER TYPE",
      dataIndex: "PCode",
      key: "PCode",
      align: "center",
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "Tsym",
      key: "Tsym",
      align: "center",
    },
    {
      title: "BUY QTY",
      key: "Bqty",
      dataIndex: "Bqty",
      align: "center",
    },
    {
      title: "SELL QTY",
      key: "Sqty",
      dataIndex: "Sqty",
      align: "center",
    },
    {
      title: "LTP",
      key: "ltp",
      dataIndex: "ltp",
      align: "center",
      render: (ltp, record) => (
        <div>
          <span>{parseInt('' + ltp).toFixed(2)}</span>
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
          <span>{text > 0 ? `+${text}` : `${text}`}</span>
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
    onSquareOfOrder(record);
    setSquareOffConfirmation({show: false, data: null});
  }

  return (
    <div className="open-position-main-wrap">
 
      <div className="right-section open-position-header">
          <Select defaultValue={"LIVE"} value={userTradeSelection} onChange={value => setUserTradeSelection(value)}>
            <Option value="LIVE">LIVE TRADE POSITIONS</Option>
            <Option value="PAPER">PAPER TRADE POSITIONS</Option>
          </Select>
          <Input
            className="search-input"
            placeholder="Search"
            suffix={<HiSearch />}
          />
        </div>
      {userTradeSelection === "LIVE" && (
        <Table
          loading={positionsLoading || loadingSquareOffPosition}
          columns={columns}
          dataSource={positionsData}
        />
      )}

      {userTradeSelection === "PAPER" && (
        <OpenPapertradePosition></OpenPapertradePosition>  
      )}

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

export default OpenPosition;
