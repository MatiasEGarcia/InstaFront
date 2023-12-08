import { useContext } from "react";
import ChatContext from "../Context/ChatContext";

export default function useChat(){
    return useContext(ChatContext);
};