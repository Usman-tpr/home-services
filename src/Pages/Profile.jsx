// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem("HomeToken");
  const handleCheckLogin = () =>{
    if(!token){
      return navigate("/register" , { state:{isFromProfile : true}})
    }
  }
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    desc: '',
    price: '',
    workingHours: '',
    phone: ''
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddService = async () => {
    try {
      const token = localStorage.getItem('HomeToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post('http://localhost:5000/services/add', formData, { headers });
      console.log('New Service:', response.data);
      setNotification('Service added successfully!');
      setIsModalOpen(false);
      setFormData({ name: '', category: '', desc: '', price: '', workingHours: '', phone: '' });
      // Fetch services again to include the newly added service
    } catch (error) {
      console.error('Error adding service:', error);
      setNotification('Failed to add service. Please try again.');
    }
  };
  useEffect(() => {
    const fetchServices = async () => {
      handleCheckLogin()
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
      const res = await axios.delete(`http://localhost:5000/services/delete/${id}`, { headers });
      console.log(res)

      setServices(services.filter(service => service._id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded mx-auto">
          {notification}
        </div>
      )}
      <div className="p-6 flex mx-10 justify-between">
        {/* User Details Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-6"
        >
          <div className="flex items-center mb-6">
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
          className="bg-white rounded-lg shadow-lg p-8 w-full"
        >
          <div className='flex justify-between'>
            <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Add Service
            </button>
          </div>
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
            <p className="text-gray-600">No services posted yet. Please Click On Add Service To Add your Service</p>
          )}
        </motion.div>
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="cleaner">Cleaners</option>
                <option value="electrician">Electricians</option>
                <option value="plumber">Plumbers</option>
                <option value="carpenter">Carpenters    </option>
                <option value="painter">Painters</option>
                <option value="gardener">Gardeners</option>
                <option value="roofer">Roofers</option>
                <option value="applianceRepair">Appliance Repair</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="Enter Card Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
