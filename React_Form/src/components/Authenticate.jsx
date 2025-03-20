import { useState } from "react";

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Authentication failed");
      }

      setSuccessMessage(result.message);
      setUsername(result.data.username);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
      setUsername(null);
    }
  }

  return (
    <div className="authenticate-container">
      <h2>Authenticate!</h2>
      {error && <p className="error">{error}</p>}{" "}
      {successMessage && <p className="success">{successMessage}</p>}{" "}
      {username && <h3>Welcome, {username}!</h3>}
      <button onClick={handleClick} className="auth-button">
        Authenticate Token
      </button>
    </div>
  );
}
