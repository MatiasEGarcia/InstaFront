import Access from "./Components/Access"
import { SIGN_IN, SIGN_UP } from "./Util/UtilTexts"
import MainContainer from "./Components/MainContainer"
import ChatContainer from "./Components/ChatContainer"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Access typeOfAccess={SIGN_IN}/>}></Route>
        <Route exact path="/signUp" element={<Access typeOfAccess={SIGN_UP}/>}></Route>

        {/**This should be protected */}
        <Route exact path="/home" element={<MainContainer wichMain='home'/>}></Route>
        <Route exact path="/userHome" element={<MainContainer wichMain='userMainhome'/>}></Route>
        <Route exact path="/chat" element={<ChatContainer/>}></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
