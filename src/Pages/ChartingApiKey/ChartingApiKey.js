import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Input,
  message,
  Row,
  Select,
  Switch,
  notification,
} from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import "./ChartingApiKey.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  chartingBuyOrSell,
  clearSymbolList,
  generateChartingKey,
  getChartingKeyData,
  oneTouchCreate,
  searchSymbol,
  updateChartingKeyStatus,
} from "../../Redux/Actions/chartingKeyActions";

import DayTrading from "../../data/DayTrading.json";
import AppModal from "../../Component/AppModal/AppModal";

const { Option } = Select;

const tradeTypesNotToShow = [
  // "BANKNIFTY Option",
  // "NIFTY Option",
  // "BANKNIFTY OPTION SELLING",
  // "NIFTY OPTION SELLING",
];

const erros = {
  apiKey: null,
  quantity: null,
  exchange: null,
  strategic: null,
  tradeType: null,
  tradingType: null,
  symbol: null,
  qty: null,
  orderType: null,
  profitLimit: null,
  lossLimit: null,
};

function ChartingApiKey(props) {
  const [apiKey, setApiKey] = useState("");
  const [quantity, setQuantity] = useState("");
  const [exchange, setExchange] = useState("");
  const [orderType, setOrderType] = useState("");
  const [tradingType, setTradingType] = useState("");
  const [tradingList, setTradingList] = useState("");
  const [symbol, setSymbol] = useState("");
  const [showTradeConfirmation, setShowTradeConfirmation] = useState({
    show: false,
    data: null,
  });
  const [inputErrors, setInputErrors] = useState(erros);
  const [chartingKey, setChartingKey] = useState();
  const chartingKeyData = useSelector(
    (state) => state?.ChartingKey?.chartingKeyData
  );

  const symbolList = useSelector((state) => state?.ChartingKey?.symbolList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChartingKeyData());
  }, []);

  useEffect(() => {
    const tradingData = DayTrading.filter((data) => {
      return data.segment == exchange;
    });
    setTradingList(tradingData);
  }, []);
  useEffect(() => {
    const tradingData = DayTrading.filter((data) => {
      return data.segment == exchange;
    });
    setTradingList(tradingData);
  }, [exchange]);

  useEffect(() => {
    setChartingKey(chartingKeyData);
  }, [chartingKeyData]);

  const onGenerateChartingKey = () => {
    dispatch(
      generateChartingKey(
        () => {
          notification.success({
            message: "Notification",
            description: "Charting key created successfully..",
          });
        },
        () => {
          message.error("Failed to create charting key...");
        }
      )
    );
  };

  const onUpdateKeyStatus = (value) => {
    dispatch(
      updateChartingKeyStatus(
        { id: chartingKey?.id, status: value ? 1 : 0 },
        () => {
          notification.success({
            message: "Notification",
            description: "Status updated successfully..",
          });
        },
        () => {
          notification.error({
            message: "Notification",
            description: "Failed to update status...",
          });
        }
      )
    );
  };

  const onSymbolChange = (value) => {
    if (value.length > 2) dispatch(searchSymbol(exchange, tradingType, value));
    setSymbol(value);
  };

  const createTrade = (trend) => {
    if (validateInputs()) {
      setShowTradeConfirmation({ show: false, data: null });
      setTimeout(() => {
        setShowTradeConfirmation({ show: true, data: { trend } });
      }, 100);
    } else {
      notification.error({
        message: "Notification",
        description: "Please enter valid values to continue..",
      });
    }
  };

  const validateInput = (field, value, message, errors) => {
    if (!value) {
      console.log(field, value, message);
      errors[field] = message;
      console.log(inputErrors);
      return false;
    } else {
      errors[field] = null;
      return true;
    }
  };

  const validateInputs = () => {
    let flag = true;
    const errors = { ...inputErrors };
    flag =
      flag & validateInput("apiKey", apiKey, "Please enter api key", errors);
    flag =
      flag &
      validateInput("quantity", quantity, "Please enter quantity", errors);
    flag =
      flag &
      validateInput("exchange", exchange, "Please enter exchange", errors);
    flag =
      flag &
      validateInput(
        "tradingType",
        tradingType,
        "Please enter trading type",
        errors
      );
    flag =
      flag & validateInput("symbol", symbol, "Please enter symbol", errors);
    flag =
      flag &
      validateInput("orderType", orderType, "Please enter order type", errors);
    setInputErrors(errors);
    return flag;
  };

  const handleBuy = () => {
    createTrade("buy");
  };

  const handleSell = () => {
    createTrade("sell");
  };

  const onTradeConfirm = (data) => {
    const formData = {
      exchange: exchange,
      strategic: "",
      tradeType: tradingType,
      tradingType: tradingType,
      symbolName: symbol,
      qty: quantity,
      orderType: orderType,
      profitLimit: "",
      lossLimit: "",
      trend: data.trend.toLocaleUpperCase(),
      api_key: chartingKey.api_key,
      symbol_name: symbol,
      trading_type: tradingType,
      order_type: orderType,
    };
    dispatch(chartingBuyOrSell(formData));
    setShowTradeConfirmation({ show: false, data: null });
  };

  const clearSymbolListFn = () => {
    dispatch(clearSymbolList());
  };

  return (
    <div className="charting-api-key-main">
      <Row>
        <Col span={18}>
          <div className="generate-key-box">
            <span className="box-title">Generate API Key</span>
            <div className="key-content">
              <Input
                disabled={chartingKey?.api_key ? true : false}
                className="key-input"
                value={chartingKey?.api_key}
                placeholder="X-API-KEY=abcdef12345"
              />
              <div
                onClick={() => !chartingKey?.api_key && onGenerateChartingKey()}
                className={`generate-btn ${
                  chartingKey?.api_key && "disable-btn"
                }`}
              >
                <span>Generate KEY</span>
              </div>
              <CopyToClipboard
                text={chartingKey?.api_key}
                onCopy={() =>
                  chartingKey?.api_key && message.success("Copied..")
                }
              >
                <div className="copy-btn">
                  <span>copy</span>
                </div>
              </CopyToClipboard>
              {chartingKey?.api_key && (
                <div className="active-status-switch">
                  <label>Status</label>
                  <Switch
                    checked={chartingKey?.status}
                    onChange={(checked) => onUpdateKeyStatus(checked)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="copy-trade-box">
            <span className="box-title">Copy Trade</span>
            <Row gutter={60} className="content-single-row">
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Enter API Key</span>
                  <Input
                    className="input-number"
                    placeholder="X-API-KEY=abcdef12345"
                    size="large"
                    value={apiKey}
                    status={inputErrors.apiKey ? "error" : ""}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  {inputErrors.apiKey && (
                    <Alert message={inputErrors.apiKey} type="error" />
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Enter Quantity</span>
                  <Input
                    className="input-number"
                    placeholder="20"
                    size="large"
                    value={quantity}
                    status={inputErrors.quantity ? "error" : ""}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {inputErrors.quantity && (
                    <Alert message={inputErrors.quantity} type="error" />
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={60} className="content-single-row">
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Exchange</span>
                  <Select
                    placeholder="select exchange"
                    value={exchange}
                    status={inputErrors.exchange ? "error" : ""}
                    onChange={(value) => {
                      setExchange(value);
                      clearSymbolListFn();
                    }}
                    defaultValue={"NFO"}
                  >
                    <Option value={"NSE"}>NSE</Option>
                    <Option value={"NFO"}>NFO</Option>
                    <Option value={"CDS"}>CDS</Option>
                    <Option value={"MCX"}>MCX</Option>
                  </Select>
                  {inputErrors.exchange && (
                    <Alert message={inputErrors.exchange} type="error" />
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Order Type</span>
                  <Select
                    placeholder="select order type"
                    value={orderType}
                    onChange={(value) => {
                      setOrderType(value);
                      clearSymbolListFn();
                    }}
                    status={inputErrors.orderType ? "error" : ""}
                    defaultValue={"MIS"}
                  >
                    <Option value={"MIS"}>MIS</Option>
                    {exchange !== "NSE" && <Option value={"NRML"}>NRML</Option>}
                    <Option value={"CNC"}>CNC</Option>
                  </Select>
                  {inputErrors.orderType && (
                    <Alert message={inputErrors.orderType} type="error" />
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={60} className="content-single-row">
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Trading Type</span>
                  <Select
                    placeholder="select trading type"
                    value={tradingType}
                    className="options"
                    onChange={(value) => {
                      setTradingType(value);
                      clearSymbolListFn();
                    }}
                    defaultValue={"BANK NIFTY NFO"}
                    status={inputErrors.tradingType ? "error" : ""}
                  >
                    {tradingList &&
                      tradingList.map((item, idx) => {
                        return (
                          <Option className="options" value={item.type}>
                            {item.type}
                          </Option>
                        );
                      })}
                  </Select>
                  {inputErrors.tradingType && (
                    <Alert message={inputErrors.tradingType} type="error" />
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Enter Symbol Name</span>
                  <Select
                    placeholder="Symbol Name"
                    showSearch
                    value={symbol}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    notFoundContent={null}
                    onSearch={(value) => onSymbolChange(value)}
                    onChange={(value) => setSymbol(value)}
                    defaultValue={"NFO"}
                    status={inputErrors.symbol ? "error" : ""}
                  >
                    {(symbolList || []).map((item) => {
                      return <Option key={item.name}>{item.name}</Option>;
                    })}
                  </Select>
                  {inputErrors.symbol && (
                    <Alert message={inputErrors.symbol} type="error" />
                  )}
                </div>
              </Col>
            </Row>
            <div className="action-btn-wrap">
              <div className="buy-btn" onClick={handleBuy}>
                <span>buy</span>
              </div>
              <div className="sell-btn" onClick={handleSell}>
                <span>sell</span>
              </div>
              <div className="cancel-btn">
                <span>cancel</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {showTradeConfirmation.show && (
        <AppModal
          title="Trade Confirmation"
          show={showTradeConfirmation.show}
          handleCancel={() =>
            setShowTradeConfirmation({ show: false, data: null })
          }
          handleOk={() => onTradeConfirm(showTradeConfirmation.data)}
        >
          <p className="message_pop">Are you sure?</p>
        </AppModal>
      )}
    </div>
  );
}

export default ChartingApiKey;
