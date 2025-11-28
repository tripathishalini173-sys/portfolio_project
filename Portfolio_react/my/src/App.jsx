import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AddProject from "./admin/pages/AddProject.jsx";
import AdminDashboard1 from "./admin/pages/AdminDashbord1.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";

import Home from "./Pages/home.jsx";
import About from "./Pages/about.jsx";
import Projects from "./Pages/projects.jsx";
import Contact from "./Pages/contect.jsx";
import CreateProject from "./Pages/CreateProject.jsx";
import Register from "./Pages/Register.jsx";
import UserLogin from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import ForgotPassword from "./Pages/forgetPassword.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import ProjectDetails from "./Pages/projectDetails.jsx";

import EditProject from "./admin/pages/EditProject.jsx";
import DeleteProject from "./admin/pages/DeleteProject.jsx.jsx";

import ManageUsers from "./admin/pages/MangeUsers.jsx";
import EditUser from "./admin/pages/EditUser.jsx";
import DeleteUser from "./admin/pages/DeleteUser.jsx";



import Settings from "./admin/pages/setting.jsx";
import Logout from "./admin/pages/logout.jsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile-page" element={<ProfilePage />} />
         
  <Route path="/settings" element={<Settings />} />
      <Route path="/logout" element={<Logout />} />    

         <Route path="/admin/edit-project/:id" element={<EditProject />} />
         <Route path="/admin/delete-project/:id" element={<DeleteProject />} />
      
      <Route path="/admin/users" element={<ManageUsers />} />
<Route path="/admin/edit-user/:id" element={<EditUser />} />
<Route path="/admin/delete-user/:id" element={<DeleteUser />} />
          
  {/* other routes */}
  <Route path="/projects/:id" element={<ProjectDetails />} />


          {/* Protected Route */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard1 />} />
               {/* <Projects />*/}
                



          
          <Route
            path="/admin/add-project"
            element={
            
                <AddProject />
              } />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
