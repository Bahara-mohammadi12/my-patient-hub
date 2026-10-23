import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Clinic data
const clinics = [
  {
    id: 1,
    name: "City Medical Center",
    location: "Kabul, Afghanistan",
    type: "General & Specialist Clinic",
    doctors: "Experienced Medical Professionals",
    hours: "8:00 AM - 8:00 PM",
    specialty: "cardiologist",
    image: "/clinic1.jpg",
    position: [34.528, 69.172],
  },
  {
    id: 2,
    name: "Kateb Medical Center",
    location: "Kabul, Afghanistan",
    type: "General & Specialist Clinic",
    doctors: "Experienced Medical Professionals",
    hours: "8:00 AM - 8:00 PM",
    specialty: "dermatologist",
    image: "/clinic2.jpg",
    position: [34.486, 69.134],
  },
];

// Fit map to clinic markers
function FitMapToResults({ items }) {
  const map = useMap();

  useEffect(() => {
    if (!items.length) return;

    if (items.length === 1) {
      map.setView(items[0].position, 15);
      return;
    }

    const bounds = L.latLngBounds(
      items.map((item) => item.position)
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 14,
    });
  }, [items, map]);

  return null;
}

function Clinic({ isClosed, setIsClosed }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");

  const [specialty, setSpecialty] = useState("all");
  const [view, setView] = useState("list");

  // Notification panel
  const [showNotifications, setShowNotifications] = useState(false);

  // Demo notifications
  const notifications = [
    {
      id: 1,
      title: "Clinic page updated",
      message:
        "You can search clinics and view their locations on the map.",
      time: "Recent update",
    },
    {
      id: 2,
      title: "Clinic search available",
      message:
        "Search clinics by name, type, location, and specialty.",
      time: "Available now",
    },
    {
      id: 3,
      title: "Account settings",
      message:
        "Visit Setting to manage your profile and security options.",
      time: "Available now",
    },
  ];

  // Filter clinics using the applied clinic name and location
  const filteredClinics = clinics.filter((clinic) => {
    const searchText = appliedSearch.trim().toLowerCase();
    const locationText = appliedLocation.trim().toLowerCase();

    const searchMatch =
      !searchText ||
      `${clinic.name} ${clinic.type} ${clinic.specialty} ${clinic.doctors}`
        .toLowerCase()
        .includes(searchText);

    const locationMatch =
      !locationText ||
      clinic.location.toLowerCase().includes(locationText);

    const specialtyMatch =
      specialty === "all" || clinic.specialty === specialty;

    return searchMatch && locationMatch && specialtyMatch;
  });

  // Search by clinic name/type and show the list
  function handleCurrentSearch() {
    setAppliedSearch(search);
    setAppliedLocation("");
    setLocation("");
    setView("list");
  }

  // Search by city/location and show the map
  function handleLocationSearch() {
    setAppliedLocation(location);
    setAppliedSearch("");
    setSearch("");
    setView("map");
  }

  function handleClearFilters() {
    setSearch("");
    setLocation("");
    setAppliedSearch("");
    setAppliedLocation("");
    setSpecialty("all");
    setView("list");
  }

  return (
    <section
      className={`find-clinic ${isClosed ? "sidebar-closed" : ""}`}
    >
      {/* Clinic banner and header */}
      <div className="clinic-banner">
        <div className="clinic-top">
          <div className="page-title">
            <a href="/" aria-label="Home">
              <i className="fa-solid fa-house" />
            </a>

            <div>
              <small>/ Find Clinic</small>
              <h3>Find a Clinic</h3>
            </div>
          </div>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setIsClosed((previous) => !previous)}
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-bars" />
          </button>

          <div className="header-right">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass" />

              <input
                type="search"
                placeholder="Search clinics..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleCurrentSearch();
                  }
                }}
              />
            </div>

            {/* Notifications */}
            <div className="clinic-notification-wrapper">
              <button
                type="button"
                className="header-icon"
                aria-label="Notifications"
                aria-expanded={showNotifications}
                title="Notifications"
                onClick={() =>
                  setShowNotifications((previous) => !previous)
                }
              >
                <i className="fa-solid fa-bell" />
                <span className="clinic-notification-dot" />
              </button>

              {showNotifications && (
                <div className="clinic-notification-panel">
                  <div className="clinic-notification-heading">
                    <h3>Recent Updates</h3>

                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>

                  {notifications.map((notification) => (
                    <div
                      className="clinic-notification-item"
                      key={notification.id}
                    >
                      <span className="clinic-notification-icon">
                        <i className="fa-solid fa-bell" />
                      </span>

                      <div>
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigate to Setting page */}
            <button
              type="button"
              className="header-icon"
              aria-label="Settings"
              title="Setting"
              onClick={() => navigate("/setting")}
            >
              <i className="fa-solid fa-gear" />
            </button>

            <div className="profile">
              <div className="profile-img">
                <i className="fa-solid fa-circle-user" />
              </div>

              <div>
                <strong>My Account</strong>
                <small>Welcome</small>
              </div>
            </div>
          </div>
        </div>

        <h1>Find a Clinic</h1>

        <p>
          Find healthcare centers and view their locations on the map.
        </p>

        {/* Clinic search and location search */}
        <div className="search-area clinic-search-area">
          <input
            type="search"
            placeholder="Search clinic name or type"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCurrentSearch();
              }
            }}
          />

          <input
            type="text"
            placeholder="Enter city or location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLocationSearch();
              }
            }}
          />

          <button
            type="button"
            onClick={handleCurrentSearch}
          >
            Current
          </button>

          <button
            type="button"
            onClick={handleLocationSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* List and map view buttons */}
      <div className="view-button">
        <button
          type="button"
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          List
        </button>

        <button
          type="button"
          className={view === "map" ? "active" : ""}
          onClick={() => setView("map")}
        >
          Map ({filteredClinics.length})
        </button>
      </div>

      {/* Filters and results */}
      <div className="clinic-content">
        <aside className="clinic-filter">
          <h3>Filter By</h3>

          <select
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          >
            <option value="all">All Specialties</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dermatologist">Dermatologist</option>
          </select>

          <p className="clinic-result-count">
            {filteredClinics.length} clinic(s) found
          </p>

          <p className="clinic-filter-note">
            Search and specialty filters update clinic results.
          </p>
        </aside>

        <div className="clinic-result">
          {/* Clinic list */}
          {view === "list" && (
            <div id="listView">
              {filteredClinics.map((clinic) => (
                <article className="clinic-card" key={clinic.id}>
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="clinic-details">
                    <h2>{clinic.name}</h2>

                    <p>
                      <i className="fa-solid fa-location-dot" />{" "}
                      {clinic.location}
                    </p>

                    <p>Type: {clinic.type}</p>
                    <p>Specialty: {clinic.specialty}</p>
                    <p>Doctors: {clinic.doctors}</p>
                    <p>Opening hours: {clinic.hours}</p>

                    <button
                      type="button"
                      className="clinic-show-map"
                      onClick={() => {
                        setAppliedSearch(clinic.name);
                        setAppliedLocation("");
                        setSearch(clinic.name);
                        setLocation("");
                        setView("map");
                      }}
                    >
                      <i className="fa-solid fa-map-location-dot" />{" "}
                      Show on map
                    </button>
                  </div>

                  <div className="clinic-action">
                    <a href="/doctor">
                      Find a Doctor &amp; Schedule
                    </a>
                  </div>
                </article>
              ))}

              {filteredClinics.length === 0 && (
                <p className="clinic-empty">
                  No clinics match your search. Try another name or location.
                </p>
              )}
            </div>
          )}

          {/* Clinic map */}
          {view === "map" && (
            <div id="mapView">
              <div className="clinic-map-heading">
                <div>
                  <h2>Clinic Locations</h2>
                  <p>
                    {filteredClinics.length} matching clinic(s) on the map
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </button>
              </div>

              {filteredClinics.length > 0 ? (
                <MapContainer
                  center={[34.525, 69.17]}
                  zoom={12}
                  scrollWheelZoom={true}
                  className="clinic-leaflet-map"
                  style={{
                    width: "100%",
                    height: "460px",
                    minHeight: "350px",
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <FitMapToResults items={filteredClinics} />

                  {filteredClinics.map((clinic) => (
                    <Marker
                      key={clinic.id}
                      position={clinic.position}
                    >
                      <Popup>
                        <div className="clinic-map-popup">
                          <strong>{clinic.name}</strong>
                          <p>{clinic.location}</p>
                          <p>{clinic.type}</p>
                          <p>Specialty: {clinic.specialty}</p>
                          <p>Hours: {clinic.hours}</p>
                          <a href="/doctor">Find a doctor</a>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <p className="clinic-empty">
                  No clinics match your location, so there are no markers to show.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Clinic;