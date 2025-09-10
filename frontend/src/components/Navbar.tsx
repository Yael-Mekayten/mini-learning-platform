import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">Learning Platform</span>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/learn" className="hover:underline">New Lesson</Link>
        <Link to="/history" className="hover:underline">My History</Link>
        {user?.role === "ADMIN" && (
          <Link to="/admin" className="hover:underline">Admin</Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span>Hello, {user?.name}</span>
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
