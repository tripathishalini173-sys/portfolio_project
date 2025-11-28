import { useState } from "react";

function Settings() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the updated settings to your backend
    alert("Settings saved!");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Username:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        {/* Notifications */}
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={(e) => setNotifications(e.target.checked)} 
              style={{ marginRight: "0.5rem" }}
            />
            Enable notifications
          </label>
        </div>

        <button type="submit" style={{
          padding: "0.5rem 1rem",
          background: "#343a40",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
