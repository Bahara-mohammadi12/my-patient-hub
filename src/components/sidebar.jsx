import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp.js';
const links = [
  { to: '/', label: 'Dashboard', icon: 'fa-chart-pie' },
  { to: '/appointments', label: 'Appointments', icon: 'fa-calendar-check' },
  { to: '/doctor', label: 'Find Doctor', icon: 'fa-user-doctor' },
  { to: '/clinic', label: 'Find Clinic', icon: 'fa-house-medical' },
  { to: '/chat', label: 'Messages', icon: 'fa-comments' },
  { to: '/market', label: 'Marketplace', icon: 'fa-store' },
  { to: '/pharmacy', label: 'Find Pharmacy', icon: 'fa-capsules' },
  { to: '/dependent', label: 'My Dependents', icon: 'fa-people-roof' },
  { to: '/account', label: 'My Account', icon: 'fa-circle-user' },
  { to: '/setting', label: 'Settings', icon: 'fa-gear' },
];
export default function Sidebar({ isClosed = false, setIsClosed }) {
    const { cart } = useApp();
  const navigate = useNavigate();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
return (
  <>
    <div
      className={`sidebar-overlay ${!isClosed ? 'visible' : ''}`}
      onClick={() => setIsClosed?.(true)}
    />

    <aside className={`sidebar ${isClosed ? 'closed' : 'mobile-open'}`}>
      
          <button className="logo sidebar-logo" onClick={() => navigate('/')}><span className="logo-mark"><i className="fa-solid fa-heart-pulse" /></span><span className="logo-text">Patient<span>HUB</span></span></button>
    <div className="sidebar-caption">WORKSPACE</div>
    <nav className="sidebar-nav">{links.map((link) => 
      <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} title={link.label}><i className={`fa-solid ${link.icon}`} /><span>{link.label}</span>{link.to === '/market' && count > 0 && <b className="sidebar-count">{count}</b>}</NavLink>)}
      <NavLink to="/cart" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><i className="fa-solid fa-bag-shopping"/><span>Shopping Cart</span>{count > 0 && <b className="sidebar-count">{count}</b>}</NavLink>
    </nav>
    <div className="sidebar-help"><span className="help-icon">?</span><div><strong>Need a hand?</strong><small>We're here to help</small></div></div>
    <div className="sidebar-footnote">MY PATIENT HUB <span>•</span> AFGHANISTAN</div>
      </aside>
  </>
  );
}