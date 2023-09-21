import Access from "../Components/Access";
import ChatContainer from "../Components/ChatContainer";
import MainContainer from "../Components/MainContainer";
import { SIGN_IN, SIGN_UP, TYPE_MAIN } from "./UtilTexts"


export const publicNav = [
    { path: "/", name: "accessSignIn", element: <Access typeOfAccess={SIGN_IN} /> },
    { path: "/signUp", name: "accessSignUp", element: <Access typeOfAccess={SIGN_UP} /> },
]

export const privateNav = [
    { path: "/home", name: "home", element: <MainContainer wichMain={TYPE_MAIN[0]} /> },
    { path: "/userHome", name: "userHome", element: <MainContainer wichMain={TYPE_MAIN[1]} /> },
    { path: "/userDetails", name: "userDetails", element: <MainContainer wichMain={TYPE_MAIN[2]} /> },
    { path: "/chat", name: "chat", element: <ChatContainer /> }
]

