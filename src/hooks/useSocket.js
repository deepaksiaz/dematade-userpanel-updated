import { io } from "socket.io-client";
import { API_URL } from "../config";

let socket_connection = null;
function socket(channel, callbank) {
  console.log(`Creating socket for ${channel}`);
  
  const auth_token = localStorage.getItem("authToken");
  if (auth_token && !socket_connection) {
    socket_connection = io(API_URL, {
        transports: ["websocket"],
        reconnectionAttempts: 5,
        withCredentials: true,
        query: `token=${auth_token}`,
    });
    console.log("Socket created");
  }
  
  socket_connection?.on(channel, (new_data) => {
    callbank(new_data);
  });

  const disconnect = (channel, fn) => {
    console.log(`Destroying socket for ${channel}`);
    socket_connection.off(channel, fn);
    // socket_connection?.disconnect();
  }

  return disconnect;
}

export default socket;