import { useNavigate } from "react-router";
import { Button, Alert, Typography, Col, Input, message, Row, Select, Switch, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "../../../../Component/AppModal/AppModal";
import socket from "../../../../hooks/useSocket";
import { getDayTradingsData, getStrtegicOptionsData, updateDayTradingAutoTradeStatus, updateDayTradingCardData, getProfitAndLossData, squareoffAll, } from "../../../../Redux/Actions/dayTradingActions";
import { getPaperCalculationTotals, getPaperTradingsData, squareOffAllPapertradePosition, updatePaperTradingAutoTradeStatus, updatePaperTradingCardData } from "../../../../Redux/Actions/PaperTradingActions";
import "./DayTrading.scss";

const { Text } = Typography;
const { Option } = Select;
const trading_errors = {
  strategic_name: null,
  qty: null,
  count_of_stock: null,
  profit_limit: null,
  loss_limit: null
}

const initialData = [
  {
    label: "BANKNIFTY NFO",
    tradeType: "bankniftynfo",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 90k capital required."
  },
  {
    label: "NIFTY NFO",
    tradeType: "niftynfo",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 80k capital required.",
  },
  {
    label: "BANKNIFTY OPTION",
    tradeType: "bankniftyoption",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 25k capital required.",
  },
  {
    label: "NIFTY OPTION",
    tradeType: "niftyoption",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 25k capital required.",
  },
  {
    label: "BANKNIFTY OPTION SELLING",
    tradeType: "bankniftyoptionselling",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 50k capital required with hedging.",
  },
  {
    label: "NIFTY OPTION SELLING",
    tradeType: "niftyoptionselling",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 50k capital required with hedging.",
  },
  {
    label: "MCX NFO",
    tradeType: "mcxnfo",
    tradeStatus: 0,
    segment: "MCX",
    exchange: "MCX",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    count_of_stock: 0,
    show_count_of_stock: true,
    note: "For 1 Lot one symbol 2 Lacs capital required.",
  },
  {
    label: "NSE-CURRENCY",
    tradeType: "nsecurrency",
    tradeStatus: 0,
    segment: "CDS",
    exchange: "CDS",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    count_of_stock: 0,
    show_count_of_stock: true,
    note: "For 1 Lot one symbol 10k capital required.",
  },
  {
    label: "NSE CASH",
    tradeType: "nsecash",
    tradeStatus: 0,
    segment: "NSE",
    exchange: "NSE",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    count_of_stock: 0,
    show_count_of_stock: true,
    note: "For 5 qty 5 stock 15k capital required.",
  },
  // {
  //   label: "STOCK NFO",
  //   tradeType: "stocknfo",
  //   tradeStatus: 0,
  //   segment: "NFO",
  //   exchange: "NFO",
  //   qty: null,
  //   loss_limit: null,
  //   profit_limit: null,
  //   strategic_name: undefined,
  //   tradingType: 1,
  //   count_of_stock: 0,
  //   show_count_of_stock: true,
  //   note: "For 1 Lot one symbol 1.8 Lacs capital required.",
  // },
];

initialData.forEach(d => d.errors= trading_errors);

function DayTrading(props) {
  const { isPaperTrading } = props;
  const [dayTradingCardData, setDayTradingCardsData] = useState(initialData);
  const [dayTradingData_p_and_l, setDayTradingData_p_and_l] = useState({});
  const [runningTradeTypePositions, setRunningTradeTypePositions] = useState({});
  const [runningPapertradeTypePositions, setRunningPapertradeTypePositions] = useState({});
  const [papertrade_p_and_l, setPaperTrade_p_and_l] = useState({});
  const [tradeConfirmation, setTradeConfirmation] = useState({ show: false, data: null });
  const [squareOffConfirmation, setSquareOffConfirmation] = useState({ show: false, data: null });
  const [expiredPlanConfirmation, setExpiredPlanConfirmation] = useState({ show: false, data: null });
  const planStatus = useSelector((state) => state?.Auth?.plan_status);
  const tradingData = useSelector((state) => isPaperTrading ? state?.PaperTrading?.paperTradingData : state?.DayTrading?.dayTradingData);
  const strategicOptionsData = useSelector((state) => state?.DayTrading?.strategicOptions);
  const navigate = useNavigate();
  let paper_trade_calculation_timeout = "";

  const dispatch = useDispatch();

  useEffect(() => {
    const group_wise_position_fn = (data) => {
      // if (!isPaperTrading) setDayTradingData_p_and_l(data?.dayTrading || {});
      if (!isPaperTrading) setDayTradingData_p_and_l(data?.day_trading_trade_type_profit_loss || {});
      const temp = {};
      Object.keys(data?.dayTrading || []).forEach(key => temp[key] = data?.dayTrading[key]?.data?.length || 0);
      setRunningTradeTypePositions(temp);
    }
    const group_wise_position = socket("GRUOP_WISE_POSITION", group_wise_position_fn);
  
    const refresh_apis_socket_fn = (data) => {
      if (isPaperTrading) {
        dispatch(getPaperCalculationTotals());
        if (paper_trade_calculation_timeout) clearTimeout(paper_trade_calculation_timeout);
        paper_trade_calculation_timeout = setTimeout(() => dispatch(getPaperCalculationTotals()), 5000);
      }
    }
    const refresh_apis_socket = socket("REFRESH_APIS", refresh_apis_socket_fn);

    const parper_trade_fn = (data) => {
      setPaperTrade_p_and_l(data.final_profit_and_loss)
      const papertrade_positions = data.papertrade_positions;
      const temp = {};
      for (let papertrade_position of papertrade_positions) {
        if (papertrade_position.Bqty != papertrade_position.Sqty) {
          temp[papertrade_position.trade_type] = 1;
        }
      }
      setRunningPapertradeTypePositions(temp);
    }
    const parper_trade_socket = socket("DEMATADE:PAPER_TRADE_ROOM", parper_trade_fn);
    

    return () => {
      if (paper_trade_calculation_timeout) clearTimeout(paper_trade_calculation_timeout);
      if (group_wise_position) group_wise_position("GRUOP_WISE_POSITION", group_wise_position_fn);
      if (refresh_apis_socket) refresh_apis_socket("REFRESH_APIS", refresh_apis_socket_fn);
      if (parper_trade_socket) parper_trade_socket("DEMATADE:PAPER_TRADE_ROOM", parper_trade_fn);
    };
  }, []);

  useEffect(() => {
    if (isPaperTrading) {
      dispatch(getPaperTradingsData());
      dispatch(getPaperCalculationTotals());
    } else {
      dispatch(getDayTradingsData());
    }
    dispatch(getStrtegicOptionsData());
  }, []);

  useEffect(() => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        const matchedCardData = tradingData?.find(
          (dataItem) => dataItem?.trade_type == item?.tradeType
        );
        if (matchedCardData) {
          return {
            ...item,
            tradeStatus: matchedCardData?.trade_status,
            qty: matchedCardData?.qty,
            loss_limit: matchedCardData?.loss_limit,
            profit_limit: matchedCardData?.profit_limit,
            strategic_name: matchedCardData?.strategic_name,
            ...(item?.show_count_of_stock && {
              count_of_stock: matchedCardData?.count_of_stock,
            }),
            p_and_l: matchedCardData?.p_and_l || 0,
            isPaperTrading: isPaperTrading || false,
            square_off: false,
            userTrade: matchedCardData?.is_paper_trade ? "PAPER_TRADE": "LIVE_TRADE"
          };
        } else {
          return item;
        }
      })
    );
  }, [tradingData]);

  const onStrategicChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, strategic_name: value };
        } else {
          return item;
        }
      })
    );
  };

  const onUserTradeChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, userTrade: value };
        } else {
          return item;
        }
      })
    );
  };

  const onLotSizeChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, qty: value };
        } else {
          return item;
        }
      })
    );
  };

  const onProfitLimitChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, profit_limit: value };
        } else {
          return item;
        }
      })
    );
  };

  const onLossLimitChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, loss_limit: value };
        } else {
          return item;
        }
      })
    );
  };

  const onCountofStockChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, count_of_stock: value };
        } else {
          return item;
        }
      })
    );
  };

  const onTradeConfirm = () => {
    if (tradeConfirmation.data.for === "auto-trade") {
      onAutoTradeChange(
        tradeConfirmation.data.checked,
        tradeConfirmation.data.item
      );
    } else if (tradeConfirmation.data.for === "square-off") {
      // onSquareOffChange(tradeConfirmation.data.checked, tradeConfirmation.data.item);
      setTradeConfirmation({ show: false, data: null });
    } else if (tradeConfirmation.data.for === "save-card") {
      onSaveCard(tradeConfirmation.data.item);
      setTradeConfirmation({ show: false, data: null });
    }
  };

  const onAutoTradeChange = (value, tradeCard) => {
    const payload = {
      tradeStatus: value ? 1 : 0,
      tradeType: tradeCard?.tradeType,
      tradingType: 1,
    };
    const currentCardsData = [...dayTradingCardData];
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, tradeStatus: value ? 1 : 0 };
        } else {
          return item;
        }
      })
    );

    if (isPaperTrading) {
      dispatch(
        updatePaperTradingAutoTradeStatus(
          payload,
          (successMessage) => {
        //     notification.success({ message: 'Notification',
        // description:(successMessage ||"Record updated successfully..")});
          
          },
          (errorMessage) => {
            notification.error({ message: 'Notification',
            description:(errorMessage ||"Failed to update record")});
            setDayTradingCardsData(currentCardsData);
          }
        )
      );
    } else {
      dispatch(
        updateDayTradingAutoTradeStatus(
          payload,
          (successMessage) => {
            // notification.success({ message: 'Notification',
            // description:(successMessage ||"Record updated successfully..")});
          },
          (errorMessage) => {
            notification.error({ message: 'Notification',
            description:(errorMessage ||"Failed to update record")});
            setDayTradingCardsData(currentCardsData);
          }
        )
      );
    }
    setTradeConfirmation({ show: false, data: null });
  };

  const validateAndConfirmTrade = (input) => {
    const { item, checked, data } = input;
    const temp = [...dayTradingCardData];
    const dayTradingCard = temp.find((item) => item.isPaperTrading === data.item.isPaperTrading && item.exchange == data.item.exchange && item.label == data.item.label && item.tradeType == data.item.tradeType);
    if (dayTradingCard) {
      dayTradingCard.errors = {};
      if (!data.item.strategic_name) dayTradingCard.errors.strategic_name = "Pleas select strategic.";
      if (data?.item?.show_count_of_stock && !data.item.count_of_stock) dayTradingCard.errors.count_of_stock = "Pleas enter count of stock.";
      if (!data.item.qty) dayTradingCard.errors.qty = "Pleas enter lot size.";
      // if (!data.item.profit_limit) dayTradingCard.errors.profit_limit = "Pleas enter profit limit.";
      // if (!data.item.loss_limit) dayTradingCard.errors.loss_limit = "Pleas enter loss limit.";
      setDayTradingCardsData(temp);
      if (Object.keys(dayTradingCard.errors).length > 0) {
        notification.error({ message: 'Notification',
        description:"Please enter valid data."});
      } else {
        setTradeConfirmation({
          show: true,
          data: data,
        })
      }
    }
  }

  const validateAndConfirmSquareOff = (input) => {
    const { item, checked, data } = input;
    setSquareOffConfirmation({
      show: true,
      data: data,
    });
  }

  const onSquareOffConfirm = (input) => {
    const { data } = input;
    const payload = {
      tradingType: "dayTrading",
      tradeType: data.item.tradeType.replace(/[^a-zA-Z]/gs, "").toLowerCase(),
    }
    if (data.item.userTrade === "PAPER_TRADE") {
      dispatch(
        squareOffAllPapertradePosition(
          payload, 
          (text) => {
            notification.success({ message: 'Notification',
            description:(text || "Square off successfully.")});
            setSquareOffConfirmation({show: false, data: null});
            const temp = [...dayTradingCardData];
            const dayTradingCard = temp.find((item) => item.isPaperTrading === data.item.isPaperTrading && item.exchange == data.item.exchange && item.label == data.item.label && item.tradeType == data.item.tradeType);
            if (dayTradingCard) {
              dayTradingCard.errors = {};
              dayTradingCard.tradeStatus = false;
            }
            setDayTradingCardsData(temp);
            onAutoTradeChange(false, dayTradingCard);
          },
          (text) => {
            notification.error({ message: 'Notification',
            description:(text || "Failed to square off.")});
            setSquareOffConfirmation({show: false, data: null})
          }
        )
      );
    } else if (data.item.userTrade === "LIVE_TRADE") {
      dispatch(
        squareoffAll(
          payload, 
          (text) => {
            notification.success({ message: 'Notification',
            description:(text || "Square off successfully.")});
            setSquareOffConfirmation({show: false, data: null});
            const temp = [...dayTradingCardData];
            const dayTradingCard = temp.find((item) => item.isPaperTrading === data.item.isPaperTrading && item.exchange == data.item.exchange && item.label == data.item.label && item.tradeType == data.item.tradeType);
            if (dayTradingCard) {
              dayTradingCard.errors = {};
              dayTradingCard.tradeStatus = false;
            }
            setDayTradingCardsData(temp);
            onAutoTradeChange(false, dayTradingCard);
          },
          (text) => {
            notification.error({ message: 'Notification',
            description:(text || "Failed to square off.")});
            setSquareOffConfirmation({show: false, data: null})
          }
        )
      );
    }
  }
  
  const onSaveCard = (tradeCard) => {
    const payload = { ...tradeCard };
    payload.is_paper_trade = tradeCard.userTrade === "PAPER_TRADE" ? 1 : 0;
    if (isPaperTrading) {
      dispatch(updatePaperTradingCardData(
        payload,
        (successMessage) => {},
        (errorMessage) => {
         notification.error({ message: 'Notification',
            description:(errorMessage ||"Failed to update record")});
        }
      ));
    } else {
      dispatch(
        updateDayTradingCardData(
          payload,
          (successMessage) => {},
          (errorMessage) => {
            notification.error({ message: 'Notification',
            description:(errorMessage ||"Failed to update record")});
          }
        )
      );
    }
  };

  return (
    <div className="day-trading-panel-wrap">
      
      <Row gutter={[40, 24]}>
        {dayTradingCardData?.map((item) => {
          return (
            <Col span={8}>
              <div className="single-card">
                <div className="card-header">
                  <span className="header-title">{item?.label}</span>
                  <select placeholder="SELECT TRADE" className="selectop" value={item?.userTrade} 
                    onChange={(e) => onUserTradeChange(e.target.value, item)}  disabled={runningTradeTypePositions[item.tradeType] || runningPapertradeTypePositions[item.tradeType]}>
                   
                    <option value="LIVE_TRADE" className="option-2" selected>LIVE TRADE</option>
                    <option value="PAPER_TRADE" className="option-3">PAPER TRADE</option>
                  </select>
                </div>
                
                <div className="card-body">
                  <Row align="middle" justify="center">
                    <div className="count-value">
                      {item?.userTrade === "PAPER_TRADE" && papertrade_p_and_l && papertrade_p_and_l[item.tradeType] &&
                          <span>
                          {papertrade_p_and_l[item.tradeType] < 0 ? (
                            <div className="value error">
                              <span>{parseFloat(papertrade_p_and_l[item.tradeType]).toFixed(2)}</span>
                            </div>
                          ) : (
                            <div className="value success">
                              <span>+{parseFloat(papertrade_p_and_l[item.tradeType]).toFixed(2)}</span>
                            </div>
                          )}
                        </span>
                      }
                      {item?.userTrade === "LIVE_TRADE"  && dayTradingData_p_and_l && dayTradingData_p_and_l[item.tradeType] && (
                          <span>
                          {dayTradingData_p_and_l[item.tradeType] < 0 ? (
                            <div className="value error">
                              <span>{parseFloat(dayTradingData_p_and_l[item.tradeType]).toFixed(2)}</span>
                            </div>
                          ) : (
                            <div className="value success">
                              <span>+{parseFloat(dayTradingData_p_and_l[item.tradeType]).toFixed(2)}</span>
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </Row>
                  <Row>
                    <div className="single-field">
                      <span className="label">Apply Strategic {item.errors?.strategic_name}</span>
                      <Select  className="options" showSearch value={item?.strategic_name} placeholder="SELECT A STRATEGIC" optionFilterProp="children"
                        status={item.errors?.strategic_name ? "error": ""} disabled={runningTradeTypePositions[item.tradeType] || runningPapertradeTypePositions[item.tradeType]}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                        onChange={(value) => onStrategicChange(value, item)}
                      >
                        {strategicOptionsData?.map((item) => <Option className="options" key={item?.id} value={item?.strategicName}> {item?.strategicName}</Option>)}
                      </Select>
                    
                    </div>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Lot Size *</span>
                        <Input value={item?.qty} className="input-number" size="large" status={item.errors?.qty ? "error": ""} disabled={runningTradeTypePositions[item.tradeType] || runningPapertradeTypePositions[item.tradeType]}
                          onChange={(e) => onLotSizeChange(e.target.value, item) } />
                        
                      </div>
                    </Col>
                    {item?.show_count_of_stock && (
                      <Col span={12}>
                        <div className="single-field">
                          <span className="label">Count of Stock *</span>
                          <Input value={item?.count_of_stock} className="input-number" size="large" status={item.errors?.count_of_stock ? "error": ""} disabled={runningTradeTypePositions[item.tradeType] || runningPapertradeTypePositions[item.tradeType]}
                            onChange={(e) => onCountofStockChange(e.target.value, item) } />
                       
                        </div>
                      </Col>
                    )}
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Profit Limit</span>
                        <Input className="input-number" value={item?.profit_limit} size="large" status={item.errors?.profit_limit ? "error": ""}
                          onChange={(e) => onProfitLimitChange(e.target.value, item) }/>
                        {item.errors?.profit_limit && <Alert message={item.errors.profit_limit} type="error" />}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Loss Limit</span>
                        <Input className="input-number" value={item?.loss_limit} size="large" status={item.errors?.loss_limit ? "error": ""}
                          onChange={(e) => onLossLimitChange(e.target.value, item) }/>
                        {/* {item.errors?.loss_limit && <Alert message={item.errors.loss_limit} type="error" />} */}
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={22} align="middle">
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Auto Trade</span>
                        <Switch className="trade-switch" disabled={runningTradeTypePositions[item.tradeType] || runningPapertradeTypePositions[item.tradeType]} checked={item?.tradeStatus}
                          onChange={(checked) => {
                            if (planStatus === 2 || planStatus === 3) {
                              setExpiredPlanConfirmation({ show: true });
                            } else {
                              validateAndConfirmTrade({ show: true, data: { for: "auto-trade", checked, item } }) } 
                            }
                          }/>
                     
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <Button className="square-off-btn" danger
                          onClick={() => {
                            if (planStatus === 2 || planStatus === 3) {
                              setExpiredPlanConfirmation({ show: true });
                            } else {
                              validateAndConfirmSquareOff({ show: true, data: { for: "square-off", checked: true, item } }) 
                            }
                          }}>Square Off</Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button type="primary" className="save-btn1"
                        onClick={() => {
                          if (planStatus === 2 || planStatus === 3) {
                            setExpiredPlanConfirmation({ show: true });
                          } else {
                            validateAndConfirmTrade({ show: true, data: { for: "save-card", item } });
                          }
                        }}
                      >SAVE</Button>
                      <span>
                        <b>Note: </b>
                        {item?.note}
                        {(runningTradeTypePositions[item.tradeType] || runningPapertradeTypePositions[item.tradeType]) && 
                          <div><Text type="info">There is trading in running position, you cannot update trading data.</Text></div>
                        }
                      </span>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      {tradeConfirmation.show && (
        <AppModal
          title="Trade Confirmation"
          show={tradeConfirmation.show}
          handleCancel={() =>
            setTradeConfirmation({ ...tradeConfirmation, show: false })
          }
          handleOk={() => onTradeConfirm()}
        >
          <p className="message_pop">Are you sure?</p>
        </AppModal>
      )}
      {squareOffConfirmation.show && (
        <AppModal
          title="Square off Confirmation"
          show={squareOffConfirmation.show}
          handleCancel={() => setSquareOffConfirmation({ ...squareOffConfirmation, show: false }) }
          handleOk={() => onSquareOffConfirm(squareOffConfirmation)}
        >
          <p className="message_pop">Are you want to close all running positions?</p>
        </AppModal>
      )}

      {expiredPlanConfirmation.show && (
        <AppModal
          title="Subscription Expired"
          show={expiredPlanConfirmation.show}
          handleCancel={() => setExpiredPlanConfirmation({ ...expiredPlanConfirmation, show: false }) }
          handleOk={() => navigate("/pricing")}
        >
          <p className="message_pop">Your subscription plan is expired, do you want to renew / buy subscription?</p>
        </AppModal>
      )}
    </div>
  );
}

export default DayTrading;
