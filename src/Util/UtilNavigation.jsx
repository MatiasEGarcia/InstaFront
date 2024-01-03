import Access from "../Components/Access";
import ChatContainer from "../Components/Containers/ChatContainer";
import MainContainer from "../Components/Containers/MainContainer";
import { ChatProvider } from "../Context/ChatContext";
import { SIGN_IN, SIGN_UP, TYPE_MAIN } from "./UtilTexts"


export const publicNav = [
    { path: "/", name: "accessSignIn", element: <Access typeOfAccess={SIGN_IN} /> },
    { path: "/signUp", name: "accessSignUp", element: <Access typeOfAccess={SIGN_UP} /> },
]

export const privateNav = [
    { path: "/home", name: "home", element: <MainContainer wichMain={TYPE_MAIN[0]} /> },
    { path: "/userHome/:userId", name: "userHome", element: <MainContainer wichMain={TYPE_MAIN[1]} /> },
    { path: "/userDetails", name: "userDetails", element: <MainContainer wichMain={TYPE_MAIN[2]} /> },
    { path: "/createPublication", name: "createPublication", element: <MainContainer wichMain={TYPE_MAIN[3]} /> },
    {path: "/navigate" , name: 'navigate' , element: <MainContainer wichMain={TYPE_MAIN[4]}/>},
    {
        path: "/chat", name: "chat", element: <ChatProvider>
                                                 <ChatContainer />
                                              </ChatProvider>
    }
]

