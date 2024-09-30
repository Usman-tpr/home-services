// Home.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('assets/images/home.jpg')" }}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Trusted Partner for Home Services</h1>
            <p className="text-lg md:text-xl mb-8">Quality service providers at your convenience. Book your service now!</p>
            <Link to='/services' className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg transition-colors duration-300">
              Book a Service Now
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Home Cleaners Section */}
      <ServiceSection title="Home Cleaning Services" serviceType="cleaning" />

      {/* Plumbers Section */}
      <ServiceSection title="Plumbing Services" serviceType="plumber" />

      {/* Electricians Section */}
      <ServiceSection title="Electrical Services" serviceType="electrician" />

      {/* Gardening Services Section */}
      <ServiceSection title="Gardening Services" serviceType="gardener" />

      {/* Additional Section: Painting Services */}
      <ServiceSection title="Painting Services" serviceType="painter" />
    </div>
  );
};

// ServiceSection Component
const ServiceSection = ({ title, serviceType }) => {
  const serviceCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      className="py-16 bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              variants={serviceCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ServiceCard
                imageUrl={`https://source.unsplash.com/800x600/?${serviceType},${index}`}
                name={`${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} ${index + 1}`}
                title={`Professional ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}`}
                price={`$${(Math.random() * 50 + 50).toFixed(2)} per hour`}
                workingHours="9 AM - 5 PM"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ServiceCard Component
const ServiceCard = ({ imageUrl, name, title, price, workingHours }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img
        src="assets/images/home.jpg"
        alt={name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-lg text-gray-700 mb-2">{title}</p>
      <p className="text-lg mb-2">Price: {price}</p>
      <p className="text-lg mb-4">Working Hours: {workingHours}</p>
      <Link to='/services' className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors duration-300">
        Book Now
      </Link>
    </div>
  );
};

export default Home;
