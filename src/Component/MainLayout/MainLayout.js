import React, { useEffect, useState } from "react";
import {
  Avatar,
  BackTop,
  Badge,
  Divider,
  Dropdown,
  Layout,
  Menu,
  message,
  Popover,
} from "antd";
import {
  HiOutlineSwitchVertical,
  HiChip,
  HiAcademicCap,
  HiShoppingBag,
  HiPlay,
  HiPhone,
  HiCog,
  HiHome,
  HiBell,
  HiOutlineMenu,
  HiArrowUp,
  HiArrowDown,
  HiOutlineLogout,
} from "react-icons/hi";
import {FaDeezer} from 'react-icons/fa'
import {MdOutlineLocalOffer} from "react-icons/md"
import {FaSignInAlt,FaRupeeSign} from "react-icons/fa"
import "./MainLayout.scss";
import dematadeDarkLogo from "../../Assets/Images/dematade-dark-logo.png";
import DLogo from "../../Assets/Images/D.svg";
import swastikaLogo from "../../Assets/Images/swastika-logo.svg";
import avatarImage from "../../Assets/Images/avatar.png";
import { useLocation, useNavigate } from "react-router";
import LoginModal from "../LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { getBrokerLoginStatus, setBrokerSessionExpired } from "../../Redux/Actions/BrokerActions";
import { getOpenPositions } from "../../Redux/Actions/positionsActions";
import Package from "../../../package.json";
import socket from "../../hooks/useSocket";
import { getIndexPrices } from "../../Redux/Actions/PricesActions";

const { Header, Content, Sider, Footer } = Layout;

function MainLayout(props) {
  const [collapsed, setCollpsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const [positionsData, setPositionsData] = useState([]);
  const [overviewAmount, setOverviewAmount] = useState(0);
  const positions = useSelector((state) => state.Positions.positions);
  const userName = useSelector((state) => state.Auth.userName);
  const planStatus = useSelector((state) => state.Auth.plan_status);
  const nameFromStorge = localStorage.getItem("name");
  const [activeKey, setActiveKey] = useState("");
  const [indices, setIndices] = useState({ NIFTY_50: "", NIFTY_BANK: "", NIFTY_50_OPEN: "", NIFTY_BANK_OPEN: "" });

  
  useEffect(() => {
    console.log("MainLayout useEffect");
    const index_price_socket_fn = (data) => setIndices(data);
    const index_price_socket = socket("DEMATADE:INDEX_PRICES_ROOM", index_price_socket_fn);
    

    let signal_room_socket, signal_room_socket_fn;
    if (planStatus === 1 || planStatus === 4) {
      signal_room_socket_fn = (data) => message.info(data.query.split("|").join(" | "))
      signal_room_socket = socket("DEMATADE:SIGNALS_ROOM", signal_room_socket_fn);
    }
  
    const overall_profit_loss_socket_fn = (data) => setOverviewAmount(data?.profit_and_loss);
    const overall_profit_loss_socket = socket("DEMATADE:OVERALL_PROFIT_LOSS", overall_profit_loss_socket_fn);
    
    const broker_session_socket_fn = (user) => {
      if (user.broker_portal_login === 0) {
        setShowLoginModal(true);
        setBrokerSessionExpired("Broker Session Expired");
      }
    }
    const broker_session_socket = socket("DEMATADE:BROKER_SESSION_ROOM", broker_session_socket_fn);

    return () => {
      if (index_price_socket) index_price_socket("DEMATADE:INDEX_PRICES_ROOM", index_price_socket_fn);
      if (signal_room_socket) signal_room_socket("DEMATADE:SIGNALS_ROOM", signal_room_socket_fn);
      if (overall_profit_loss_socket) overall_profit_loss_socket("DEMATADE:OVERALL_PROFIT_LOSS", overall_profit_loss_socket_fn);
      if (broker_session_socket) broker_session_socket("DEMATADE:BROKER_SESSION_ROOM", broker_session_socket_fn);
    };

  }, []);
  
  useEffect(() => {
    dispatch(getIndexPrices((data => {
      setIndices(data);
    })));
  }, []);

  useEffect(() => {
    dispatch(getBrokerLoginStatus());
  }, []);

  useEffect(() => {
    dispatch(getOpenPositions());
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveKey("Home");
        break;
      case "/signal-scanner":
        setActiveKey("Signal Scanner");
        break;
      case "/charting-key":
        setActiveKey("Charting API");
        break;
      case "/onetouch-trading":
        setActiveKey("One Touch Trading");
        break;
      case "/strategic":
        setActiveKey("Strategic");
        break;
        case "/createstrategic":
        setActiveKey("CreateStrategic");
        break;
      case "/order-history":
        setActiveKey("Order History");
        break;
        case "/offer":
          setActiveKey("offer");
          break;
        case "/pricing":
          setActiveKey("Pricing");
          break;
          case "/broker":
        setActiveKey("Broker");
        break;
        case "/copytrade":
          setActiveKey("CopyTrade");
          break;
      case "/tutorial":
        setActiveKey("Tutorial");
        break;
      case "/contact-us":
        setActiveKey("Contact Us");
        break;
      case "/settings":
        setActiveKey("Settings");
        break;
      default:
        setActiveKey("Home");
    }
  }, [location.pathname]);

  useEffect(() => {
    setPositionsData(positions || []);
  }, [positions]);

  useEffect(() => {
    if (positionsData?.length) {
      const sum = positionsData?.reduce(
        (partialSum, a) => partialSum + a?.MtoM,
        0
      );
      setOverviewAmount(sum.toFixed(2));
    }
  }, [positionsData]);

  const brokerLoggedIn = useSelector((state) => state?.BrokerLogin?.isLoggedIn);
  const getBrokerLoginStatusLoading = useSelector(
    (state) => state?.BrokerLogin?.getBrokerLoginStatusLoading
  );

  const brokerLoginError = useSelector((state) => state?.BrokerLogin?.error);

  useEffect(() => {
    if (brokerLoginError) {
      message.error(brokerLoginError);
    }
  }, [brokerLoginError]);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const NotificationContent = (
    <div className="notification-content-wrap">
      {[1, 2, 3, 4, 5, 6]?.map((item) => (
        <>
          <div className="single-noti-wrap">
            <span className="notification-title">Notification Title</span>
            <span className="noti-content">
              This is a sample notification. This is a sample notification.
            </span>
            <div className="noti-footer-wrap">
              <span className="noti-time">05:42 PM</span>
              <span className="view-noti">View Now</span>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );

  const notificationTitle = (
    <div className="notification-title-wrap">
      <span className="noti-text">Notifications</span>
      <span className="clear-text">Clear All</span>
    </div>
  );

  return (
    <Layout className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={80}
        trigger={null}
        width={255}
        className="site-layout-background"
      >
        {collapsed ? (
          <div className="d-logo-wrap">
            <img className="d-logo" src={DLogo} alt="" />
          </div>
        ) : (
          <div className="logo-wrap">
            <img src={dematadeDarkLogo} alt="" />
          </div>
        )}
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          // defaultSelectedKeys={["Home"]}
          style={{ borderRight: 0 }}
        >
           
          <Menu.Item
            onClick={() => navigate("/")}
            key={"Home"}
            icon={<HiHome />}
          >
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/broker")}
            key={"Broker"}
            icon={<FaSignInAlt />}
          >
            Broker Login
          </Menu.Item>
          {planStatus === 1 || planStatus === 4 ? (
          <Menu.Item
            onClick={() => navigate("/signal-scanner")}
            key={"Signal Scanner"}
            icon={<HiOutlineSwitchVertical />}
          >
            Signal Scanner
          </Menu.Item>
          ) : null}
          <Menu.Item
            onClick={() => navigate("/charting-key")}
            key={"Charting API"}
            icon={<HiChip />}
          >
            Charting API
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/copytrade")}
            key={"CopyTrade"}
            icon={<FaDeezer/>}
          
          >
           Copy Trade
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/strategic")}
            key={"Strategic"}
            icon={<HiAcademicCap />}
          >
            Strategic
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/createstrategic")}
            key={"CreateStrategic"}
            icon={<HiAcademicCap />}
          >Make Own Strategic</Menu.Item>
          <Divider className="side-menu-divider" />
          <Menu.Item
            onClick={() => navigate("/offer")}
            key={"offer"}
            icon={<MdOutlineLocalOffer />}
          >
            Offers
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/pricing")}
            key={"Pricing"}
            icon={<FaRupeeSign />}
          >
           Pricing
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/tutorial")}
            key={"Tutorial"}
            icon={<HiPlay />}
          >
            Tutorial
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/contact-us")}
            key={"Contact Us"}
            icon={<HiPhone />}
          >
            Contact Us
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/settings")}
            key={"Settings"}
            icon={<HiCog />}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            key={"app-version"}
          >
            Version: v{Package.version}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <div className="header-upper-section">
            <div className="header-left">
              <HiOutlineMenu
                onClick={() => setCollpsed(!collapsed)}
                className="burger-menu-icon"
              />
              {/* <img src={swastikaLogo} alt="" /> */}
              {!getBrokerLoginStatusLoading &&
                (!brokerLoggedIn ? (
                  <div className="offline-btn" onClick={() => navigate("/broker")}>
                    <span>Offline</span>
                  </div>
                ) : (
                  <div className="online-btn">
                    <span>Online</span>
                  </div>
                ))}
            </div>
            <div className="header-right">
              <Popover
                content={NotificationContent}
                title={notificationTitle}
                trigger="click"
                placement="bottom"
                className="notification-popover"
              >
                <Badge dot offset={[-5, 5]}>
                  <HiBell size={24} color="#012BFE" />
                </Badge>
              </Popover>
              <span className="username">
                {userName || nameFromStorge || "John Doe"}
              </span>
              <Dropdown
                arrow={true}
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item>
                      {planStatus === 1 && <span>Plan Active</span>} 
                      {planStatus === 2 && <span>Plan Expire</span>} 
                      {planStatus === 3 && <span>Demo Expire</span>} 
                      {planStatus === 4 && <span>Demo Active</span>} 
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        window.localStorage.clear();
                        window.location.href = "http://test-website.dematadesolution.com/";
                      }}
                      key="1"
                      icon={<HiOutlineLogout />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar style={{ cursor: "pointer" }} src={avatarImage} />
              </Dropdown>
            </div>
          </div>

          <div className="dashboard-top-panel">
            <div className="left-section">
              <span className="label">NIFTY</span>
              {indices.NIFTY_50 > indices.NIFTY_50_OPEN ?
                <div className="value success">
                  <HiArrowUp className="arrow-up" />  
                  <span>{indices.NIFTY_50}</span>
                </div>
                :
                <div className="value error">
                  <HiArrowDown className="arrow-down" />
                  <span>{indices.NIFTY_50}</span>
                </div>
              }
              
              <span className="label">BANKNIFTY</span>
              {indices.NIFTY_BANK > indices.NIFTY_BANK_OPEN ?
                <div className="value success">
                  <HiArrowUp className="arrow-up" />  
                  <span>{indices.NIFTY_BANK}</span>
                </div>
                :
                <div className="value error">
                  <HiArrowDown className="arrow-down" />
                  <span>{indices.NIFTY_BANK}</span>
                </div>
              }
            </div>
            <div className="left-section">
              <span className="label">Overview</span>
              {overviewAmount < 0 ? (
                <div className="value error">
                  <span>{overviewAmount}</span>
                </div>
              ) : (
                <div className="value success">
                  <span>+{overviewAmount}</span>
                </div>
              )}
            </div>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright ©2021 All rights reserved by @ De-Madate-Trading-Solutions
          Privacy Policy DeMatade 2022
        </Footer>
        <BackTop />
      </Layout>
      <LoginModal visible={showLoginModal} setvisible={setShowLoginModal} />
    </Layout>
  );
}

export default MainLayout;
