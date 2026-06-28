import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthBackground() {
  return (
    <div className="auth-background" aria-hidden="true">
      <span className="auth-orb auth-orb-purple" />
      <span className="auth-orb auth-orb-blue" />
      <span className="auth-orb auth-orb-cyan" />
    </div>
  );
}

function AuthLogo() {
  return (
    <div className="auth-logo">
      <div className="auth-logo-mark">AI</div>
      <span>AITutor</span>
    </div>
  );
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 900);
  };

  return (
    <div className="auth-page">
      <AuthBackground />

      <div className="auth-shell">
        <header className="auth-top">
          <AuthLogo />
          <Link to="/" className="auth-link">
            Back to Home
          </Link>
        </header>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Create an account</h1>
            <p>Sign up and start learning with your AI tutor.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Full name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="auth-input"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="auth-input"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                className="auth-input"
                required
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                className="auth-input"
                required
              />
            </label>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-ghost">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
