import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PopularSkills from "./components/PopularSkills";
import RecentRequests from "./components/RecentRequests";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import ServiceRequest from "./components/ServiceRequest";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const [user, setUser] = useState(null);
  const [popularSkills, setPopularSkills] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests/top-skills")
      .then((res) => res.json())
      .then((data) => setPopularSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));

    fetch("http://localhost:5000/api/requests")
      .then((res) => res.json())
      .then((data) => setRecentRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      {user && <Navbar user={user} setUser={setUser} />} 
      
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Hero />
                <PopularSkills skills={popularSkills} />
                <RecentRequests requests={recentRequests} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard skills={popularSkills} requests={recentRequests} /> : <Navigate to="/login" />} />
        <Route path="/requests" element={user ? <ServiceRequest /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
