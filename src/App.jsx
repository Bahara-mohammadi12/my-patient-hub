import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './pages/extra-pages.css';
import { AppProvider } from './context/AppContext.jsx';
import { useApp } from './context/useApp.js';
import Sidebar from './components/sidebar.jsx';
import Home from './components/home.jsx';
import Doctor from './components/doctor.jsx';
import Clinic from './components/clinic.jsx';
import Market from './components/market.jsx';
import Login from './components/login.jsx';
import Pharmacy from './components/pharmacy.jsx';
import Dependent from './components/dependent.jsx';
import Setting from './components/setting.jsx';
import { AccountPage, AppointmentsPage, CartPage, ChatPage } from './pages/WorkspacePages.jsx';

function ProtectedLayout({ children, isClosed, setIsClosed }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return <><Sidebar
  isClosed={isClosed}
  setIsClosed={setIsClosed}
/>
  <div className={`app-main-shell ${isClosed ? "sidebar-collapsed" : ""}`}>{children({ isClosed, setIsClosed })}</div></>;
}
function AppRoutes() {
  const [isClosed, setIsClosed] = useState(() => typeof window !== 'undefined' && window.innerWidth < 680);
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Home {...props} />}</ProtectedLayout>} />
    <Route path="/dashboard" element={<Navigate to="/" replace />} />
    <Route path="/doctor" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Doctor {...props} />}</ProtectedLayout>} />
    <Route path="/clinic" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Clinic {...props} />}</ProtectedLayout>} />
    <Route path="/market" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Market {...props} />}</ProtectedLayout>} />
    <Route path="/pharmacy" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Pharmacy {...props} />}</ProtectedLayout>} />
    <Route path="/dependent" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Dependent {...props} />}</ProtectedLayout>} />
    <Route path="/setting" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{(props) => <Setting {...props} />}</ProtectedLayout>} />
    <Route path="/account" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{() => <AccountPage />}</ProtectedLayout>} />
    <Route path="/appointments" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{() => <AppointmentsPage />}</ProtectedLayout>} />
    <Route path="/chat" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{() => <ChatPage />}</ProtectedLayout>} />
    <Route path="/cart" element={<ProtectedLayout isClosed={isClosed} setIsClosed={setIsClosed}>{() => <CartPage />}</ProtectedLayout>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
export default function App() { return <AppProvider><BrowserRouter><AppRoutes /></BrowserRouter></AppProvider>; }
