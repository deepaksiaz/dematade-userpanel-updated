import React, { useState } from "react";
import "./pricing.scss";
import { Button, Input, message,notification } from "antd";
import rectangle from '../../../../Assets/Images/Rectangle.jpg'
import { payment, paymentSucess } from "../../../../Redux/Actions/SubscriptionActions";
import { useDispatch } from "react-redux";
import { render } from "@testing-library/react";

const plans = [
  {
    id: 101,
    category_id: 1, 
    name: "Basic Plan",
    description: "Billed Monthly",
    price: "1500",
    bullets: [
      "Validity 30 Days",
      "All Segment Trading",
      "No Discount",
      "Engineer Support",
      "Learning Videos",
      "-",
      "-"
    ],
    render: () => (
      <span>
        {
         
        }
       
      </span>
    ),
  },
  {
    id: 102,
    category_id: 1, 
    name: "Basic Plan",
    description: "Billed Quarterly",
    price: "4500",
    bullets: [
      "Validity 90 Days",
      "All Segment Trading",
      "No Discount",
      "Engineer Support",
      "Learning Videos",
      "-",
      "-"
    ],
    render: (text, record) => (
      <span>
        {
         
        }
        {text}
      </span>
    ),
  },
  {
    id: 103,
    category_id: 1, 
    name: "Premium Plan",
    description: "Billed Half Yearly",
    price: "9000",
    bullets: [
      "Validity 180 Days",
      "All Segment Trading",
      "No Discount",
      "Engineer Support",
      "Learning Videos",
      "Make Your Own Strategy",
      "Expert Weekend Trading Training"
    ]
  },
  {
    id: 104,
    category_id: 1, 
    name: "Extra Plan",
    description: "Billed Annualy",
    price: "18000",
    bullets: [
      "Validity 365 Days",
      "All Segment Trading",
      "No Discount",
      "Engineer Support",
      "Learning Videos",
      "Make Your Own Strategy",
      "Expert Weekend Trading Training"
      ,
    ]
  },
]

const Pricing = () => {
  const dispatch = useDispatch();
  const [showCouponTextBox, setShowCouponTextBox] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const onCouponCodeChange = (e, plan) => {
    const temp = {...couponCode};
    setCouponCode({
      ...temp,
      [plan.id]: e.target.value
    });
  }

  const handleSubscribe = async (plan) => {
    dispatch(payment(plan, couponCode[plan.id], (response, plan) => {
      notification.success({ message: 'Notification',
        description:("Plan Updated Successfully..")});
      // message.success("Plan Updated Successfully..")
      dispatch(paymentSucess({ ...response, plan }, ));
    }, (error) => {
      notification.error({ message: 'Notification',
        description:("Razorpay SDK failed to load. Are you online?")});
    }))
  };

  return (
    <div className="pricing-tab">
      <center>
       
        <div className="offer-1">
  
          Open demat account through us and enjoy 50% on any Subscription plan
          {"  "}
          <span>
            <a href="https://www.dematadesolution.com/" target="_blank" className="learnmore">
              Learn More
            </a>
          </span>
        </div>
      </center>
      <div className="sub-container-1">
        Subscription Plan
        <img src={rectangle} alt="" style={{ marginTop: "12px" }}></img>
      </div>
      
      <div className="sub-container-2">
        { 
          plans.map(plan => {
            return <div className={plan.id===103? "sub-mcol": "sub-col"}>
              <div className="sub-h"> Rs. {plan.price}/-</div>
              <div className="sub-sh">{plan.name}</div>
              <div className="sub-sh1">{plan.description}</div>
              <ul className="bullet">
                {plan.bullets.map(bullet => <li className="sub-li">{bullet}</li> )}
              </ul>
              <center>
               <footer>
                {" "}
                <Button variant="primary" className="sub-button1" onClick={() => handleSubscribe(plan)}>
                  Subscribe
                </Button>
                </footer>
              </center>
            </div>
          })
        }
      </div>
      <div className="note">NOTE : NO GST CHARGES</div>
    </div>
  );
};

export default Pricing;
