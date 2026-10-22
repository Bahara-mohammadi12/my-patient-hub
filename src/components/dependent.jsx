import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dependent.css";

const emptyDependent = {
  firstName: "",
  lastName: "",
  birthDate: "",
  relation: "",
  gender: "",
  bloodType: "",
  height: "",
  weight: "",
  allergies: "",
  medicalCondition: "",
  medication: "",
  plan: "",
};

const carePlans = [
  {
    id: "basic",
    title: "Basic Care",
    description: "Essential health monitoring and basic care.",
  },
  {
    id: "standard",
    title: "Standard Care",
    description: "Regular health monitoring and additional support.",
  },
  {
    id: "premium",
    title: "Premium Care",
    description: "Comprehensive health monitoring and family care.",
  },
];

function Dependent({ isClosed, setIsClosed }) {
  const [step, setStep] = useState(1);
  const [dependent, setDependent] = useState({ ...emptyDependent });
  const [dependents, setDependents] = useState(() => {
    try {
      const saved = localStorage.getItem("mphDependents");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("mphDependents", JSON.stringify(dependents));
  }, [dependents]);

  const updateDependent = (event) => {
    const { name, value } = event.target;

    setDependent((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
  };

  const showError = (field) => {
    if (!errors[field]) return null;

    return (
      <small className="field-error" role="alert">
        {errors[field]}
      </small>
    );
  };

  // Validate page 1: Basic Information
  const validateStep1 = () => {
    const newErrors = {};

    if (!dependent.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!dependent.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!dependent.birthDate) {
      newErrors.birthDate = "Date of birth is required.";
    } else {
      const birthDate = new Date(
        `${dependent.birthDate}T00:00:00`
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (Number.isNaN(birthDate.getTime())) {
        newErrors.birthDate = "Please enter a valid date.";
      } else if (birthDate > today) {
        newErrors.birthDate = "Date of birth cannot be in the future.";
      }
    }

    if (!dependent.relation) {
      newErrors.relation = "Please select a relationship.";
    }

    if (!dependent.gender) {
      newErrors.gender = "Please select a gender.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate page 2: Health Record
  const validateStep2 = () => {
    const newErrors = {};

    if (!dependent.bloodType) {
      newErrors.bloodType = "Please select a blood type.";
    }

    if (!dependent.height.trim()) {
      newErrors.height = "Height is required.";
    } else {
      const height = Number(dependent.height);

      if (
        !Number.isFinite(height) ||
        height <= 0 ||
        height > 300
      ) {
        newErrors.height =
          "Enter a valid height between 1 and 300 cm.";
      }
    }

    if (!dependent.weight.trim()) {
      newErrors.weight = "Weight is required.";
    } else {
      const weight = Number(dependent.weight);

      if (
        !Number.isFinite(weight) ||
        weight <= 0 ||
        weight > 700
      ) {
        newErrors.weight =
          "Enter a valid weight between 1 and 700 kg.";
      }
    }

    if (!dependent.allergies.trim()) {
      newErrors.allergies =
        "Enter allergies or type None if there are none.";
    }

    if (!dependent.medicalCondition.trim()) {
      newErrors.medicalCondition =
        "Enter a medical condition or type None.";
    }

    if (!dependent.medication.trim()) {
      newErrors.medication =
        "Enter medication or type None if there is none.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setMessage("");

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        setErrors({});
      }
      return;
    }

    if (step === 2) {
      if (validateStep2()) {
        setStep(3);
        setErrors({});
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setMessage("");
    setStep((previous) => Math.max(1, previous - 1));
  };

  const handlePlanSelect = (planId) => {
    setDependent((previous) => ({
      ...previous,
      plan: planId,
    }));

    setErrors((previous) => ({
      ...previous,
      plan: "",
    }));

    setMessage("");
  };

  const handleSend = () => {
    if (!dependent.plan) {
      setErrors({ plan: "Please select a care plan." });
      return;
    }

    const newDependent = {
      ...dependent,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    setDependents((previous) => [...previous, newDependent]);
    setDependent({ ...emptyDependent });
    setErrors({});
    setStep(1);
    setMessage("Dependent registered successfully!");
  };

  const filteredDependents = dependents.filter((item) => {
    const fullName =
      `${item.firstName} ${item.lastName}`.toLowerCase();

    return fullName.includes(search.trim().toLowerCase());
  });

  const selectedPlan = carePlans.find(
    (plan) => plan.id === dependent.plan
  );

  return (
    <div
      className={`dependent-page ${
        isClosed ? "sidebar-closed" : ""
      }`}
    >
      <header className="dependent-header">
        <div className="dependent-header-left">
          <button
            type="button"
            className="menuBtn"
            onClick={() => setIsClosed((previous) => !previous)}
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-bars" />
          </button>

          <div>
            <h1>My Dependents</h1>
            <p>Manage your family members and their health records.</p>
          </div>
        </div>

        <div className="dependent-header-actions">
          <button
            type="button"
            className="notification-btn"
            aria-label="Notifications"
            onClick={() =>
              setMessage("You are all caught up on notifications.")
            }
          >
            <i className="fa-regular fa-bell" />
          </button>

          <Link to="/setting" className="dependent-profile-link">
            <i className="fa-regular fa-user" />
            <span>My Profile</span>
          </Link>
        </div>
      </header>

      <main className="dependent-content">
        {message && (
          <p className="dependent-message" role="status">
            {message}
          </p>
        )}

        <section className="dependent-form-section">
          <div className="dependent-section-heading">
            <div>
              <h2>Register a Dependent</h2>
              <p>Complete all three steps to register a family member.</p>
            </div>

            <span className="dependent-step-count">
              Step {step} of 3
            </span>
          </div>

          <div className="dependent-progress">
            <div
              className={`progress-step ${step >= 1 ? "active" : ""}`}
            >
              <span>1</span>
              <p>Basic Information</p>
            </div>

            <div
              className={`progress-line ${step >= 2 ? "active" : ""}`}
            />

            <div
              className={`progress-step ${step >= 2 ? "active" : ""}`}
            >
              <span>2</span>
              <p>Health Record</p>
            </div>

            <div
              className={`progress-line ${step >= 3 ? "active" : ""}`}
            />

            <div
              className={`progress-step ${step >= 3 ? "active" : ""}`}
            >
              <span>3</span>
              <p>Care Plan</p>
            </div>
          </div>

          {step === 1 && (
            <div className="dependent-step-content">
              <h3>Basic Information</h3>

              <div className="dependent-form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={dependent.firstName}
                    onChange={updateDependent}
                    placeholder="Enter first name"
                    aria-invalid={!!errors.firstName}
                  />
                  {showError("firstName")}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={dependent.lastName}
                    onChange={updateDependent}
                    placeholder="Enter last name"
                    aria-invalid={!!errors.lastName}
                  />
                  {showError("lastName")}
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Date of Birth *</label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={dependent.birthDate}
                    onChange={updateDependent}
                    aria-invalid={!!errors.birthDate}
                  />
                  {showError("birthDate")}
                </div>

                <div className="form-group">
                  <label htmlFor="relation">Relationship *</label>
                  <select
                    id="relation"
                    name="relation"
                    value={dependent.relation}
                    onChange={updateDependent}
                    aria-invalid={!!errors.relation}
                  >
                    <option value="">Select relationship</option>
                    <option value="Child">Child</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                  {showError("relation")}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={dependent.gender}
                    onChange={updateDependent}
                    aria-invalid={!!errors.gender}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                  {showError("gender")}
                </div>
              </div>

              <div className="dependent-form-actions">
                <button
                  type="button"
                  className="dependent-next-btn"
                  onClick={handleNext}
                >
                  Next <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="dependent-step-content">
              <h3>Health Record</h3>

              <div className="dependent-form-grid">
                <div className="form-group">
                  <label htmlFor="bloodType">Blood Type *</label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={dependent.bloodType}
                    onChange={updateDependent}
                    aria-invalid={!!errors.bloodType}
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                  {showError("bloodType")}
                </div>

                <div className="form-group">
                  <label htmlFor="height">Height (cm) *</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    min="1"
                    max="300"
                    value={dependent.height}
                    onChange={updateDependent}
                    placeholder="e.g. 165"
                    aria-invalid={!!errors.height}
                  />
                  {showError("height")}
                </div>

                <div className="form-group">
                  <label htmlFor="weight">Weight (kg) *</label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="1"
                    max="700"
                    value={dependent.weight}
                    onChange={updateDependent}
                    placeholder="e.g. 60"
                    aria-invalid={!!errors.weight}
                  />
                  {showError("weight")}
                </div>

                <div className="form-group">
                  <label htmlFor="allergies">
                    Allergies * (type None if there are none)
                  </label>
                  <input
                    id="allergies"
                    name="allergies"
                    type="text"
                    value={dependent.allergies}
                    onChange={updateDependent}
                    placeholder="e.g. Dust allergy or None"
                    aria-invalid={!!errors.allergies}
                  />
                  {showError("allergies")}
                </div>

                <div className="form-group">
                  <label htmlFor="medicalCondition">
                    Medical Conditions * (type None if there are none)
                  </label>
                  <textarea
                    id="medicalCondition"
                    name="medicalCondition"
                    value={dependent.medicalCondition}
                    onChange={updateDependent}
                    placeholder="Enter medical conditions or None"
                    rows="3"
                    aria-invalid={!!errors.medicalCondition}
                  />
                  {showError("medicalCondition")}
                </div>

                <div className="form-group">
                  <label htmlFor="medication">
                    Current Medication * (type None if there is none)
                  </label>
                  <textarea
                    id="medication"
                    name="medication"
                    value={dependent.medication}
                    onChange={updateDependent}
                    placeholder="Enter current medication or None"
                    rows="3"
                    aria-invalid={!!errors.medication}
                  />
                  {showError("medication")}
                </div>
              </div>

              <div className="dependent-form-actions">
                <button
                  type="button"
                  className="dependent-back-btn"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left" /> Back
                </button>

                <button
                  type="button"
                  className="dependent-next-btn"
                  onClick={handleNext}
                >
                  Next <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="dependent-step-content">
              <h3>Select a Care Plan</h3>
              <p>Choose a care plan for this dependent.</p>

              <div className="dependent-plans">
                {carePlans.map((plan) => (
                  <button
                    type="button"
                    key={plan.id}
                    className={`plan-card ${
                      dependent.plan === plan.id ? "selected" : ""
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                    aria-pressed={dependent.plan === plan.id}
                  >
                    <span className="plan-radio">
                      {dependent.plan === plan.id && (
                        <i className="fa-solid fa-check" />
                      )}
                    </span>

                    <h4>{plan.title}</h4>
                    <p>{plan.description}</p>
                  </button>
                ))}
              </div>

              {showError("plan")}

              {selectedPlan && (
                <p className="selected-plan-message">
                  Selected plan: <strong>{selectedPlan.title}</strong>
                </p>
              )}

              <div className="dependent-form-actions">
                <button
                  type="button"
                  className="dependent-back-btn"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left" /> Back
                </button>

                <button
                  type="button"
                  className="dependent-next-btn"
                  onClick={handleSend}
                >
                  Register Dependent
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="dependent-list-section">
          <div className="dependent-section-heading">
            <div>
              <h2>Registered Dependents</h2>
              <p>View your saved family members.</p>
            </div>

            <span className="dependent-total">
              {dependents.length} registered
            </span>
          </div>

          <div className="dependent-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by dependent name..."
              aria-label="Search dependents"
            />
          </div>

          {filteredDependents.length === 0 ? (
            <p className="dependent-empty">
              {search.trim()
                ? "No dependents match your search."
                : "No dependents registered yet."}
            </p>
          ) : (
            <div className="dependent-list">
              {filteredDependents.map((item) => {
                const plan = carePlans.find(
                  (carePlan) => carePlan.id === item.plan
                );

                return (
                  <article
                    className="dependent-card"
                    key={item.id}
                  >
                    <div className="dependent-avatar">
                      <i className="fa-solid fa-user" />
                    </div>

                    <div className="dependent-card-info">
                      <h3>
                        {item.firstName} {item.lastName}
                      </h3>
                      <p>Relationship: {item.relation}</p>
                      <p>Date of birth: {item.birthDate}</p>
                      <p>Blood type: {item.bloodType}</p>
                      <p>Care plan: {plan?.title || "Not selected"}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dependent;