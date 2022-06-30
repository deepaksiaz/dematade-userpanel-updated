import axios from "../../helpers/axios.helper";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage, geUserIdFromLocalStorage } from "../../helpers";

function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  
export const paymentSucess = (data) => {
  return async (dispatch) => {
    const token = getTokenFromLocalStorage();
    const user_id = geUserIdFromLocalStorage();
    const payload = { ...data, user_id };
    const response = await axios.post(`${API_URL}/payments/pay/success`, payload, { headers: { Authorization: `Bearer ${token}` }});
  }
}

export const getCustomerDiscount = (onSuccess, onFail) => {
  return async (dispatch) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axios.get(`${API_URL}/payments/pay/discount`, { headers: { Authorization: `Bearer ${token}` }});
      onSuccess(response.data);
    } catch (error) {
      if (onFail) onFail(error);
    }
  }
}

export const payment = (plan, couponCode, onSuccess, onError) => {
    return async (dispatch) => {
      const token = getTokenFromLocalStorage();
      const user_id = geUserIdFromLocalStorage();
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!res) {
        onError();
        return;
      }
  
      const payload = { 
        customerId: user_id,
        currency: "INR",
        amount: plan.price,
        plan: plan,
        couponCode: couponCode
      };
        const response = await axios.post(`${API_URL}/payments/pay`, payload, { headers: { Authorization: `Bearer ${token}` }});
        const data = response.data;
        const options = {
          key: "rzp_live_FszRm0UAwMx601",
          currency: data.currency,
          amount: data?.amount?.toString(),
          order_id: data.id,
          name: "Dematade Trading Solutions",
          handler: async (response) => {
              onSuccess(response, plan);
          },
          prefill: {
            name: data?.user?.name || "",
            email: data?.user?.email || "",
            contact: data?.user?.mobile_no || ""
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
  }