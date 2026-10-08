import { Link } from "react-router-dom";
function Home({ isClosed, setIsClosed }) {
  return (
    <>
      <header className="header">

        {/* Page Title */}
        <div className="page-title">
          <Link to="/login">
            <i className="fa-solid fa-house"></i>
          </Link>

          <small>/ Dashboard</small>

          <h3>Dashboard</h3>
        </div>

        {/* Menu Button */}
        <button id="menuBtn"
        className="menu-btn"
        onClick={() => setIsClosed(!isClosed)}>
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Right Side */}
        <div className="header-right">

          {/* Search */}
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search..."
            />
          </div>

          {/* Notification */}
          <button className="header-icon">
            <i className="fa-solid fa-bell"></i>
          </button>

          {/* Settings */}
          <button className="header-icon">
            <i className="fa-solid fa-gear"></i>
          </button>

          {/* Profile */}
          <div className="profile">

            <div className="profile-img">
              <i className="fa-solid fa-circle-user"></i>
            </div>

            <div>
              <strong>My Account</strong>
              <small>Welcome</small>
            </div>

          </div>

        </div>
        
      </header>
      {/* main content */}
      <main className="dashboard-content">

      </main>
    </>
  );
}

export default Home;