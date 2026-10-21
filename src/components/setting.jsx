import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp.js";
import "./setting.css";

function Setting({ isClosed, setIsClosed }) {
  const { user, setUser, signOut } = useApp();
  const navigate = useNavigate();
  const [profileVisible, setProfileVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("basic-info");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [form, setForm] = useState({
    firstName: user?.fullName?.split(" ")[0] || "",
    lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
    gender: "",
    birthDate: "",
    email: user?.email || "",
    bloodGroup: "",
    phone: user?.phone || "",
    address: user?.address || "Kabul, Afghanistan",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled] = useState(true);

  const [sessions] = useState([
    {
      id: 1,
      device: "Bucharest 68.133.163.201",
      location: "EU",
      active: true,
    },
    {
      id: 2,
      device: "Chrome on macOS",
      location: "US",
      active: false,
    },
    {
      id: 3,
      device: "Safari on iPhone",
      location: "US",
      active: false,
    },
  ]);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [accountDeactivated, setAccountDeactivated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));

    setPasswordMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser((previous) => ({ ...previous, fullName: `${form.firstName} ${form.lastName}`.trim(), email: form.email, phone: form.phone, address: form.address }));
    setPasswordMessage("Your profile information has been saved in this browser.");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (passwords.newPassword.length < 6) {
      setPasswordMessage(
        "Your new password must contain at least 6 characters."
      );
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage("The new passwords do not match.");
      return;
    }

    setPasswordMessage(
      "Password form validated. Connect your backend to update the real password."
    );
  };

  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      email: "",
      bloodGroup: "",
      phone: "",
      address: "",
    });
  };

  const handleDeleteAccount = () => {
    if (!deleteConfirmed) {
      alert("Please confirm that you want to delete your account.");
      return;
    }

    alert(
      "This is a demo only. Real account deletion must be handled securely by your backend."
    );
  };

  const navigateTo = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className={`setting-page ${isClosed ? "setting-sidebar-closed" : "" }`}>

      {/* ================= TOP HEADER ================= */}
      <header className="setting-top-header">
        <div className="setting-header-left">
        
          <div className="setting-breadcrumb">
            <Link to="/">Home</Link>
            <i className="fa-solid fa-chevron-right"></i>
            <span>Account Setting</span>
          </div>
        </div>
         <button
            type="button"
            className="setting-menu-button"
            onClick={() => setIsClosed(!isClosed)}
            aria-label="Toggle sidebar">
            <i className="fa-solid fa-bars"></i>
          </button>
        
        {/* header right */}
        <div className="setting-header-right">
          <label className="setting-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Type here..." />
          </label>

          
          <button
            type="button"
            className="setting-logout"
            onClick={() => { signOut(); navigate("/login"); }}>
            <i className="fa-solid fa-circle-user"></i>
            <span>Log out</span>
          </button>

          <button
            type="button"
            className="setting-header-icon"
            aria-label="Settings"
            title="Settings">
            <i className="fa-solid fa-gear"></i>
          </button>

          <button
            type="button"
            className="setting-header-icon"
            aria-label="Notifications"
            title="Notifications">
            <i className="fa-solid fa-bell"></i>
          </button>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <div className="setting-content">
       

        <div className="setting-layout">
          {/* ================= SETTINGS MENU ================= */}
          <aside className="setting-navigation">

            <button
              type="button"
              className={`setting-nav-link ${
                activeSection === "profile" ? "active" : "" }`}
              onClick={() => navigateTo("profile")}>
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </button>

            <button
              type="button"
              className={`setting-nav-link ${
                activeSection === "basic-info" ? "active" : "" }`}
              onClick={() => navigateTo("basic-info")}>
              <i className="fa-solid fa-id-card"></i>
              <span>Basic Info</span>
            </button>

            <button
              type="button"
              className={`setting-nav-link ${
                activeSection === "password" ? "active" : "" }`}
              onClick={() => navigateTo("password")}>
              <i className="fa-solid fa-cube"></i>
              <span>Change Password</span>
            </button>

            <button
              type="button"
              className={`setting-nav-link ${
                activeSection === "two-factor" ? "active" : "" }`}
              onClick={() => navigateTo("two-factor")}>
              <i className="fa-solid fa-lock"></i>
              <span>2FA</span>
            </button>

            <button
              type="button"
              className={`setting-nav-link ${
                activeSection === "sessions" ? "active" : "" }`}
              onClick={() => navigateTo("sessions")}>
              <i className="fa-solid fa-sliders"></i>
              <span>Sessions</span>
            </button>

            <button
              type="button"
              className={`setting-nav-link  ${
                activeSection === "delete-account" ? "active" : "" }`}
              onClick={() => navigateTo("delete-account")}>
              <i className="fa-solid fa-trash"></i>
              <span>Delete Account</span>
            </button>
          </aside>

          {/* ================= RIGHT SIDE ================= */}
          <div className="setting-sections">
            {/* PROFILE */}
            <section className="setting-card setting-profile-card" id="profile">
              <div className="setting-profile-user">
                <img
                  src="https://placehold.co/100x100/e9e5ff/6554c0?text=AS"
                  alt="Patient profile"/>

                <div>
                  <h2>{form.firstName || "Patient"} {form.lastName}</h2>
                  <p>Patient</p>
                </div>
              </div>

              <label className="setting-visibility">
                <span>
                  {profileVisible
                    ? "Switch to invisible"
                    : "Switch to visible"}
                </span>

                <input
                  type="checkbox"
                  checked={!profileVisible}
                  onChange={() => setProfileVisible((previous) => !previous)}/>

                <span className="setting-switch"></span>
              </label>
            </section>

            {/* BASIC INFO */}
            <section className="setting-card" id="basic-info">
              <div className="setting-section-heading">
                <div>
                  <h2>Basic Info</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="setting-form-grid">
                  <div className="setting-field">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={form.birthDate}
                      onChange={handleChange}/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="bloodGroup">Blood Group:</label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}>
                      <option value="">Select group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+93 XXX XXX XXX"/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="address">Address:</label>
                    <input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Your address"/>
                  </div>
                </div>

                <div className="setting-form-actions">
                  <button
                    type="button"
                    className="setting-cancel-button"
                    onClick={handleReset} >
                    Reset
                  </button>

                  <button type="submit" className="setting-primary-button">
                    Save Changes
                  </button>
                </div>
              </form>
            </section>

            {/* CHANGE PASSWORD */}
            <section className="setting-card" id="password">
              <div className="setting-section-heading">
                <div>
                  <h2>Change Password</h2>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="setting-password-fields">
                  <div className="setting-field">
                    <label htmlFor="currentPassword">
                      Current Password
                    </label>

                    <input
                      type={"password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Current Password"
                      required/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="newPassword">New Password</label>

                    <input
                      type={"password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      required/>
                  </div>

                  <div className="setting-field">
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>

                    <input
                      type={"password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm Password"
                      required/>
                  </div>
                </div>

                <div className="setting-password-requirements">
                  <h3>Password requirements</h3>
                  <p>Please follow this guide for a strong password.</p>

                  <ul>
                    <li className={passwords.newPassword.length >= 6 ? "passed" : "" }>
                      At least 6 characters
                    </li>

                    <li className={ /[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPassword)
                          ? "passed"
                          : "" }>
                      One special character
                    </li>

                    <li className={/\d/.test(passwords.newPassword) ? "passed" : "" }>
                      One number (2 are recommended)
                    </li>
                  </ul>
                </div>

                {passwordMessage && (
                  <p className="setting-message" role="status">
                    {passwordMessage}
                  </p>
                )}

                <div className="setting-form-actions">
                  <button
                    type="submit"
                    className="setting-primary-button">
                    UPDATE PASSWORD
                  </button>
                </div>
              </form>
            </section>

            {/* TWO FACTOR AUTHENTICATION */}
            <section className="setting-card" id="two-factor">
              <div className="setting-section-heading">
                <div>
                  <h2>Two-Factor Authentication</h2>
                </div>
                {/* setting badge */}
                <span
                  className={`setting-badge ${
                    twoFactorEnabled ? "success" : "neutral" }`}>
                  {twoFactorEnabled ? "ENABLED" : "DISABLED"}
                </span>
              </div>

              <div className="setting-security-row">
                <div className="setting-security-info">
                  
                  <div>
                    <h3>Security keys</h3>
                    <p>
                      No Security Key
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="setting-outline-button">
                  ADD
                </button>
              </div>

              <div className="setting-security-row">
                <div className="setting-security-info">
                  
                  <div>
                    <h3>SMS number</h3>
                    <p>008737859384</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="setting-outline-button">
                  EDIT
                </button>
              </div>

              <div className="setting-security-row">
                <div className="setting-security-info">
                 
                  <div>
                    <h3>Authenticator app</h3>
                    <p>
                     Not Configured
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="setting-outline-button">
                  Edit
                </button>
              </div>
             
            </section>

            {/* =============SESSIONS=========== */}
            <section className="setting-card" id="sessions">
              <div className="setting-section-heading">
                <div>
                  <h2>Sessions</h2>
                  <p>This is a list of devices that have logged into your account. Remove those that you do not recognize.</p>
                </div>
              </div>

              <div className="setting-session-list">
                {sessions.length === 0 && (
                  <p>No sessions to display.</p>)}

                {sessions.map((session) => (
                  <div className="setting-session-row" key={session.id}>
                    <div className="setting-session-device">
                      <i className={
                          session.device.includes("iPhone")
                            ? "fa-solid fa-mobile-screen"
                            : "fa-solid fa-desktop"} ></i>
                      <div>
                        <h3>{session.device}</h3>
                      </div>
                    </div>

                    <div className="setting-session-actions">
                      <span className="setting-session-location">
                        {session.location}
                      </span>

                      {session.active && (
                        <span className="setting-badge success">
                          ACTIVE
                        </span>
                      )}
                      <button
                        type="button"
                        className="setting-text-button"
                        onClick={() => { window.scrollTo({
                          top: 0,
                          baehavior: "smooth",
                        });
                        }}>
                        See more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DELETE ACCOUNT */}
            <section className="setting-card setting-delete-card"
              id="delete-account">
              <div className="setting-section-heading">
                <div>
                  <h2>Delete Account</h2>
                  <p>
                    Once you delete your account, there is no going back.
                    Please be certain.
                  </p>
                </div>
              </div>

              <div className="setting-delete-confirmation">
                <label className="setting-visibility">
                  <input
                    type="checkbox"
                    checked={deleteConfirmed}
                    onChange={(event) =>
                      setDeleteConfirmed(event.target.checked)}/>

                  <span className="setting-switch"></span>

                  <span>
                    <strong>Confirm</strong><br></br>
                    <small>I want to delete my account.</small>
                  </span>
                </label>

                <div className="setting-delete-actions">
                  <button
                    type="button"
                    className="setting-cancel-button"
                    onClick={() => {
                      setAccountDeactivated((previous) => !previous);
                      alert(
                        accountDeactivated
                          ? "Demo: account deactivation cancelled."
                          : "Demo only: connect account deactivation to your backend.");
                    }}>
                    {accountDeactivated ? "ACTIVATE" : "DEACTIVATE"}
                  </button>

                  <button
                    type="button"
                    className="setting-delete-button"
                    onClick={handleDeleteAccount}>
                    DELETE ACCOUNT
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="setting-footer">
          <p>© 2026 MyPatientHUB. All rights reserved.</p>

          <div>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#help">Help Center</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Setting;