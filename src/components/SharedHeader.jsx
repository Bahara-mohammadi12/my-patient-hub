// ```jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp.js';

const services = [
  { id: 'doctors', label: 'Available Doctors', change: 'Find your specialist', to: '/doctor', terms: 'doctor doctors specialist cardiologist dermatologist' },
  { id: 'clinics', label: 'Partner Clinics', change: 'Care near you', to: '/clinic', terms: 'clinic clinics hospital medical center' },
  { id: 'pharmacies', label: 'Pharmacies', change: 'Browse medicines', to: '/pharmacy', terms: 'pharmacy pharmacies medicine medication wellness' },
  { id: 'appointments', label: 'Appointments', change: 'Upcoming and past', to: '/appointments', terms: 'appointment booking visits' },
  { id: 'health', label: 'Health overview', change: 'Keep things organized', to: '/account', terms: 'health account profile wellness' },
  { id: 'market', label: 'Marketplace', change: 'Shop local', to: '/market', terms: 'market marketplace food grocery products' },
  { id: 'chat', label: 'Messages', change: 'Open your conversations', to: '/chat', terms: 'chat messages conversation' },
  { id: 'dependents', label: 'My Dependents', change: 'Manage family profiles', to: '/dependent', terms: 'dependent family child' },
];

const pageTitles = {
  '/': 'Dashboard',
  '/doctor': 'Find a Doctor',
  '/clinic': 'Find a Clinic',
  '/market': 'Marketplace',
  '/pharmacy': 'Find Pharmacy',
  '/dependent': 'My Dependents',
  '/setting': 'Settings',
  '/account': 'My Account',
  '/appointments': 'My Appointments',
  '/chat': 'Messages',
  '/cart': 'Shopping Cart',
};

export default function SharedHeader({
  isClosed,
  setIsClosed,
  query = '',
  setQuery = () => {},
}) {
  const app = useApp();
  const signOut = app.signOut;
  const user = app.user;
  const notifications = app.notifications || [];
  const markNotificationsRead = app.markNotificationsRead;
  const cart = app.cart || [];

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || 'My Patient HUB';

  const searchText = String(query || '').trim().toLowerCase();

  const filteredServices = services.filter((item) => {
    const searchableText = item.label + ' ' + item.terms;
    return searchableText.toLowerCase().includes(searchText);
  });

  const unread = notifications.filter((item) => !item.read).length;

  const cartCount = cart.reduce((sum, item) => {
    return sum + (Number(item.quantity) || 1);
  }, 0);

  return (
    <header className="nc-dashboard-header">
      <div className="nc-page-title">
        <button
          className="nc-home-mark"
          type="button"
          onClick={() => navigate('/')}
          aria-label="Dashboard"
        >
          <i className="fa-solid fa-heart-pulse" />
        </button>

        <div>
          <span>My Patient HUB / Workspace</span>
          <h1>{pageTitle}</h1>
        </div>
      </div>

      <button
        className="nc-menu-button"
        type="button"
        aria-label="Toggle sidebar"
        onClick={() => setIsClosed((previous) => !previous)}
      >
        <i className="fa-solid fa-bars" />
      </button>

      <div className="nc-header-right">
        <div className="nc-search-wrap">
          <label className="nc-search-box">
            <i className="fa-solid fa-magnifying-glass" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this page..."
              aria-label="Search current page"
            />

            <kbd>⌕</kbd>
          </label>
          
          {searchText !== '' && (

            <div className="nc-search-results">
              <strong>Workspace services</strong>

              {filteredServices.length > 0 ? (
                filteredServices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setQuery('');
                      navigate(item.to);
                    }}
                  >
                    <span className="nc-search-result-icon">
                      <i className="fa-solid fa-arrow-right" />
                    </span>

                    <span>
                      {item.label}
                      <small>{item.change}</small>
                    </span>

                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </button>
                ))
              ) : (
                <p>No matching service found.</p>
              )}
            </div>
          )}
        </div>

        <div className="nc-header-pop-wrap">
          <button
            className="nc-header-icon"
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications((previous) => !previous);
              setShowProfile(false);

              if (typeof markNotificationsRead === 'function') {
                markNotificationsRead();
              }
            }}
          >
            <i className="fa-regular fa-bell" />

            {unread > 0 && (
              <span className="nc-notification-count">{unread}</span>
            )}
          </button>

          {showNotifications && (
            <div className="nc-popover">
              <div className="nc-popover-title">
                <strong>Notifications</strong>
                <small>{notifications.length} updates</small>
              </div>

              {notifications.slice(0, 5).map((item, index) => (
                <div className="nc-notification-row" key={item.id || index}>
                  <span className="nc-notification-dot" />
                  <div>
                    <b>{item.title || 'Notification'}</b>
                    <p>{item.detail || ''}</p>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <p>No notifications yet.</p>
              )}
            </div>
          )}
        </div>

        <Link
          to="/cart"
          className="nc-header-icon nc-cart-top-icon"
          aria-label="Shopping cart"
          title="Shopping cart"
        >
          <i className="fa-solid fa-bag-shopping" />

          {cartCount > 0 && (
            <span className="nc-notification-count">{cartCount}</span>
          )}
        </Link>

        <div className="nc-header-pop-wrap">
          <button
            type="button"
            className="nc-profile"
            onClick={() => {
              setShowProfile((previous) => !previous);
              setShowNotifications(false);
            }}
          >
            <span className="nc-profile-avatar">
              {String(user?.fullName || 'P').slice(0, 1).toUpperCase()}
            </span>

            <span>
              <strong>{user?.fullName || 'My Account'}</strong>
              <small>
                {user?.email || user?.phone || 'Patient account'}
              </small>
            </span>

            <i className="fa-solid fa-chevron-down nc-profile-chevron" />
          </button>

          {showProfile && (
            <div className="nc-popover nc-profile-pop">
              <button type="button" onClick={() => navigate('/account')}>
                <i className="fa-regular fa-user" /> My Account
              </button>

              <button type="button" onClick={() => navigate('/setting')}>
                <i className="fa-solid fa-gear" /> Settings
              </button>
              
              <button
  type="button"
  onClick={() => {
    setShowProfile(false);
    app.signOut();
    navigate('/login', { replace: true });
  }}
>
  <i className="fa-solid fa-right-from-bracket" /> Logout
</button>

              <button type="button" onClick={() => navigate('/cart')}>
                <i className="fa-solid fa-bag-shopping" /> Shopping cart
                <b>{cartCount}</b>
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}

