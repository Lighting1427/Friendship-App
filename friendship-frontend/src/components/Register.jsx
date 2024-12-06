import React, { useState } from "react";

// A registration form component
export default function Register({ onRegister, onGoToLogin }) {
  // State variables for storing form input values
  const [nickname, setNickname] = useState(""); // Stores the user's nickname
  const [email, setEmail] = useState(""); // Stores the user's email
  const [phone, setPhone] = useState(""); // Stores the user's phone number
  const [address, setAddress] = useState(""); // Stores the user's address

  // Handles form submission
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onRegister({ nickname, email, phone, address }); // Call the provided registration function
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Registration form */}
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleRegister}
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {/* Nickname input field */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Nickname</label>
          <input
            type="text"
            value={nickname} // Bind state to input value
            onChange={(e) => setNickname(e.target.value)} // Update state on input change
            className="input input-bordered w-full"
            required // Make the field required
          />
        </div>

        {/* Email input field */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            value={email} // Bind state to input value
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            className="input input-bordered w-full"
            required // Make the field required
          />
        </div>

        {/* Phone input field */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Phone</label>
          <input
            type="text"
            value={phone} // Bind state to input value
            onChange={(e) => setPhone(e.target.value)} // Update state on input change
            className="input input-bordered w-full"
            required // Make the field required
          />
        </div>

        {/* Address input field */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Address</label>
          <textarea
            value={address} // Bind state to textarea value
            onChange={(e) => setAddress(e.target.value)} // Update state on input change
            className="textarea textarea-bordered w-full"
            required // Make the field required
          ></textarea>
        </div>

        {/* Register button */}
        <button type="submit" className="btn btn-primary w-full mb-4">
          Register
        </button>

        {/* Back to Login button */}
        <button
          type="button"
          className="btn btn-secondary w-full"
          onClick={onGoToLogin} // Call the function to navigate back to login
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
