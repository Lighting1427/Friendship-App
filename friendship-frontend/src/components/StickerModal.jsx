import React, { useState } from "react";

// A modal component for selecting stickers
export default function StickerModal({
    isOpen, // Determines whether the modal is open
    setIsStickerModalOpen, // Function to close the sticker modal
    setSelectedSticker, // Function to set the selected sticker
    setIsModalOpen, // Function to reopen the main modal (e.g., PostModal)
}) {
    if (!isOpen) return null; // If the modal is not open, render nothing

    // Array of sticker options
    const stickers = [
        "/sticker1.png",
        "/sticker2.png",
        "/sticker3.png",
        "/sticker4.png",
        "/sticker5.png",
        "/sticker6.png",
    ];
    // State to temporarily store the currently selected sticker
    const [selectedSticker, setTempSelectedSticker] = useState(null);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal content */}
            <div className="bg-white rounded-lg p-6 w-2/3 max-w-sm">
                {/* Header */}
                <h4 className="text-lg font-bold mb-4 text-center text-blue-500">
                    Choose Sticker
                </h4>
                {/* Sticker options grid */}
                <div className="grid grid-cols-3 gap-1 mb-6">
                    {stickers.map((sticker, index) => (
                        <div
                            key={index}
                            className={`p-1 border-4 rounded-md ${selectedSticker === sticker
                                    ? "border-black" // Highlight the selected sticker
                                    : "border-transparent"
                                }`}
                        >
                            <img
                                src={sticker} // Sticker image
                                alt={`Sticker ${index + 1}`}
                                className="w-20 h-20 cursor-pointer" // Size and pointer cursor
                                onClick={() => setTempSelectedSticker(sticker)} // Set temporary selection
                            />
                        </div>
                    ))}
                </div>
                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    {/* Back button */}
                    <button
                        className="px-8 py-2 bg-gray-400 text-white rounded-full"
                        onClick={() => {
                            setIsStickerModalOpen(false); // Close the sticker modal
                            setIsModalOpen(true); // Reopen the main modal
                        }}
                    >
                        Back
                    </button>
                    {/* OK button */}
                    <button
                        className="px-8 py-2 bg-blue-500 text-white rounded-full"
                        onClick={() => {
                            if (selectedSticker) {
                                setSelectedSticker(selectedSticker); // Confirm the selected sticker
                                setIsStickerModalOpen(false); // Close the sticker modal
                                setIsModalOpen(true); // Reopen the main modal
                            } else {
                                alert("Please select a sticker before proceeding!"); // Alert if no sticker is selected
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
