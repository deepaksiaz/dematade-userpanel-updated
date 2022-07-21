let API_URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case "production":
    API_URL = "http://13.127.83.93:9005";
    break;
  case "staging":
    API_URL = "http://13.127.83.93:9005";
    break;
  default:
    API_URL = "http://13.127.83.93:9005";
}
export { API_URL };
