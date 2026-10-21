
import { useEffect, useState } from "react";
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

// Demo clinic data. Coordinates are approximate examples.
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

// Automatically adjust map to the filtered clinics.
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
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [view, setView] = useState("list");

  const filteredClinics = clinics.filter((clinic) => {
    const searchText = search.trim().toLowerCase();
    const locationText = location.trim().toLowerCase();

    const searchMatch =
      !searchText ||
      `${clinic.name} ${clinic.type} ${clinic.specialty} ${clinic.location}`
        .toLowerCase()
        .includes(searchText);

    const locationMatch =
      !locationText ||
      clinic.location.toLowerCase().includes(locationText);

    const specialtyMatch =
      specialty === "all" || clinic.specialty === specialty;

    return searchMatch && locationMatch && specialtyMatch;
  });

  return (
    <section
      className={`find-clinic ${isClosed ? "sidebar-closed" : ""}`}
    >
      <div className="clinic-banner">
        <div className="clinic-top">
          <div className="page-title">
            <a href="/">
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
            onClick={() => setIsClosed(!isClosed)}
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
              />
            </div>

            <button
              type="button"
              className="header-icon"
              aria-label="Notifications"
            >
              <i className="fa-solid fa-bell" />
            </button>

            <button
              type="button"
              className="header-icon"
              aria-label="Settings"
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

        <div className="search-area">
          <input
            type="search"
            placeholder="Search by clinic name or type"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <input
            type="text"
            placeholder="Enter city or location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />

          <button
            type="button"
            onClick={() => setView("list")}
          >
            Search
          </button>
        </div>
      </div>

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
            Search and specialty filters update both the list and the map.
          </p>
        </aside>

        <div className="clinic-result">
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
                      onClick={() => setView("map")}
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
                  onClick={() => {
                    setSearch("");
                    setLocation("");
                    setSpecialty("all");
                  }}
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
                  No clinics match your search, so there are no markers to show.
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
