import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const { username } = useParams(); // Extract username from route params
  const [currentUser, setCurrentUser] = useState(username || null);

  // Logout function
  const logoutUser = () => {
    axios
      .get("http://localhost:3000/logout")
      .then(() => {
        setCurrentUser(null); // Clear the user session
        navigate('/'); // Redirect to home
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
            <Link to={`/${username}`} className="navLink">Inventory</Link>
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
