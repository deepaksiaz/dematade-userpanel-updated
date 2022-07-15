let API_URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case "production":
    API_URL = "https://api.dematadesolution.com";
    break;
  case "staging":
    API_URL = "https://test-api.dematadesolution.com";
    break;
  default:
    API_URL = "https://test-api.dematadesolution.com";
}
export { API_URL };
