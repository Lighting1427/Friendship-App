import React from "react";

// BoardSection Component
// Props:
// - posts: Array of post objects to display
// - setIsModalOpen: Function to toggle the "Write your comment" modal
// - handleSelectUser: Function to handle user profile selection
// - currentUser: Object representing the currently logged-in user
// - clients: Array of client objects containing user information
export default function BoardSection({ posts, setIsModalOpen, handleSelectUser, currentUser, clients }) {
  return (
    <div className="col-span-">
      {/* Section title */}
      <h2 className="text-xl font-bold text-blue-700 mb-4">Board</h2>

      {/* Container for the button and posts */}
      <div className="w-full max-w-6xl px-4">
        {/* "Write your comment..." button */}
        <div className="flex justify-start mb-4 w-full">
          <button
            className="flex items-center w-full p-4 bg-white shadow-md cursor-pointer"
            onClick={() => setIsModalOpen(true)} // Open the comment modal
          >
            <img
              src="/woman1.png" // User avatar image (update the path as needed)
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <span className="text-gray-500 w-full border-2 border-orange-500 text-left pl-2 rounded-lg flex">
              Write your comment...
            </span>
          </button>
        </div>

        {/* Show "No posts available" message if there are no posts */}
        {(!posts || posts.length === 0) && (
          <div className="text-center text-gray-500 mt-4">
            No posts available.
          </div>
        )}

        {/* Render each post */}
        {posts && posts.map((post, index) => {
          // Skip invalid or undefined posts
          if (!post || !post.id) {
            return null;
          }

          // Find the user's nickname based on post user_id
          const user = clients.find((client) => client.id === post.user_id);
          const nickname = user ? user.nickname : "Unknown User";

          return (
            <div
              key={index} // Unique key for each post
              className="w-full shadow-lg mb-4 relative"
              style={{ backgroundColor: "white", padding: "15px", borderRadius: "25px" }}
            >
              {/* Clip image in the top-right corner */}
              <img
                src="/clip00.png" // Clip image (update the path as needed)
                alt="Clip"
                className="absolute top-0 right-0 w-8 h-8"
              />

              <div
                className="relative overflow-hidden"
                style={{
                  backgroundColor: post.background_color, // Apply the background color of the post
                  borderRadius: "15px",
                }}
              >
                {/* Post header */}
                <div
                  className="flex items-center gap-4 p-4"
                  style={{ backgroundColor: "white" }}
                >
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={`/woman1.png`} // User avatar (update the path as needed)
                    alt="User Avatar"
                    onClick={() => handleSelectUser(post.user_id)} // Handle user profile selection
                  />
                  <div>
                    <h3
                      className="font-bold text-blue-700 cursor-pointer"
                      onClick={() => handleSelectUser(post.user_id)} // Handle user profile selection
                    >
                      {nickname} {/* Display user's nickname */}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <span className="mr-2">
                        📅 {new Date(post.created_at).toLocaleDateString()} {/* Post creation date */}
                      </span>
                      <span>
                        ⏰ {new Date(post.created_at).toLocaleTimeString()} {/* Post creation time */}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Dotted design (optional for aesthetic purposes) */}
                <div className="top-0 left-0 w-full flex justify-around items-center" style={{ transform: "translateY(50%)" }}>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white rounded-full"
                    ></div>
                  ))}
                </div>

                {/* Post content */}
                <div
                  className="p-4 relative"
                  style={{ minHeight: "150px" }}
                >
                  {/* Post text content */}
                  <p className="text-gray-800 break-words ml-6">
                    {post.content}
                  </p>

                  {/* Post sticker (if available) */}
                  {post.sticker_url && (
                    <img
                      src={post.sticker_url} // Sticker image URL
                      alt="Sticker"
                      className="w-20 h-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
