import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session (example using localStorage)
    localStorage.removeItem("authToken"); // or any user data
    localStorage.removeItem("user");      // optional

    // Redirect to login page after logout
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
