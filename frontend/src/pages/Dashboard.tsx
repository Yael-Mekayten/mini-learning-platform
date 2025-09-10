// src/pages/Dashboard.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const context = useContext(AuthContext);
  
  if (!context) {
    return <Navigate to="/login" />;
  }
  
  const { user, logout } = context;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-4">Hello, {user?.name || 'User'}</h1>
      <p className="mb-6">Welcome to your learning dashboard.</p>
      <button
        onClick={logout}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Logout
      </button>
    </div>
  );
}
