import React from "react";

// A component to display the profile section of the current user
export default function ProfileSection({ currentUser }) {
    // Check if currentUser is null or undefined
    if (!currentUser) {
        // Display a loading message while user data is not available
        return <div>Loading...</div>;
    }

    return (
        <div
            className="bg-white shadow-lg rounded-lg p-4 m-auto flex flex-col items-center m-10"
            style={{ maxWidth: "100%", width: "380px", height: "350px" }} // Set size constraints
        >
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Profile</h2>
            <img
                className="w-24 h-24 rounded-full mb-4"
                src="/woman1.png" // Placeholder for the user's avatar
                alt="Profile"
            />
            <h3 className="text-lg font-bold mb-2 text-center">{currentUser.nickname}</h3> {/* User's nickname */}
            <p className="text-gray-700 text-left"><strong>Email:</strong> {currentUser.email}</p> {/* User's email */}
            <p className="text-gray-700 text-left"><strong>Phone:</strong> {currentUser.phone}</p> {/* User's phone */}
            <p className="text-gray-700 text-left"><strong>Address:</strong> {currentUser.address}</p> {/* User's address */}
        </div>
    );
}
