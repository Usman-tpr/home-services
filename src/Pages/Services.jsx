import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [userId, setUserId] = useState()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        desc: '',
        price: '',
        workingHours: '',
        phone: ''
    });
    const [selectedService, setSelectedService] = useState(null);
    const [notification, setNotification] = useState('');
    const [serviceProviders, setServiceProviders] = useState([]); // Initialize state for service providers

    const [paymentDetails, setPaymentDetails] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleConfirmBooking = async () => {
        try {
            const paymentPayload = {
                cardholderName: paymentDetails.cardholderName,
                cardNumber: paymentDetails.cardNumber,
                expiryDate: paymentDetails.expiryDate,
                cvv: paymentDetails.cvv,
                amount: selectedService?.price
            };

            // const response = await axios.post('http://localhost:5000/payment', paymentPayload);
            // console.log('Payment Response:', response.data);
            setNotification('Booking confirmed and payment successful! ' );

            // if (response.data.success) {
            //     setNotification('Booking confirmed and payment successful!');
            // } else {
            //     setNotification('Payment failed. Please try again.');
            // }

            setIsBookingOpen(false);
        } catch (error) {
            console.error('Error during payment:', error);
            setNotification('Payment failed. Please try again.');
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem('HomeToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const response = await axios.get('http://localhost:5000/services/getAll');
                if (token) {
                    const res = await axios.get('http://localhost:5000/user/byToken', { headers });
                    setUserId(res.data.body._id)
                    console.log(res.data.body._id)
                }

                setServiceProviders(response.data.body); // Assuming the response data is an array of services
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []); // Empty dependency array to run only on mount

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
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

    const handleBookNow = (service) => {
        setSelectedService(service);
        setIsBookingOpen(true);
    };


    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900">Our Services</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                    Add Service
                </button>
            </div>

            {/* Notification */}
            {notification && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {notification}
                </div>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceProviders && serviceProviders.map((provider) => (
                    <div key={provider.id} className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src={provider.image || 'assets/images/home.jpg'}
                            alt="Service Provider"
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-xl font-semibold mt-4">{provider.name}</h3>
                        <p className="text-gray-600">{provider.desc}</p>
                        <p className="text-gray-800 font-bold mt-2">{provider.price}</p>
                        <p className="text-gray-800 font-bold mt-2">{provider.phone}</p>
                        <p className="text-gray-600">Working Hours: {provider.workingHours}</p>
                        <button
                            onClick={() => handleBookNow(provider)}
                            className={`bg-yellow-500 text-white px-4 py-2 mt-4 rounded hover:bg-yellow-600 transition ${provider.admin == userId ? "hidden" : "flex"}`}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
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
                            <textarea
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

            {/* Booking Confirmation Modal */}
            {isBookingOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
                        <h2 className="text-2xl font-bold mb-4">Payment & Booking Confirmation</h2>
                        <h2 className="text-lg   font-bold mb-4 text-red-600">A 10% of Total amount shall be deducted from the Deal.(Company Policy)</h2>
                        <p className="mb-4">Please enter your payment details to confirm the booking.</p>
                        <h3 className="text-xl font-semibold">Service Name: {selectedService?.name}</h3>
                        <p className="text-gray-600">Info: {selectedService?.desc}</p>
                        <p className="text-gray-800 font-bold mt-2">Price: {selectedService?.price}</p>
                        <p className="text-gray-800 font-bold mt-2">Phone: {selectedService?.phone}</p>
                        <p className="text-gray-600">Working Hours: {selectedService?.workingHours}</p>

                        {/* Payment Form */}
                        <form className="mt-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                                <input
                                    type="text"
                                    name="cardholderName"
                                    placeholder="Enter Cardholder Name"
                                    value={paymentDetails.cardholderName}
                                    onChange={handlePaymentChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Enter Card Number"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={paymentDetails.expiryDate}
                                    onChange={handlePaymentChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                <input
                                    type="password"
                                    name="cvv"
                                    placeholder="Enter CVV"
                                    value={paymentDetails.cvv}
                                    onChange={handlePaymentChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                        </form>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setIsBookingOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                            >
                                Confirm Booking & Pay
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Services;
