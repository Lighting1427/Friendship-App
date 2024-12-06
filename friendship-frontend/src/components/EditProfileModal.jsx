import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

// EditProfileModal Component
// Props:
// - isOpen: Boolean to determine if the modal should be displayed
// - setIsOpen: Function to toggle modal visibility
// - user: The current user's data
// - onSave: Callback function to handle profile updates
export default function EditProfileModal({ isOpen, setIsOpen, user, onSave }) {
  // Local state for managing input fields
  const [nickname, setNickname] = useState(user.nickname); // Track nickname input
  const [phone, setPhone] = useState(user.phone); // Track phone input
  const [address, setAddress] = useState(user.address); // Track address input

  // If the modal is not open, return null (render nothing)
  if (!isOpen) return null;

  // Handle saving the updated profile
  const handleSave = async () => {
    // Check for missing required fields
    if (!nickname || !phone || !address) {
      console.error("Missing required fields"); // Log an error if any fields are empty
      return;
    }
    try {
      // Send a PUT request to update the user's profile
      const response = await axios.put(`http://localhost:3000/api/clients/${user.id}`, {
        nickname,
        phone,
        address,
      });

      // Call the onSave callback with the updated data
      onSave(response.data);
      setIsOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error); // Log any errors
      alert("Failed to update profile. Please try again."); // Alert the user on failure
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Modal container */}
      <div className="bg-white rounded-lg p-6 w-2/3 max-w-sm">
        <h4 className="text-lg font-bold text-center mb-4 text-blue-500">Edit Profile</h4>
        {/* Nickname field */}
        <div className="mb-4">
          <label className="block mb-2">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} // Update nickname state
            className="input input-bordered w-full"
          />
        </div>
        {/* Email field (disabled, cannot be edited) */}
        <div className="mb-4">
          <label className="block mb-2">Email (cannot be changed)</label>
          <input
            type="email"
            value={user.email} // Display the user's email
            disabled // Make the input field non-editable
            className="input input-bordered w-full"
          />
        </div>
        {/* Phone field */}
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Update phone state
            className="input input-bordered w-full"
          />
        </div>
        {/* Address field */}
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Update address state
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {/* Cancel button */}
          <button
            className="px-8 py-2 bg-gray-400 text-white rounded-full"
            onClick={() => setIsOpen(false)} // Close the modal without saving
          >
            Cancel
          </button>
          {/* Save button */}
          <button
            className="px-8 py-2 bg-blue-500 text-white rounded-full"
            onClick={handleSave} // Save the updated profile
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
