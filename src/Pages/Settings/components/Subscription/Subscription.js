import { Col, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionsData } from "../../../../Redux/Actions/settingActions";
import "./Subscription.scss";

function Subscription(props) {
  const [subscription, setSubscription] = useState();
  const subscriptionData = useSelector(
    (state) => state?.Setting?.subscriptionData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionsData());
  }, []);

  useEffect(() => {
    setSubscription(subscriptionData);
  }, [subscriptionData]);

  const getPlanStatus = (status) => {
    switch (status) {
      case 1:
        return "Plan Active";
      case 2:
        return "Plan Expired";
      case 3:
        return "Demo Expired";
      case 4:
        return "Demo Running";
      default:
        return null;
    }
  };

  return (
    <div className="subscription-main-wrap">
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Status</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <span className="field-value">
            {getPlanStatus(subscription?.plan_status) || "N/A"}
          </span>
        </Col>
      </Row>
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Demo Start Date</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <span className="field-value">
            {subscription?.plan_start_date || "N/A"}
          </span>
        </Col>
      </Row>
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Demo End Date</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <span className="field-value">
            {subscription?.plan_end_date || "N/A"}
          </span>
        </Col>
      </Row>
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Subscription On/ Off</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <Switch defaultChecked={true} />
        </Col>
      </Row>
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Auto Renewal</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>
    </div>
  );
}

export default Subscription;
