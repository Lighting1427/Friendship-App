import React, { useState, useEffect } from "react"; // Import React and hooks
import axios from "axios"; // Import Axios for making HTTP requests
import Navbar from "./components/Navbar"; // Import Navbar component
import Homepage from "./components/Homepage"; // Import Homepage component
import Register from "./components/Register"; // Import Register component
import Login from "./components/Login"; // Import Login component
import ProfileSection from "./components/ProfileSection"; // Import ProfileSection component
import EditProfileModal from "./components/EditProfileModal"; // Import EditProfileModal component
import PostMessageButton from "./components/PostMessageButton"; // Import PostMessageButton component

function App() {
  // States for managing user authentication and profile data
  const [isRegistered, setIsRegistered] = useState(true); // Tracks whether user is registered
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks whether user is logged in
  const [currentUser, setCurrentUser] = useState(null); // Tracks the currently logged-in user
  const [clients, setClients] = useState([]); // Tracks all client/user data
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false); // Tracks whether the edit profile modal is open

  // Function to fetch all clients/users
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clients"); // Fetch all clients from API
      setClients(response.data.users); // Update state with the fetched clients
    } catch (error) {
      console.error("Error fetching clients:", error); // Log any errors
    }
  };

  // useEffect hook to fetch data when user logs in
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      // Fetch details of the current user
      axios
        .get("http://localhost:3000/api/clients") // Fetch all clients
        .then((response) => {
          const user = response.data.users.find(
            (u) => u.email === currentUser.email // Find the current user's details
          );
          setCurrentUser(user); // Update currentUser state
        })
        .catch((error) => console.error("Error fetching user:", error));

      // Fetch all clients/users
      fetchClients(); // Update the list of all clients
    }
  }, [isLoggedIn, currentUser]); // Dependencies: isLoggedIn, currentUser

  // Function to handle user registration
  const handleRegister = async (userData) => {
    try {
      await axios.post("http://localhost:3000/api/clients", userData); // Send registration data to API
      setIsRegistered(true); // Mark user as registered
    } catch (error) {
      alert("Registration failed. Please try again."); // Show error if registration fails
    }
  };

  // Function to handle user login
  const handleLogin = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/clients/login",
        { email } // Send login request with email
      );
      if (response.data.success) {
        setCurrentUser(response.data.user); // Set current user if login is successful
        setIsLoggedIn(true); // Mark user as logged in
      } else {
        alert("Invalid email. Please try again."); // Show error for invalid email
      }
    } catch (error) {
      alert("Login failed. Please try again."); // Show error if login fails
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setCurrentUser(null); // Clear current user
    setIsLoggedIn(false); // Mark user as logged out
  };

  // Function to handle profile updates
  const handleSaveProfile = async (updatedUser) => {
    try {
      setCurrentUser(updatedUser); // Update currentUser with the new profile data
      setIsEditProfileModalOpen(false); // Close the edit profile modal
      await fetchClients(); // Refresh the list of all clients
    } catch (error) {
      console.error("Error updating profile:", error); // Log any errors
    }
  };

  // If the user is not logged in, show either the Login or Register component
  if (!isLoggedIn) {
    return isRegistered ? (
      <Login
        onLogin={handleLogin} // Handle login
        onGoToRegister={() => setIsRegistered(false)} // Switch to registration form
      />
    ) : (
      <Register
        onRegister={handleRegister} // Handle registration
        onGoToLogin={() => setIsRegistered(true)} // Switch to login form
      />
    );
  }

  // If logged in, show the main application UI
  return (
    <>
      <Navbar
        onLogout={handleLogout} // Handle logout
        onEditProfile={() => setIsEditProfileModalOpen(true)} // Open edit profile modal
      />
      <div className="border-b-2 border-black-300"></div> {/* Divider */}
      <Homepage /> {/* Homepage component */}
      <div
        className="mt-0 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 mx-auto"
        style={{
          backgroundColor: "#FCECD4", // Background color
          minHeight: "100vh", // Ensure full viewport height
        }}
      >
        {/* Profile Section */}
        <div className="col-span-12 lg:col-span-3 mb-4 lg:mb-0">
          <ProfileSection currentUser={currentUser} /> {/* Show current user's profile */}
        </div>

        {/* Board Section */}
        <div className="col-span-12 lg:col-span-9">
          <PostMessageButton
            currentUser={currentUser} // Pass current user to PostMessageButton
            clients={clients} // Pass all clients to PostMessageButton
          />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen} // Whether the modal is open
        setIsOpen={setIsEditProfileModalOpen} // Function to toggle modal visibility
        user={currentUser} // Pass current user to modal
        onSave={handleSaveProfile} // Handle profile save action
      />
    </>
  );
}

export default App; // Export the App component
