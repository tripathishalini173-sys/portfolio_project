import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileMenu = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with actual logged-in user ID or endpoint
        const res = await axios.get("http://localhost:5000/api/users/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!user) return <p style={{ textAlign: "center" }}>User not found</p>;

  return (
    <div style={container}>
      <div style={profileBox}>
        <img
          src={user.avatar || "https://via.placeholder.com/120"} // default avatar
          alt="Profile"
          style={avatar}
        />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button style={editBtn}>Edit Profile</button>
      </div>
    </div>
  );
};

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  background: "#f5f5f5",
  padding: "20px",
};

const profileBox = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  width: "300px",
};

const avatar = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "15px",
};

const editBtn = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ProfileMenu;
