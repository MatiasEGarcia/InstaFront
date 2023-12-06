import { useContext } from "react";
import WebSocketContext from "../Context/WebSocketContext";

export default function useWebSocket(){
    return useContext(WebSocketContext);
}