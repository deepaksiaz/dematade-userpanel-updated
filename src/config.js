let API_URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case "production":
    API_URL = "https://api.dematadesolution.com";
    break;
  case "staging":
    API_URL = "https://api.dematadesolution.com";
    break;
  default:
    API_URL = "http://localhost:9005";
}
export { API_URL };
