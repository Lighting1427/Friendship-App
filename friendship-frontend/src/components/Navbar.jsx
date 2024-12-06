// Navbar Component
// Props:
// - onLogout: Function to handle user logout
// - onEditProfile: Function to handle opening the edit profile modal
export default function Navbar({ onLogout, onEditProfile }) {
  return (
    <div className="navbar bg-base-100">
      {/* Left section of the Navbar */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">FRIENDSHIP</a> {/* Application Title */}
      </div>

      {/* Right section of the Navbar */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {/* Edit Profile Button */}
          <li>
            <button
              className="btn btn-secondary mr-[10px]" // Secondary styled button
              onClick={onEditProfile} // Trigger the edit profile functionality
            >
              Edit Profile
            </button>
          </li>
          {/* Logout Button */}
          <li>
            <button
              className="btn btn-primary" // Primary styled button
              onClick={onLogout} // Trigger the logout functionality
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
