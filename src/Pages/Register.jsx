// Register.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(''); // New notification state
  const token = localStorage.getItem('HomeToken'); // Retrieve the token from local storage

   const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare the user data
    const userData = {
      name,
      phone,
      email,
      password,
      cpassword: confirmPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
         
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        localStorage.setItem("HomeToken" , data.token)
        setNotification('Registration successful!'); // Set success message
        // Clear the fields if needed
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Clear notification after 5 seconds
        setTimeout(() => {
          setNotification('');
        }, 5000);
        navigate("/")
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        setNotification('Registration failed: ' + errorData.message); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification('An error occurred during registration. Please try again.');
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
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        
        {/* Notification Display */}
        {notification && (
          <div className="mb-4 p-2 text-center text-white bg-green-500 rounded">
            {notification}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-md transition-colors duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-900 hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
