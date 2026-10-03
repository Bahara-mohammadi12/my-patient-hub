import { useState } from "react";
function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    alert("Sign in form submitted!");
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Sign up form submitted!");
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h1>Welcome to My Patient HUB!</h1>
        <p>We provide smart healthcare services in your hands</p>

        {isSignUp ? (
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />

            <button type="submit">Sign up</button>
          </form>
        ) : (
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <button type="submit">Sign in</button>
          </form>
        )}

        {isSignUp ? (
          <p className="login-switch">
            Already have an account?{" "}
            <span onClick={() => setIsSignUp(false)}>
              Sign in
            </span>
          </p>
        ) : (
          <p className="login-switch">
            Do not have an account?{" "}
            <span onClick={() => setIsSignUp(true)}>
              Create Account
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;