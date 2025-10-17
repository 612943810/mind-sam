import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navigation() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const logoutUser = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full bg-yellow-200">
      <div className="px-4 py-3 flex items-center">
        <div className="flex items-center gap-4">
          <Link to={`/${currentUser || ''}`} className="text-indigo-900 font-semibold">Inventory</Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {currentUser ? (
            <button onClick={logoutUser} className="text-sm text-indigo-900">Logout</button>
          ) : (
            <>
              <Link to="/register" className="text-sm text-indigo-900">Register</Link>
              <Link to="/login" className="text-sm text-indigo-900">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
