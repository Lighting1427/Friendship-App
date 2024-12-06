import React from "react";

// A modal component for displaying a user's profile information
export default function ProfileModal({ isOpen, setIsProfileModalOpen, user }) {
    // If the modal is not open or no user data is provided, render nothing
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal content */}
            <div
                className="bg-white rounded-lg p-6 w-2/3 max-w-sm"
                style={{ backgroundColor: "#FFFFFF" }} // Sets the modal background color
            >
                <h3 className="text-xl font-bold mb-4 text-center">User Profile</h3>
                <div className="flex flex-col items-center">
                    <img
                        src="/woman1.png" // Placeholder for the user's avatar
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">{user.nickname}</h3> {/* Display user's nickname */}
                    <p className="text-gray-700"><strong>Email:</strong> {user.email}</p> {/* Display user's email */}
                    <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p> {/* Display user's phone */}
                    <p className="text-gray-700"><strong>Address:</strong> {user.address}</p> {/* Display user's address */}
                </div>
                {/* Close button */}
                <div className="mt-4 flex justify-center">
                    <button
                        className="px-8 py-2 bg-blue-500 text-white rounded-full"
                        onClick={() => setIsProfileModalOpen(false)} // Close the modal when clicked
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
