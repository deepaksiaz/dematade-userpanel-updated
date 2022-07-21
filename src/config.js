let API_URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case "production":
    API_URL = "http://172.31.44.224:9005";
    break;
  case "staging":
    API_URL = "http://172.31.44.224:9005";
    break;
  default:
    API_URL = "http://172.31.44.224:9005";
}
export { API_URL };
