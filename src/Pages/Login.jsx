// Login.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(''); // New notification state
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare the login data
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        setNotification('Login successful!'); // Set success message
        localStorage.setItem("HomeToken" , data.token)
        navigate("/services")

        // Optionally redirect the user to another page or store user data in context/local storage

        // Clear notification after 5 seconds
        setTimeout(() => {
          setNotification('');
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        setNotification('Login failed: ' + errorData.message); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        
        {/* Notification Display */}
        {notification && (
          <div className="mb-4 p-2 text-center text-white bg-green-500 rounded">
            {notification}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-md transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-900 hover:underline">
            Register here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
