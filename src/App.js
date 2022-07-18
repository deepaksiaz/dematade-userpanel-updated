import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Routes, useNavigate } from "react-router";
import MainLayout from "./Component/MainLayout/MainLayout";
import { setAxiosInterceptors } from "./helpers/axios.helper";
import ChartingApiKey from "./Pages/ChartingApiKey/ChartingApiKey";
import ContactUs from "./Pages/ContactUs";
import OfferPage from "./Pages/OfferPage/OfferPage";
import { MakeStrategic } from "./Pages/MakeStrategic/MakeStrategic";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import OneTouchTrading from "./Pages/OneTouchTrading";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Pricing from "./Pages/Settings/components/Pricing/Pricing";
import Settings from "./Pages/Settings/Settings";
import SignalScanner from "./Pages/SignalScanner/SignalScanner";
import Strategic from "./Pages/Strategic/Strategic";
import Tutorials from "./Pages/Tutorials";
import Broker from "./Pages/Settings/components/BrokerLogin/BrokerLogin"
import CopyTrade from "./Pages/CopyTrade/CopyTrade";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const currentToken = useSelector((state) => state.Auth.token);
  // setAxiosInterceptors();

  useEffect(() => {
    let search = {};
    console.log(window.location.search);
    if (window.location.search.length) {
        window.location.search
          .substring(1)
          .split("&")
          .map((a) => {
            let b = a.split("=");
            search[b[0]] = b[1];
          });

        if ("token" in search && "name" in search && "role" in search) {
          let { token, name, role } = search;
          name = name.replace(/%20/g, " ");
          setIsLoggedIn(true);
          setToken(token);
          localStorage.setItem("authToken", token);
          localStorage.setItem("name", name);
          navigate("/");
        }
    }
  }, []);

  useEffect(() => {
    if (currentToken) {
      setToken(currentToken);
    }
  }, [currentToken]);

  useEffect(() => {
    window.addEventListener("storage", (ev) => {
      const tokenValue = localStorage.getItem("authToken");
      setToken(tokenValue);
    });
    const tokenValue = localStorage.getItem("authToken");
    setToken(tokenValue);
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, [token]);

  if (loading) {
    return (
      <Spin
        style={{
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        size="large"
      />
    );
  }

  return  (
    isLoggedIn? <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/charting-key" element={<ChartingApiKey />} />
        <Route path="/signal-scanner" element={<SignalScanner />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/broker" element={<Broker />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/onetouch-trading" element={<OneTouchTrading />} />
        <Route path="/copytrade" element={<CopyTrade />} />
        <Route path="/strategic" element={<Strategic />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/createStrategic" element={<MakeStrategic />} />
        <Route path="/tutorial" element={<Tutorials />} />
      </Routes>
    </MainLayout>
  : <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
