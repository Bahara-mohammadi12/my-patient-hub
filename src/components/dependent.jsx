import { useEffect, useState } from "react";

function Dependent({ isClosed, setIsClosed }) {

    const [search, setSearch] = useState("");
    const [step, setStep] = useState(1);

    const [dependent, setDependent] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    relation: "",
    gender: "Male",
    bloodType: "",
    height: "",
    weight: "",
    allergies: "",
    medicalCondition: "",
    medication: "",
    plan: ""
    });


    const [dependents, setDependents] = useState(() => { try { return JSON.parse(localStorage.getItem("mphDependents") || "[]"); } catch { return []; } });

    useEffect(() => { localStorage.setItem("mphDependents", JSON.stringify(dependents)); }, [dependents]);

    const [message, setMessage] = useState("");

    const updateDependent = (e) => {
    const { name, value } = e.target;

    setDependent((prev) => ({
        ...prev,
        [name]: value
    }));
    };

    const handleNext = () => {
    setMessage("");

    if (step === 1) {
        if (
            !dependent.firstName.trim() ||
            !dependent.lastName.trim() ||
            !dependent.birthDate ||
            !dependent.relation.trim()
        ) {
            setMessage("Please fill in all required fields.");
            return;
        }
    }

    if (step === 2) {
        if (!dependent.bloodType) {
            setMessage("Please select a blood type.");
            return;
        }
    }

    setStep((prev) => Math.min(prev + 1, 3));
    };

    const handleSend = () => {
    if (!dependent.plan) {
        setMessage("Please select a care plan.");
        return;
    }

    setDependents((prev) => [...prev, dependent]);
    setMessage("Dependent registered successfully!");
    }; 

    return (
        <section className={`dependent-page ${isClosed ? "sidebar-closed" : ""}`}>

            {/* ================= HEADER ================= */}
            <div className="dependent-header">

                <div className="dependent-tittle">
                    <div className="bread">
                        <a href="/">
                            <i className="fa-solid fa-house"></i>
                        </a>

                        <span>/</span>

                        <span>My Dependents</span>
                    </div>

                    <h3>MyDependents</h3>
                </div>


                {/* Menu Button */}
                <button
                    id="menuBtn"
                    className="menu-btn"
                    onClick={() => setIsClosed(!isClosed)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>


                {/* Header Right */}
                <div className="dependent-header-right">

                    <div className="dependent-search">

                        <i className="fa-solid fa-magnifying-glass"></i>

                        <input
                            type="text"
                            placeholder="type here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <span className="logout">
                        <i className="fa-solid fa-circle-user"></i>
                        Logout
                    </span>

                    <button className="dependent-icon">
                        <i className="fa-solid fa-bell"></i>
                    </button>

                </div>

            </div>
            {search.trim() && (
            <div className="dependent-search-results">
                {dependents.filter((item) =>
                `${item.firstName} ${item.lastName}`
                .toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                dependents.filter((item) => `${item.firstName} ${item.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase()))
                    .map((item, index) => (
                        <p key={index}>
                            {item.firstName} {item.lastName}
                            {" — "}
                            {item.relation}
                        </p>
                    ))) : (
                    <p>No dependents found.</p>)}
            </div>
            )}

            {/* ================= MAIN ================= */}

            <div className="dependent-main">
                <h1>Build Your Profile</h1>
                <h3>This information will let us know more about your family</h3>

                {/* Progress */}
                <div className="dependent-progress">

                    <div className={`progress-point ${step >= 1 ? "active" : ""}`}>
                        <span></span>
                    </div>

                    <div className={`progress-line ${step >= 2 ? "active" : ""}`}></div>

                    <div className={`progress-point ${step >= 2 ? "active" : ""}`}>
                        <span></span>
                    </div>

                    <div className={`progress-line ${step >= 3 ? "active" : ""}`}></div>

                    <div className={`progress-point ${step >= 3 ? "active" : ""}`}>
                        <span></span>
                    </div>

                </div>
                {message && (<p role="status">{message}</p>)}

                {/* ================= STEP 1 ================= */}

                {step === 1 && (

                    <div className="dependent-content">

                        <div className="dependent-form">

                            <h2>Dependents Registration</h2>

                            <h1>Let's start with the basic information</h1>

                            <p>
                                Let us know with name and last name. Contacting you at
                            </p>


                            <div className="form-grid">

                                <div className="form-group">
                                    <label>First Name</label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Eg. Michael"
                                        value={dependent.firstName}
                                        onChange={updateDependent}
                                    />
                                </div>


                                <div className="form-group">
                                    <label>Last Name</label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Eg. Tomson"
                                        value={dependent.lastName}
                                        onChange={updateDependent}

                                    />
                                </div>


                                <div className="form-group">
                                    <label>Birth Date</label>

                                    <div className="birth-date">

                                       <input type="date"
                                       name="birthDate"
                                       placeholder="Birth date"
                                       value={dependent.birthDate}
                                       onChange={updateDependent} />

                                    </div>

                                </div>


                                <div className="form-group">
                                    <label>Relation</label>

                                    <input
                                        type="text"
                                        name="relation"
                                        placeholder="Eg. Brother, Child"
                                        value={dependent.relation}
                                        onChange={updateDependent} />
                                </div>


                                <div className="form-group">
                                    <label>I'm</label>

                                    <select>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>

                            </div>


                            <button
                                className="dependent-next-btn"
                                onClick={handleNext}>
                                NEXT
                            </button>

                        </div>

                    </div>
                )}
                

                {/* ================= STEP 2 ================= */}

                {step === 2 && (

                    <div className="dependent-content">

                        <div className="dependent-form">

                            <h2>Dependents Health Record</h2>


                            <div className="health-grid">

                                <div className="form-group">
                                    <label>Blood Type</label>

                                    <select
                                    name="bloodType"
                                    value={dependent.bloodType}
                                    onChange={updateDependent}>
                                        <option>Select blood type</option>
                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                        <option>O+</option>
                                        <option>O-</option>
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label>Height</label>

                                    <input
                                        type="text"
                                        name="height"
                                        placeholder="Eg. 170 cm"
                                        value={dependent.height}
                                        onChange={updateDependent} />
                                </div>


                                <div className="form-group">
                                    <label>Weight</label>

                                    <input
                                        type="text"
                                        name="weight"
                                        placeholder="Eg. 65 kg"
                                        value={dependent.weight}
                                        onChange={updateDependent}/>
                                </div>


                                <div className="form-group">
                                    <label>Allergies</label>

                                    <input
                                        type="text"
                                        name="allergies"
                                        placeholder="Eg. Peanuts"
                                        value={dependent.allergies}
                                        onChange={updateDependent}/>
                                </div>


                                <div className="form-group">
                                    <label>Medical Condition</label>

                                    <input
                                        type="text"
                                        name="madicalCondition"
                                        placeholder="Eg. Asthma"
                                        value={dependent.medicalCondition}
                                        onChange={updateDependent}/>
                                </div>


                                <div className="form-group">
                                    <label>Medication</label>

                                    <input
                                        type="text"
                                        name="medication"
                                        placeholder="Eg. None"
                                        value={dependent.medication}
                                        onChange={updateDependent}/>
                                </div>

                            </div>


                            <div className="dependent-buttons">

                                <button
                                    className="dependent-back-btn"
                                    onClick={() => setStep(1)}>
                                    BACK
                                </button>

                                <button
                                    className="dependent-next-btn"
                                    onClick={handleNext}>
                                    NEXT
                                </button>

                            </div>

                        </div>

                    </div>
                )}


                {/* ================= STEP 3 ================= */}

                {step === 3 && (

                    <div className="care-plan">

                        <h2>Family Care Plan</h2>

                        <p>Select the plan that works best for your family.</p>


                        <div className="plan-container">

                            {/* Standard */}
                            <div className="plan-card">

                                <h3>Standard Plan</h3>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail<br></br> One
                                </p>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail<br></br> Two
                                </p>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail <br></br>Three
                                </p>

                            </div>


                            {/* Premium */}
                            <div className="plan-card">

                                <h3>Premium Plan</h3>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail <br></br>One
                                </p>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail<br></br> Two
                                </p>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail <br></br>Three
                                </p>

                            </div>


                            {/* Super */}
                            <div className="plan-card">

                                <h3>Super Plan</h3>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail<br></br> One
                                </p>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail<br></br> Two
                                </p>

                                <p>
                                    <i className="fa-solid fa-check"></i>
                                    Detail <br></br>Three
                                </p>

                            </div>

                        </div>


                        <div className="dependent-buttons">

                            <button
                                className="dependent-back-btn"
                                onClick={() => setStep(2)}
                            >
                                BACK
                            </button>

                            <button 
                            className="dependent-next-btn"
                            onClick={handleSend}>
                                SEND
                            </button>

                        </div>

                    </div>
                )}

            </div>

        </section>
    );
}

export default Dependent;