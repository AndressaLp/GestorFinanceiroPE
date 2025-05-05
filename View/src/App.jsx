import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AccessPage from "./pages/AccessPage"
import DashboardPage from "./pages/DashboardPage"
import ConfigPage from "./pages/ConfigPage"
import MainPage from "./pages/MainPage"
import ClientsPage from "./pages/ClientsPage"
import ServicesPage from "./pages/ServicesPage"
import ReportsPage from "./pages/ReportsPage"

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace/>
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccessPage />} />
          <Route path="/main/*" element={<PrivateRoute><MainPage/></PrivateRoute>}>
            <Route index element={<DashboardPage />}/>
            <Route path="dashboard" element={<DashboardPage />}/>
            <Route path="clients" element={<ClientsPage />}/>
            <Route path="services" element={<ServicesPage />}/>
            <Route path="reports" element={<ReportsPage />}/>
            <Route path="config" element={<ConfigPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
