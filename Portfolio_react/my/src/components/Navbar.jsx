/*import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#343a40", padding: "1rem" }}>
      <Link style={{ color: "white", marginRight: "1rem" }} to="/">Home</Link>
      <Link style={{ color: "white", marginRight: "1rem" }} to="/about">About</Link>

        <Link style={{ color: "white", marginRight: "1rem" }} to="/login">Login</Link>
      <Link style={{ color: "white" }} to="/contact">Contact</Link>
     
     




    </nav>
  );
}

export default Navbar;*/

{/*import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon

function Navbar() {
  return (
    <nav style={{ 
      background: "#343a40", 
      padding: "1rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center" 
    }}>
      <div>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/">Home</Link>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/about">About</Link>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/login">Login</Link>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/contact">Contact</Link>
      </div>

      {/* Profile icon on the right */}
      /*<Link to="/profile" style={{ color: "white", fontSize: "1.5rem" }}>
        <FaUserCircle />
      </Link>
    </nav>
  );
}

export default Navbar;*/


import { useState } from "react";
import { Link } from "react-router-dom";
import pro from '../components/images/pro.jpg'

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = {
    name: "John Doe",
    avatar:pro
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={{ 
      background: "#343a40", 
      padding: "1rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      position: "relative"
    }}>
      {/* Left links */}
      <div>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/">Home</Link>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/about">About</Link>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/login">Login</Link>
        <Link style={{ color: "white", marginRight: "1rem" }} to="/contact">Contact</Link>
      </div>

      {/* Profile avatar */}
      <div style={{ position: "relative" }}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          onClick={toggleDropdown} 
          style={{ 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%", 
            objectFit: "cover", 
            border: "2px solid white", 
            cursor: "pointer" 
          }} 
        />

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div style={{
            position: "absolute",
            right: 0,
            top: "50px",
            background: "white",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            overflow: "hidden",
            zIndex: 1000
          }}>
            <Link to="/profile" style={dropdownItemStyle}>Profile</Link>
            <Link to="/settings" style={dropdownItemStyle}>Settings</Link>
            <Link to="/logout" style={dropdownItemStyle}>Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// Dropdown item styling
const dropdownItemStyle = {
  display: "block",
  padding: "0.5rem 1rem",
  color: "#343a40",
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap"
};

export default Navbar;



