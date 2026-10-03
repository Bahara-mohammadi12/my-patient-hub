
import { useState } from "react";
function Doctor({ isClosed, setIsClosed}) {

  const [headerSearch, setHeaderSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [View, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("all");

  const doctors = [
    {
     name: "Dr. Ahmad Rahimi",
     specialty: "Cardiologist",
     hospital: "City Medical Center, Kabul",
     image: "/doctor1.jpg.jpg",
    },
    {
      name: "Dr. Ali Mohammadi",
      specialty: "Dermatologist",
      hospital: "City Medical Center, Kabul",
      image: "/doctor2.jpg.jpg",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
    doctor.hospital.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });
  return (
    <section className={`find-doctor ${isClosed ? "sidebar-closed" :""}`}>

      <div className="doctor-banner">

        <div className="doctor-top">

          <div className="page-title">
            <a href="/">
              <i className="fa-solid fa-house"></i>
            </a>

            <div>
              <small>/ Dashboard</small>
              <h3>Dashboard</h3>
            </div>
          </div>

          <button id="menuBtn" 
          className="menu-btn"
          onClick={() => setIsClosed(!isClosed)}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="header-right">

            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text"
              placeholder="Search..."
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              onKeyDown={(e) => {if (e.key === "Enter") {setSearch(headerSearch);
                setSearched(true);
              }
              }} />
            </div>

            <button className="header-icon">
              <i className="fa-solid fa-bell"></i>
            </button>

            <button className="header-icon">
              <i className="fa-solid fa-gear"></i>
            </button>

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

        <h1>Find a Doctor</h1>

        <p>
          Search doctors and schedule an appointment
        </p>

        <div className="search-area">

          <input
            type="text"
            id="doctor-search"
            placeholder="Search doctors by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            id="locationserch"
            placeholder="Enter location or hospital"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button id="searchBtn"
          onClick={() => setSearched(true)}>
            Search
          </button>

        </div>

      </div>


      <div className="view-button">

        <button className={View === "list" ? "active" : ""}
        onClick={() => setView("list")}>
          List
        </button>

        <button className={View === "map" ? "active" : ""}
        onClick={() => setView("map")}>
          Map
        </button>

      </div>


      <div className="doctor-content">

        <aside className="doctor-filter">

          <h3>Filter By</h3>

          <select 
          id="specialtyFilter"
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


        <div className="doctor-result">
          {View === "list" && (
          <div id="listView">

            <div className="sort-area">
              <span>Sort By</span>
              <button className="sort-active">
                NEXT AVAILABLE
              </button>
              <button>
                DISTANCE
              </button>
            </div>

            {(searched ? filteredDoctors : doctors).map((doctor) => (
            <div className="doctor-card"
            key={doctor.name}>
            
              <img src={doctor.image}
              alt={doctor.name} />

              <div className="doctor-details">
                <h2>{doctor.name}</h2>
                <h4>{doctor.specialty}</h4>
                <p>{doctor.hospital}</p>
                <p>English, Dari, Pashto</p>
              </div>

              <div className="doctor-action">
                <span className="available">
                  NEXT AVAILABLE: TUESDAY, MARCH 22
                </span>
              </div>

            </div>
            ))}
            {searched && filteredDoctors.length === 0 &&(<p>No doctor found.</p>)}

          </div>
          )}
          {View === "map" && (
          <div id="mapView">

            <h2>Doctor Location</h2>

            <iframe
              src="https://maps.app.goo.gl/d5spfVoyc193YjCo6?g_st=aw"
              title="Doctor Location"
            ></iframe>

          </div>
          )}
        </div>

      </div>

    </section>
  );
}

export default Doctor;