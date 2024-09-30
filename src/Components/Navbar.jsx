// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('HomeToken'); // Retrieve the token from local storage

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/user/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the authorization header
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData); // Update the user state with the fetched data
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [token]); // Run effect when the token changes

  const handleLogout = () => {
    localStorage.removeItem('HomeToken'); // Remove token from local storage
    setUser(null); // Clear user state
    window.location.reload(); // Optionally reload the page or redirect
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="text-2xl font-bold">
          Home Services
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`sm:flex sm:items-center ${isOpen ? "block" : "hidden"}`}>
          <ul className="sm:flex sm:space-x-6 mt-4 sm:mt-0">
            <li>
              <Link to="/" className="block text-lg hover:text-yellow-400 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="block text-lg hover:text-yellow-400 transition-colors duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-lg hover:text-yellow-400 transition-colors duration-300">
                About 
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-lg hover:text-yellow-400 transition-colors duration-300">
                Contact Us
              </Link>
            </li>

            {/* Conditional rendering for Profile and Logout */}
            {token && user ? (
              <>

                <li>
                  <a 
                    href="#logout" 
                    onClick={handleLogout} 
                    className="block text-lg hover:text-yellow-400 transition-colors duration-300"
                  >
                    Logout
                  </a>
                </li>

                <li>
                  <Link to="/profile" className="block text-lg hover:text-yellow-400 transition-colors duration-300">
                    {user.body.name}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="block text-lg hover:text-yellow-400 transition-colors duration-300">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
