import React, { useState } from "react";

// BackgroundModal Component
// Props:
// - isOpen: Determines whether the modal is visible
// - setIsBackgroundModalOpen: Function to toggle the background modal visibility
// - setBackgroundColor: Function to set the selected background color
// - setIsModalOpen: Function to toggle the main modal visibility
export default function BackgroundModal({
    isOpen,
    setIsBackgroundModalOpen,
    setBackgroundColor,
    setIsModalOpen,
}) {
    // If the modal is not open, do not render anything
    if (!isOpen) return null;

    const colors = ["#93C5FD", "#FDBA74", "#F9A8D4", "#6EE7B7"]; // Background color options
    const [selectedColor, setSelectedColor] = useState(null); // State to store the selected color

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal container */}
            <div className="bg-white rounded-lg p-6 w-2/3 max-w-sm">
                {/* Modal title */}
                <h4 className="text-lg font-bold mb-4 text-center text-blue-500">
                    Choose Background Colors
                </h4>
                {/* Color selection buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    {colors.map((color, index) => (
                        <button
                            key={index} // Unique key for each button
                            className={`w-12 h-12 rounded-sm border-4 ${
                                selectedColor === color ? "border-black" : "border-transparent" // Highlight selected color
                            }`}
                            style={{ backgroundColor: color }} // Button background color
                            onClick={() => setSelectedColor(color)} // Set selected color on click
                        ></button>
                    ))}
                </div>
                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    {/* Back button */}
                    <button
                        className="px-8 py-2 bg-gray-400 text-white rounded-full"
                        onClick={() => {
                            setIsBackgroundModalOpen(false); // Close background modal
                            setIsModalOpen(true); // Open the main modal
                        }}
                    >
                        Back
                    </button>
                    {/* OK button */}
                    <button
                        className="px-8 py-2 bg-blue-500 text-white rounded-full"
                        onClick={() => {
                            if (selectedColor) {
                                setBackgroundColor(selectedColor); // Set the selected background color
                                setIsBackgroundModalOpen(false); // Close background modal
                                setIsModalOpen(true); // Open the main modal
                            } else {
                                alert("Please select a color before proceeding!"); // Alert if no color is selected
                            }
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
