// src/Pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard.jsx";

const ProfilePage = () => {
  const { id } = useParams(); // get user ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with your actual backend API
    fetch(`http://localhost:5000/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return <ProfileCard user={user} />;
};

export default ProfilePage;
