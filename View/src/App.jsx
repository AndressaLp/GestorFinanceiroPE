import { BrowserRouter, Route, Routes } from "react-router-dom"
import AccessPage from "./pages/AccessPage"
import DashboardPage from "./pages/DashboardPage"
import ConfigPage from "./pages/ConfigPage"
import MainPage from "./pages/MainPage"
import ClientsPage from "./pages/ClientsPage"
import ServicesPage from "./pages/ServicesPage"
import ReportsPage from "./pages/ReportsPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccessPage />} />
          <Route path="/main/*" element={<MainPage/>}>
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
