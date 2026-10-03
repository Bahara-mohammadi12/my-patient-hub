import { useState } from "react";
function Clinic({ isClosed, setIsClosed}) {

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [view, setView] = useState("list");
  const [menuOpen, setMenuOpen] = useState(false);

  const clinic = [
    {
      name: "City Medical Center",
      location: "Kabul Afghanistan",
      type: "General & Specialist Clinic",
      doctors: "Experienced Medical Professionals",
      hours: "8:00 AM - 8:00 PM",
      specialty: "cardiologist",
      image: "/clinic1.jpg"
    },
    {
      name: "Kateb Medical Center",
      location: "Kabul Afghanistan",
      type: "General & Specialist Clinic",
      doctors: "Experienced Medical Professionals",
      hours: "8:00 AM - 8:00 PM",
      specialty: "dermatologist",
      image: "/clinic2.jpg"
    }
  ];

  const filteredClinics = clinic.filter((clinic) => {

    const searchMatch =
      clinic.name.toLowerCase().includes(search.toLowerCase());

    const locationMatch =
      clinic.location.toLowerCase().includes(location.toLowerCase());

    const specialtyMatch =
      specialty === "all" || clinic.specialty === specialty;

    return searchMatch && locationMatch && specialtyMatch;
  });


  return (
    <section className={`find-clinic ${isClosed ? "sidebar-closed" :""}`}>

      {/* Clinic Banner */}
      <div className="clinic-banner">

        <div className="clinic-top">

          {/* Page Title */}
          <div className="page-title">
            <a href="/">
              <i className="fa-solid fa-house"></i>
            </a>

            <div>
              <small>/ Dashboard</small>
              <h3>Dashboard</h3>
            </div>
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
              <input type="text" id="doctor-search" placeholder="Search..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
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
        </div>

        {/* Clinic Title */}
        <h1>Find a Clinic</h1>
        <p>Search clinics and schedule an appointment through Clinic</p>

        {/* Search Area */}
        <div className="search-area">

          <input
            type="text"
            id="doctor-search"
            placeholder="Search..."
          />

          <input
            type="text"
            id="locationserch"
            placeholder="Enter location or hospital"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button id="searchBtn">
            Search
          </button>

        </div>
      </div>

      {/* List / Map Button */}
      <div className="view-button">
        <button id="listBtn" className={view === "list" ? "active" : ""}
        onClick={() => setView("list")}>
          List
        </button>

        <button id="mapBtn"
        className={view === "map" ? "active" : ""}
        onClick={() => setView("map")}>
          Map
        </button>
      </div>

      {/* Main Clinic Area */}
      <div className="clinic-content">

        {/* Left Filter */}
        <aside className="clinic-filter">

          <h3>Filter By</h3>

          <select id="specialtyFilter"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}>
            <option value="all">Specialties</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dermatologist">Dermatologist</option>
          </select>

          <select>
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select>
            <option>Condition</option>
            <option>Emergency</option>
            <option>Family doctor</option>
          </select>

          <select>
            <option>Language</option>
            <option>English</option>
            <option>Dari</option>
            <option>Pashto</option>
          </select>

          <h3>Provider Who Treat</h3>

          <label className="check-label">
            <input type="checkbox" />
            All Ages
          </label>

          <label className="check-label">
            <input type="checkbox" />
            Children
          </label>

          <label className="check-label">
            <input type="checkbox" />
            Adults
          </label>

          <h3>View Only</h3>

          <label className="check-label">
            <input type="checkbox" />
            Online schedule
          </label>

          <label className="check-label">
            <input type="checkbox" />
            Primary Care
          </label>

        </aside>

        {/* Right Side */}
        <div className="clinic-result">
          {view === "list" && (

          <div id="listView">
            {filteredClinics.map((clinic, index) => (

            <div className="clinic-card" key={index}>

              <img
                src={clinic.image}
                alt={clinic.name}
              />

              <div className="clinic-details">

                <h2>{clinic.name}</h2>

                <p>{clinic.location}</p>

                <p>Type: {clinic.type}</p>

                <p>Doctors: {clinic.doctors}</p>

                <p>Opening hours: {clinic.hours}</p>

              </div>

              <div className="clinic-action">
                <a href="/doctor">
                  Find a Doctor & schedule
                </a>
              </div>

            </div>
            ))}
            
            {filteredClinics.length === 0 && (
              <p>No clinic found</p>
            )}
            </div>
          )}
            {view === "map" && (
              <div id="mapView">
                <h2>Clinic Location</h2>
            

            <iframe
              src="https://www.google.com/maps?q=Kabul+Afghanistan&output=embed"
              title="Clinic Location"
              loading="lazy"
            ></iframe>

          </div>
          )}
        </div>
      </div>

    </section>
  );
}

export default Clinic;