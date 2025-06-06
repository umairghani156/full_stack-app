// src/socket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const socket: Socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });
  
  socket.on("connect", () => {
    console.log("Socket connected to backend");
  });
  
  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });
  
  export default socket;
