import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // If using React Router

function MainMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
//   const [categories, setCategories] = useState([]); // State for categories (if needed)

  useEffect(() => {
    // Fetch login status (e.g., from local storage or an API call)
    const storedLoginStatus = localStorage.getItem('isLoggedIn'); // Example
    setIsLoggedIn(storedLoginStatus === 'true');
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <nav>
      <ul>
        <li><Link to="/">Browse Ads</Link></li> {/* Use React Router for navigation */}
        <li><Link to="/postAd">Post an Ad</Link></li>
        {/* <li><Link to="/search">Search Ads</Link></li> */}
        {isLoggedIn ? (
          <li><Link to="/myAds">My Ads</Link></li>
        ) : (
          <li><Link to="/login">Login/Register</Link></li>
        )}
        <li><Link to="/about">About Us</Link></li>

      </ul>
    </nav>
  );
}

export default MainMenu;