

import { Link } from "react-router-dom";
import { useAuth} from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <p className="mb-6">What would you like to do today?</p>

      <div className="flex flex-col gap-4">
        <Link
          to="/learn"
          className="bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
        >
          Start a New Lesson
        </Link>
        <Link
          to="/history"
          className="bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
        >
          View My History
        </Link>
        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            className="bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-700"
          >
            Go to Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
}
