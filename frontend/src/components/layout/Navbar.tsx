import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <h1 className="text-lg font-bold text-gray-800">📚 מערכת הלימוד</h1>
        {user && (
          <>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">ראשי</Link>
            <Link to="/history" className="text-gray-600 hover:text-blue-600">היסטוריה</Link>
            {user.role === 'ADMIN' && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600">ניהול</Link>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="text-gray-700">שלום, {user.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              יציאה
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
