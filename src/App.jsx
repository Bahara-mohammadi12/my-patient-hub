import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

import SharedHeader from './components/SharedHeader.jsx';

import { AccountPage, AppointmentsPage, CartPage, ChatPage } from './pages/WorkspacePages.jsx';

function ProtectedLayout({
  children,
  isClosed,
  setIsClosed,
  searchQuery,
  setSearchQuery,
}) {
  const { user } = useApp();
  const location = useLocation();

const hideSharedHeader = ['/', '/doctor', '/clinic']
.includes(location.pathname);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Sidebar
        isClosed={isClosed}
        setIsClosed={setIsClosed}
      />

      <div className={`app-main-shell ${isClosed ? 'sidebar-collapsed' : ''}`}>
        
        {!hideSharedHeader && (
  <SharedHeader
    isClosed={isClosed}
    setIsClosed={setIsClosed}
    query={searchQuery}
    setQuery={setSearchQuery}
  />
)}


        {children({
          isClosed,
          setIsClosed,
          searchQuery,
        })}
      </div>
    </>
  );
}

// ```jsx
function AppRoutes() {
  const [isClosed, setIsClosed] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 680
  );

  const [searchQuery, setSearchQuery] = useState('');

  const layoutProps = {
    isClosed,
    setIsClosed,
    searchQuery,
    setSearchQuery,
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Home {...props} />}
          </ProtectedLayout>
        }
      />

      <Route path="/dashboard" element={<Navigate to="/" replace />} />

      <Route
        path="/doctor"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Doctor {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/clinic"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Clinic {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/market"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Market {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/pharmacy"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Pharmacy {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/dependent"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Dependent {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/setting"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <Setting {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <AccountPage {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <AppointmentsPage {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <ChatPage {...props} />}
          </ProtectedLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedLayout {...layoutProps}>
            {(props) => <CartPage {...props} />}
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


export default function App() { return <AppProvider><BrowserRouter><AppRoutes /></BrowserRouter></AppProvider>; }
