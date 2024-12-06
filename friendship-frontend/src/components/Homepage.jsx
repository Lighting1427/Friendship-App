import React from "react";

// Homepage Component
// This component represents the header or top section of the homepage
export default function Homepage() {
  return (
    <div className="h-[225px] bg-[#FCECD4] relative">
      {/* Background Vector Image (Layer below) */}
      <img
        src="/Vector.png" // Path to the vector background image
        alt="Vector Background" // Alternative text for the image
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[250px] w-[1900px]" // Center the image horizontally
      />

      {/* Friendship Icon (Layer above) */}
      <img
        src="/friendshipicon.png" // Path to the friendship icon
        alt="Friendship Icon" // Alternative text for the image
        className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[150px] w-auto" // Center the icon and position it at the top
      />
    </div>
  );
}
