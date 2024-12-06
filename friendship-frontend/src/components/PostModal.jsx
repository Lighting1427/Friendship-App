import React from "react";

// A modal component for creating a new post
export default function PostModal({
    isOpen, // Determines whether the modal is open
    setIsModalOpen, // Function to open/close the modal
    name, // Name of the user creating the post
    comment, // The content of the post
    setComment, // Function to update the post content
    backgroundColor, // Background color of the post
    selectedSticker, // Selected sticker for the post
    setIsBackgroundModalOpen, // Function to open the background selection modal
    setIsStickerModalOpen, // Function to open the sticker selection modal
    handlePost, // Function to handle post submission
}) {
    if (!isOpen) return null; // If the modal is not open, do not render anything

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal content */}
            <div
                className="bg-white rounded-lg p-6 w-2/3 max-w-lg"
                style={{ backgroundColor }} // Apply the selected background color
            >
                <h3 className="text-xl font-bold mb-4">Create a New Post</h3>

                {/* User input section */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src="/woman1.png" // Placeholder avatar
                        alt="Avatar"
                        className="w-12 h-12 rounded-full"
                    />
                    <input
                        type="text"
                        value={name} // Display user's name
                        disabled // Make input read-only
                        className="input input-bordered flex-1 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Comment writing section */}
                <div
                    className="relative mb-4 rounded-lg"
                    style={{
                        backgroundColor: backgroundColor, // Apply selected background color
                        border: "2px solid orange",
                        width: "100%", // Set width
                        height: "300px", // Set height
                    }}
                >
                    {/* Display the selected sticker if any */}
                    {selectedSticker && (
                        <img
                            src={selectedSticker}
                            alt="Selected Sticker"
                            className="absolute w-24 h-24 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"
                        />
                    )}
                    <textarea
                        placeholder="Write your comment..."
                        value={comment} // Bind the comment state
                        onChange={(e) => setComment(e.target.value)} // Update the comment state
                        className="textarea textarea-bordered w-full h-full text-lg relative z-10"
                        style={{
                            backgroundColor: "transparent", // Transparent background for text area
                            resize: "none", // Disable resizing
                        }}
                    ></textarea>

                    {/* Button to open background color modal */}
                    <img
                        src="/SkyBlue.png" // Icon for changing background
                        alt="Change Background"
                        onClick={() => {
                            setIsBackgroundModalOpen(true); // Open background modal
                            setIsModalOpen(false); // Close current modal
                        }}
                        className="absolute right-16 bottom-4 w-10 h-10 cursor-pointer"
                        style={{ zIndex: 20 }}
                    />
                    {/* Button to open sticker selection modal */}
                    <img
                        src="/smile.png" // Icon for selecting a sticker
                        alt="Choose Sticker"
                        onClick={() => {
                            setIsStickerModalOpen(true); // Open sticker modal
                            setIsModalOpen(false); // Close current modal
                        }}
                        className="absolute right-4 bottom-4 w-10 h-10 cursor-pointer"
                        style={{ zIndex: 20 }}
                    />
                </div>

                {/* Submit and cancel buttons */}
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        className="px-8 py-2 bg-gray-400 text-white rounded-[30px]"
                        onClick={() => setIsModalOpen(false)} // Close modal on cancel
                    >
                        Cancel
                    </button>

                    <button
                        className="px-8 py-2 w-55 bg-blue-500 text-white rounded-[30px]"
                        onClick={handlePost} // Trigger post submission
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
