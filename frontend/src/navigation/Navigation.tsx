import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [currentUser, setCurrentUser] = useState(username || null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser.username);
    }
  }, []);

  const logoutUser = () => {
    axios
      .get("http://localhost:3000/logout")
      .then(() => {
        localStorage.removeItem('user'); 
        navigate('/'); 
      })
      .catch(() => {
        alert("Page not available.");
      });
  };

  return (
    <>
      <nav className="navigationBar">
        {currentUser ? (
          <>
            <Link to={`/${currentUser}`} className="navLink">Inventory</Link>
            <li onClick={logoutUser} className="navLink">
              <a>Logout</a>
            </li>
          </>
        ) : (
          <>
            <Link to="/" className="navLink">Inventory</Link>
            <li className="navLink loginPosition">
              <a className="registerPad" href="/register">Register</a>
            </li>
            <li className="navLink">
              <a href="/login">Login</a>
            </li>
          </>
        )}
      </nav>
    </>
  );
}
