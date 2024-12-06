import React, { useState, useEffect } from "react";
import BoardSection from "./BoardSection";
import PostModal from "./PostModal";
import BackgroundModal from "./BackgroundModal";
import StickerModal from "./StickerModal";
import ProfileModal from "./ProfileModal";
import axios from "axios";

// This component allows users to create and view posts with features like background colors, stickers, and user profiles.
export default function PostMessageButton({ currentUser, clients }) {
  // State to control modals and manage post-related data
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the visibility of the post modal
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false); // Controls the background selection modal
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false); // Controls the sticker selection modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Controls the profile modal
  const [selectedUser, setSelectedUser] = useState(null); // Holds the selected user for profile viewing
  const [posts, setPosts] = useState([]); // Stores all the posts
  const [comment, setComment] = useState(""); // Stores the user's comment input
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Sets the background color for the post
  const [selectedSticker, setSelectedSticker] = useState(null); // Stores the selected sticker

  // Fetches posts from the server when the component mounts or the clients list changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setPosts(response.data); // Updates the state with the fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [clients]); // Re-fetch posts whenever the clients list changes

  // Handles the creation of a new post
  const handlePost = async () => {
    if (!comment.trim()) return; // Prevents empty posts

    try {
      const response = await axios.post("http://localhost:3000/api/posts", {
        user_id: currentUser?.id || 0, // Sets the user ID or defaults to 0
        content: comment, // Sends the comment content
        background_color: backgroundColor, // Sends the selected background color
        sticker_url: selectedSticker || "", // Sends the sticker URL if selected
      });

      // Updates the post list with the new post
      setPosts([...posts, response.data]);

      // Resets state after posting
      setComment("");
      setBackgroundColor("#FFFFFF");
      setSelectedSticker(null);
      setIsModalOpen(false); // Closes the modal
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Selects a user for viewing their profile
  const handleSelectUser = (userId) => {
    const user = clients.find((client) => client.id === userId); // Finds the selected user by ID
    if (user) {
      setSelectedUser(user); // Sets the selected user
      setIsProfileModalOpen(true); // Opens the profile modal
    } else {
      console.error("User not found");
    }
  };

  // Renders the component UI
  return (
    <div className="space-y-6 mx-auto p-4">
      <BoardSection
        posts={posts} // Passes the list of posts to the BoardSection component
        setIsModalOpen={setIsModalOpen} // Passes the function to open the post modal
        handleSelectUser={handleSelectUser} // Passes the function to handle user selection
        currentUser={currentUser} // Passes the current user's data
        clients={clients} // Passes the list of all users (clients)
      />
      {/* Post creation modal */}
      <PostModal
        isOpen={isModalOpen} // Controls the visibility of the post modal
        setIsModalOpen={setIsModalOpen} // Function to open or close the modal
        name={currentUser?.nickname || "Guest"} // Displays the current user's name or "Guest" if undefined
        comment={comment} // Passes the current comment value
        setComment={setComment} // Updates the comment value
        backgroundColor={backgroundColor} // Passes the selected background color
        selectedSticker={selectedSticker} // Passes the selected sticker
        setIsBackgroundModalOpen={setIsBackgroundModalOpen} // Opens the background selection modal
        setIsStickerModalOpen={setIsStickerModalOpen} // Opens the sticker selection modal
        handlePost={handlePost} // Triggers the post creation
      />

      {/* Background selection modal */}
      <BackgroundModal
        isOpen={isBackgroundModalOpen} // Controls the visibility of the background modal
        setIsBackgroundModalOpen={setIsBackgroundModalOpen} // Function to open or close the modal
        setBackgroundColor={setBackgroundColor} // Updates the selected background color
        setIsModalOpen={setIsModalOpen} // Reopens the post modal
      />

      {/* Sticker selection modal */}
      <StickerModal
        isOpen={isStickerModalOpen} // Controls the visibility of the sticker modal
        setIsStickerModalOpen={setIsStickerModalOpen} // Function to open or close the modal
        setSelectedSticker={setSelectedSticker} // Updates the selected sticker
        setIsModalOpen={setIsModalOpen} // Reopens the post modal
      />

      {/* User profile modal */}
      <ProfileModal
        isOpen={isProfileModalOpen} // Controls the visibility of the profile modal
        setIsProfileModalOpen={setIsProfileModalOpen} // Function to open or close the modal
        user={selectedUser} // Passes the selected user's data
      />
    </div>
  );
}
