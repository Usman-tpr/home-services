// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Profile = () => {
  const [services, setServices] = useState([]);
  const [user , setUser ] = useState()
  // const user = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   bio: 'A passionate web developer with a love for creating amazing user experiences.',
  //   image: 'https://source.unsplash.com/1600x900/?portrait',
  // };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('HomeToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get('http://localhost:5000/services/getMy', { headers });
        const res = await axios.get('http://localhost:5000/user/byToken', { headers });
          setUser(res.data.body)
        // Correctly set the services state
        console.log(response)
        setServices(response.data.body); // Assuming the response directly returns the services array
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    
    fetchServices();
  }, []);

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('HomeToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
     const res =  await axios.delete(`http://localhost:5000/services/delete/${id}`, { headers });
     console.log(res)

      setServices(services.filter(service => service._id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* User Details Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 mb-6"
      >
        <div className="flex items-center mb-6">
          {/* <img
            src={user.image || null}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-blue-900"
          /> */}
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-blue-900">{user?.name}</h1>
            <p className="text-lg text-gray-700">{user?.email}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">About Me</h2>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600">Phone: {user?.phone}</p>
        </div>

        <button className="mt-6 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          Edit Profile
        </button>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service._id} className="bg-gray-100 rounded-lg p-4 shadow-md relative">
                <h4 className="text-xl font-semibold">Name : {service.name}</h4>
                <p className="text-gray-600">Desc : {service.desc}</p>
                <p className="text-gray-800 font-bold mt-2">Price : {service.price}/Hour</p>
                <p className="text-gray-800 font-bold mt-2">{service.category}</p>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No services posted yet.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
