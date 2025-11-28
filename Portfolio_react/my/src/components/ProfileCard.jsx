// src/Components/ProfileCard.jsx
import React from "react";
//import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="profile-pic"
      />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default ProfileCard;
