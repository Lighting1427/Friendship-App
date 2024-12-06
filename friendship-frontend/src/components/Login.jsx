import React, { useState } from "react";

// Login Component
// Props:
// - onLogin: Callback function to handle the login action
// - onGoToRegister: Callback function to navigate to the registration form
export default function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState(""); // State to store the user's email input

  // Handle form submission for login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onLogin(email); // Pass the entered email to the parent component via onLogin
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Login Form */}
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleLogin} // Call handleLogin when the form is submitted
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {/* Email Input Field */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email" // Input type email ensures valid email format
            value={email} // Bind the email state to the input field
            onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
            className="input input-bordered w-full"
            required // Make this field mandatory
          />
        </div>
        {/* Login Button */}
        <button type="submit" className="btn btn-primary w-full mb-4">
          Login
        </button>
        {/* Switch to Register Button */}
        <button
          type="button"
          className="btn btn-secondary w-full"
          onClick={onGoToRegister} // Navigate to the registration form
        >
          Register
        </button>
      </form>
    </div>
  );
}
