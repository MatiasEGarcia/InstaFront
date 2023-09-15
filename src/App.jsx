import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from "./Context/NotificationContext";
import { publicNav, privateNav } from "./Util/Navigation";
import { AuthProvider } from "./Context/AuthContext";
import RequireAuth from "./Components/Auth/RequireAuth";
import NoRequireAuth from "./Components/Auth/NoRequireAuth";

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
