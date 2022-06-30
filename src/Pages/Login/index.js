import React, { useState, useEffect } from "react";
import { Form, Input, Button, message,notification } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import swastikaLogo from "../../Assets/Images/swastika-logo.svg";
import "./index.scss";
import { loginUser, sendOtp } from "../../Redux/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";

function Login(props) {
  const [form] = Form.useForm();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginLoading = useSelector((state) => state?.Auth?.loading);
  const loginError = useSelector((state) => state?.Auth?.error);

  useEffect(() => {
    if (loginError) {
      message.error(loginError);
    }
  }, [loginError]);

  const onOtpSubmitHadle = () => {
    if (
      !form.isFieldsTouched(true) ||
      form.getFieldError("mobileNumber")?.length
    ) {
      message.error(
        form.getFieldError("mobileNumber")?.[0] ||
          "Please enter valid mobile number"
      );
      return;
    }
    const data = { mobile_no: form.getFieldValue("mobileNumber") };
    setLoading(true);
    sendOtp(
      data,
      () => {
        notification.success({ message: 'Notification',
        description:("Otp sent successfully...")});
        setShowOtpInput(true);
        setLoading(false);
      },
      () => {
        notification.error({ message: 'Notification',
        description:("Failed to sent otp")});
        
        setLoading(false);
      }
    );
  };

  const onSubmit = (values) => {
    const data = { mobile_no: values.mobileNumber, otp: values?.otp };
    dispatch(loginUser(data));
  };

  return (
    <div className="login-main-wrap">
      <Form
        className="form-main"
        onFinish={onSubmit}
        form={form}
        name="horizontal_login"
      >
        <div className="login-top">
          <img src={swastikaLogo} height={50} width={120} alt="" />
          <span className="welcome-title">Welcome back!</span>
          <span className="subtitle">Login to your account</span>
        </div>

        <Form.Item
          name="mobileNumber"
          rules={[
            { required: true, message: "Please input your mobile number!" },
            { len: 10, message: "Enter valid mobile number!!" },
          ]}
        >
          <Input
            prefix={<MobileOutlined className="site-form-item-icon" />}
            placeholder="Mobile number"
            type={"number"}
          />
        </Form.Item>
        {showOtpInput && (
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "Please input otp" },
              { len: 4, message: "Enter valid otp!!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="OTP"
            />
          </Form.Item>
        )}
        {!showOtpInput ? (
          <Form.Item shouldUpdate>
            {() => (
              <Button
                loading={loading}
                type="primary"
                onClick={() => onOtpSubmitHadle()}
              >
                Send Otp
              </Button>
            )}
          </Form.Item>
        ) : (
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loginLoading}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

export default Login;
