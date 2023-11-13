import { useContext } from "react";
import UserHomeInfoConext from "../Context/UserHomeInfoContext";

export default function useUserHomeInfo(){
    return useContext(UserHomeInfoConext);
}