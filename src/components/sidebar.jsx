

function Sidebar({ isClosed }) {
  

  return (
  
    <aside className={`sidebar ${isClosed ? "closed" : ""}`}>

      <div className="logo">
        <span>logo</span>
      </div>

      <a href="/" className="active">
        <span>
          <i className="fa-brands fa-dashcube"></i>
          Dashboard
        </span>
      </a>

      <a href="#">
        <span>
          <i className="fa-solid fa-feather-pointed"></i>
          Appointment
        </span>
      </a>

      <a href="/doctor">
        <span>
          <i className="fa-solid fa-user-doctor"></i>
          Find Doctor
        </span>
      </a>

      <a href="/clinic">
        <span>
          <i className="fa-solid fa-house-chimney-medical"></i>
          Find Clinic
        </span>
      </a>

      <a href="#">
        <span>
          <i className="fa-solid fa-chart-bar"></i>
          Chat
        </span>
      </a>

      <a href="/market">
        <span>
          <i className="fa-solid fa-magnifying-glass-location"></i>
          Find Market
        </span>
      </a>

      <a href="/pharmacy">
        <span>
          <i className="fa-solid fa-capsules"></i>
          Find Pharmacy
        </span>
      </a>

      <a href="#">
        <span>
          <i className="fa-solid fa-book"></i>
          My Dependents
        </span>
      </a>

      <a href="#">
        <span>
          <i className="fa-solid fa-circle-user"></i>
          My Account
        </span>
      </a>

      <a href="#">
        <span>
          <i className="fa-solid fa-gear"></i>
          Setting
        </span>
      </a>

      <div className="help">
        <span>?</span>
        <p>Need Help?</p>
      </div>

    </aside>
  );
}

export default Sidebar;