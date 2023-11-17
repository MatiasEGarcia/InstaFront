import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoRequireAuth from "./Components/Auth/NoRequireAuth";
import RequireAuth from "./Components/Auth/RequireAuth";
import { AuthProvider } from "./Context/AuthContext";
import { NotificationProvider } from "./Context/NotificationContext";
import { privateNav, publicNav } from "./Util/UtilNavigation";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route element={<NoRequireAuth />}>
                  {publicNav.map((r, i) => {
                    return <Route key={i} path={r.path} element={r.element} />
                  })
                  }
                </Route>


                {/**This should be protected */}
                <Route element={<RequireAuth />}>
                  {
                    privateNav.map((r, i) => {
                      return <Route key={i} path={r.path} element={r.element} />
                    })
                  }
                </Route>
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>

  )
}

export default App
