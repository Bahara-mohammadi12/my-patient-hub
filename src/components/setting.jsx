import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp.js";
import "./setting.css";

function Setting({ isClosed, setIsClosed }) {
  const { user, setUser, signOut } = useApp();
  const navigate = useNavigate();

  const makeForm = (currentUser) => ({
    firstName: currentUser?.fullName?.split(" ")[0] || "",
    lastName: currentUser?.fullName?.split(" ").slice(1).join(" ") || "",
    gender: currentUser?.gender || "",
    birthDate: currentUser?.birthDate || "",
    email: currentUser?.email || "",
    bloodGroup: currentUser?.bloodGroup || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "Kabul, Afghanistan",
  });

  const [form, setForm] = useState(() => makeForm(user));
  const [savedForm, setSavedForm] = useState(() => makeForm(user));

  const [profileVisible, setProfileVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("basic-info");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [securityKey, setSecurityKey] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("008737859384");
  const [authenticatorConfigured, setAuthenticatorConfigured] =
    useState(false);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Bucharest 68.133.163.201",
      location: "EU",
      active: true,
      details: "Current browser session",
    },
    {
      id: 2,
      device: "Chrome on macOS",
      location: "US",
      active: false,
      details: "Previously signed-in browser",
    },
    {
      id: 3,
      device: "Safari on iPhone",
      location: "US",
      active: false,
      details: "Previously signed-in mobile device",
    },
  ]);

  const [expandedSessions, setExpandedSessions] = useState([]);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [accountDeactivated, setAccountDeactivated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setProfileMessage("");
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

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setProfileMessage("Please enter both your first and last name.");
      return;
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      setProfileMessage("Please enter a valid email address.");
      return;
    }

    if (form.birthDate) {
      const birthDate = new Date(`${form.birthDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (Number.isNaN(birthDate.getTime()) || birthDate > today) {
        setProfileMessage("Please enter a valid date of birth.");
        return;
      }
    }

    const updatedUser = {
      ...(user || {}),
      fullName: `${form.firstName.trim()} ${form.lastName.trim()}`,
      gender: form.gender,
      birthDate: form.birthDate,
      email: form.email.trim(),
      bloodGroup: form.bloodGroup,
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    setUser(updatedUser);
    setSavedForm({ ...form });
    setProfileMessage("Your profile information has been saved.");
  };

  const handleReset = () => {
    setForm({ ...savedForm });
    setProfileMessage("Form restored to the last saved information.");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!passwords.currentPassword.trim()) {
      setPasswordMessage("Please enter your current password.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordMessage(
        "Your new password must contain at least 6 characters."
      );
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPassword)) {
      setPasswordMessage(
        "Please include at least one special character."
      );
      return;
    }

    if (!/\d/.test(passwords.newPassword)) {
      setPasswordMessage("Please include at least one number.");
      return;
    }

    if (passwords.newPassword === passwords.currentPassword) {
      setPasswordMessage(
        "Your new password must differ from your current password."
      );
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage("The new passwords do not match.");
      return;
    }

    setPasswordMessage(
      "Password form validated. A secure backend is required to verify and update your real password."
    );

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Toggle profile visibility and mask/unmask the profile name.
  const handleVisibilityChange = () => {
    setProfileVisible((previous) => {
      const nextValue = !previous;

      setProfileMessage(
        nextValue
          ? "Your profile name and photo are visible."
          : "Your profile photo is replaced by an avatar and your name is masked."
      );

      return nextValue;
    });
  };

  const handleTwoFactor = () => {
    setTwoFactorEnabled((previous) => !previous);
    setSecurityMessage(
      twoFactorEnabled
        ? "Two-factor authentication is shown as disabled."
        : "Two-factor authentication is shown as enabled."
    );
  };

  const handleSecurityKey = () => {
    const value = window.prompt(
      "Enter a security key name. Leave empty to clear it:",
      securityKey
    );

    if (value === null) return;

    setSecurityKey(value.trim());
    setSecurityMessage(
      value.trim()
        ? "Security key information updated in this interface."
        : "Security key information cleared."
    );
  };

  const handlePhoneEdit = () => {
    const value = window.prompt(
      "Enter your SMS phone number:",
      phoneNumber
    );

    if (value === null) return;

    if (!value.trim()) {
      setSecurityMessage("Phone number cannot be empty.");
      return;
    }

    setPhoneNumber(value.trim());
    setSecurityMessage("SMS phone number updated in this interface.");
  };

  const handleAuthenticator = () => {
    setAuthenticatorConfigured((previous) => !previous);

    setSecurityMessage(
      authenticatorConfigured
        ? "Authenticator marked as not configured."
        : "Authenticator marked as configured in this interface."
    );
  };

  const handleSessionDetails = (sessionId) => {
    setExpandedSessions((previous) =>
      previous.includes(sessionId)
        ? previous.filter((id) => id !== sessionId)
        : [...previous, sessionId]
    );
  };

  const handleEndSession = (sessionId) => {
    const session = sessions.find((item) => item.id === sessionId);

    if (!session) return;

    if (
      session.active &&
      !window.confirm(
        "This is the current session. Ending it will log you out. Continue?"
      )
    ) {
      return;
    }

    if (session.active) {
      signOut();
      navigate("/login", { replace: true });
      return;
    }

    setSessions((previous) =>
      previous.filter((item) => item.id !== sessionId)
    );

    setSecurityMessage("The selected demo session has been removed.");
  };

  const handleDeactivate = () => {
    const nextState = !accountDeactivated;

    if (
      nextState &&
      !window.confirm(
        "Deactivate this account in this demo interface? This does not deactivate a server account."
      )
    ) {
      return;
    }

    setAccountDeactivated(nextState);

    setSecurityMessage(
      nextState
        ? "Account marked as deactivated in this interface."
        : "Account marked as active in this interface."
    );
  };

  // Delete the current user from app state and return to Login.
  const handleDeleteAccount = () => {
    if (!deleteConfirmed) {
      window.alert("Please check the confirmation box first.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    setUser(null);
    signOut();
    navigate("/login", { replace: true });
  };

  const navigateTo = (section) => {
    setActiveSection(section);

    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const filteredSessions = sessions.filter((session) =>
    `${session.device} ${session.location}`
      .toLowerCase()
      .includes(headerSearch.trim().toLowerCase())
  );

  return (
    <main
      className={`setting-page ${
        isClosed ? "setting-sidebar-closed" : ""
      }`}
    >
      
       
          

      <div className="setting-content">
        <div className="setting-layout">
          {/* SETTINGS MENU */}
          <aside className="setting-navigation">
            {[
              ["profile", "fa-user", "Profile"],
              ["basic-info", "fa-id-card", "Basic Info"],
              ["password", "fa-lock", "Change Password"],
              ["two-factor", "fa-shield-halved", "2FA"],
              ["sessions", "fa-sliders", "Sessions"],
              ["delete-account", "fa-trash", "Delete Account"],
            ].map(([id, icon, label]) => (
              <button
                type="button"
                key={id}
                className={`setting-nav-link ${
                  activeSection === id ? "active" : ""
                }`}
                onClick={() => navigateTo(id)}
              >
                <i className={`fa-solid ${icon}`}></i>
                <span>{label}</span>
              </button>
            ))}
          </aside>

          <div className="setting-sections">
            {/* PROFILE */}
            <section
              className="setting-card setting-profile-card"
              id="profile"
            >
              <div className="setting-profile-user">
                {profileVisible ? (
                  <img
                    src="https://placehold.co/100x100/e9e5ff/6554c0?text=AS"
                    alt="Patient profile"
                    className="setting-profile-image"
                  />
                ) : (
                  <div
                    className="setting-avatar-placeholder"
                    aria-label="Anonymous profile avatar"
                    role="img"
                  >
                    <i className="fa-solid fa-user"></i>
                  </div>
                )}

                <div>
                  <h2>
                    {profileVisible
                      ? `${form.firstName || "Patient"} ${form.lastName}`.trim()
                      : "••••••••••"}
                  </h2>

                  <p>Patient</p>

                  <small>
                    {profileVisible
                      ? "Profile visible"
                      : "Profile invisible"}
                  </small>
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
                  onChange={handleVisibilityChange}
                  aria-label="Switch profile visibility"
                />

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
                      required
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
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
                      onChange={handleChange}
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="bloodGroup">Blood Group:</label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}
                    >
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
                      placeholder="+93 XXX XXX XXX"
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="address">Address:</label>
                    <input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Your address"
                    />
                  </div>
                </div>

                {profileMessage && (
                  <p className="setting-message" role="status">
                    {profileMessage}
                  </p>
                )}

                <div className="setting-form-actions">
                  <button
                    type="button"
                    className="setting-cancel-button"
                    onClick={handleReset}
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="setting-primary-button"
                  >
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
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Current Password"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <div className="setting-password-requirements">
                  <h3>Password requirements</h3>
                  <p>Please follow this guide for a strong password.</p>

                  <ul>
                    <li className={passwords.newPassword.length >= 6 ? "passed" : ""}>
                      At least 6 characters
                    </li>
                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPassword) ? "passed" : ""}>
                      One special character
                    </li>
                    <li className={/\d/.test(passwords.newPassword) ? "passed" : ""}>
                      One number
                    </li>
                  </ul>
                </div>

                {passwordMessage && (
                  <p className="setting-message" role="status">
                    {passwordMessage}
                  </p>
                )}

                <div className="setting-form-actions">
                  <button type="submit" className="setting-primary-button">
                    UPDATE PASSWORD
                  </button>
                </div>
              </form>
            </section>

            {/* TWO-FACTOR AUTHENTICATION */}
            <section className="setting-card" id="two-factor">
              <div className="setting-section-heading">
                <div>
                  <h2>Two-Factor Authentication</h2>
                </div>

                <span className={`setting-badge ${twoFactorEnabled ? "success" : "neutral"}`}>
                  {twoFactorEnabled ? "ENABLED" : "DISABLED"}
                </span>
              </div>

              <div className="setting-security-row">
                <div className="setting-security-info">
                  <div>
                    <h3>Security keys</h3>
                    <p>{securityKey || "No Security Key"}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="setting-outline-button"
                  onClick={handleSecurityKey}
                >
                  {securityKey ? "EDIT" : "ADD"}
                </button>
              </div>

              <div className="setting-security-row">
                <div className="setting-security-info">
                  <div>
                    <h3>SMS number</h3>
                    <p>{phoneNumber}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="setting-outline-button"
                  onClick={handlePhoneEdit}
                >
                  EDIT
                </button>
              </div>

              <div className="setting-security-row">
                <div className="setting-security-info">
                  <div>
                    <h3>Authenticator app</h3>
                    <p>
                      {authenticatorConfigured
                        ? "Configured in this interface"
                        : "Not Configured"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="setting-outline-button"
                  onClick={handleAuthenticator}
                >
                  {authenticatorConfigured ? "REMOVE" : "SET UP"}
                </button>
              </div>

              <div className="setting-form-actions">
                <button
                  type="button"
                  className="setting-primary-button"
                  onClick={handleTwoFactor}
                >
                  {twoFactorEnabled ? "DISABLE 2FA" : "ENABLE 2FA"}
                </button>
              </div>

              {securityMessage && (
                <p className="setting-message" role="status">
                  {securityMessage}
                </p>
              )}
            </section>

            {/* SESSIONS */}
            <section className="setting-card" id="sessions">
              <div className="setting-section-heading">
                <div>
                  <h2>Sessions</h2>
                  <p>
                    View your demo sessions and remove sessions you no longer
                    need.
                  </p>
                </div>
              </div>

              <div className="setting-session-list">
                {filteredSessions.length === 0 && (
                  <p>No matching sessions found.</p>
                )}

                {filteredSessions.map((session) => (
                  <div className="setting-session-row" key={session.id}>
                    <div className="setting-session-device">
                      <i
                        className={
                          session.device.includes("iPhone")
                            ? "fa-solid fa-mobile-screen"
                            : "fa-solid fa-desktop"
                        }
                      ></i>

                      <div>
                        <h3>{session.device}</h3>
                        {expandedSessions.includes(session.id) && (
                          <p>{session.details}</p>
                        )}
                      </div>
                    </div>

                    <div className="setting-session-actions">
                      <span className="setting-session-location">
                        {session.location}
                      </span>

                      {session.active && (
                        <span className="setting-badge success">ACTIVE</span>
                      )}

                      <button
                        type="button"
                        className="setting-text-button"
                        onClick={() => handleSessionDetails(session.id)}
                      >
                        {expandedSessions.includes(session.id)
                          ? "Hide details"
                          : "See more"}
                      </button>

                      <button
                        type="button"
                        className="setting-text-button"
                        onClick={() => handleEndSession(session.id)}
                      >
                        End session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DELETE ACCOUNT */}
            <section
              className="setting-card setting-delete-card"
              id="delete-account"
            >
              <div className="setting-section-heading">
                <div>
                  <h2>Delete Account</h2>
                  <p>
                    This demo clears the current app user and signs you out.
                    Permanent server-side deletion requires a backend.
                  </p>
                </div>
              </div>

              <div className="setting-delete-confirmation">
                <label className="setting-visibility">
                  <input
                    type="checkbox"
                    checked={deleteConfirmed}
                    onChange={(event) =>
                      setDeleteConfirmed(event.target.checked)
                    }
                  />

                  <span className="setting-switch"></span>

                  <span>
                    <strong>Confirm</strong>
                    <br />
                    <small>I understand and want to continue.</small>
                  </span>
                </label>

                <div className="setting-delete-actions">
                  <button
                    type="button"
                    className="setting-cancel-button"
                    onClick={handleDeactivate}
                  >
                    {accountDeactivated ? "ACTIVATE" : "DEACTIVATE"}
                  </button>

                  <button
                    type="button"
                    className="setting-delete-button"
                    onClick={handleDeleteAccount}
                  >
                    DELETE ACCOUNT
                  </button>
                </div>

                {accountDeactivated && (
                  <p className="setting-message" role="status">
                    Account is marked as deactivated in this interface.
                  </p>
                )}

                {securityMessage && (
                  <p className="setting-message" role="status">
                    {securityMessage}
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>

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