import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [userId, setUserId] = useState();
    const [selectedService, setSelectedService] = useState(null);
    const [notification, setNotification] = useState('');
    const [serviceProviders, setServiceProviders] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [paymentDetails, setPaymentDetails] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleConfirmBooking = async () => {
        try {
            const paymentPayload = {
                cardholderName: paymentDetails.cardholderName,
                cardNumber: paymentDetails.cardNumber,
                expiryDate: paymentDetails.expiryDate,
                cvv: paymentDetails.cvv,
                amount: parseInt(selectedService?.price * 0.9),
                description: "Payment"
            };
            const token = localStorage.getItem('HomeToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            // Payment API request
            const paymentResponse = await axios.post('http://localhost:5000/payment/create-payment', paymentPayload);
            if (paymentResponse.data.success) {
                const bookingPayload = {
                    serviceId: selectedService.id,
                    userId,
                    amount: paymentPayload.amount
                };

                const bookingResponse = await axios.post('http://localhost:5000/payment/bookings', bookingPayload, { headers });
                if (bookingResponse.data.success) {
                    setNotification('Booking confirmed and payment successful!');
                } else {
                    setNotification('Booking failed. Please try again.');
                }
            } else {
                setNotification('Payment failed. Please try again.');
            }

            setIsBookingOpen(false);
        } catch (error) {
            console.error('Error during payment or booking:', error);
            setNotification('An error occurred. Please try again.');
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
                    setUserId(res.data.body._id);
                }

                setServiceProviders(response.data.body);
                setFilteredServices(response.data.body);

            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const handlePaymentChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleBookNow = (service) => {
        setSelectedService(service);
        setIsBookingOpen(true);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = serviceProviders.filter(provider =>
            provider.category.toLowerCase().includes(value)
        );
        setFilteredServices(filtered);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className='flex items-center justify-center mb-10'>
                <input
                    type="text"
                    className='border-blue-900 border-2 rounded-l-full px-4 w-[50%] py-2'
                    placeholder='e.g Cleaner, electrician, etc'
                    onChange={handleSearch}
                />
                <button className='bg-blue-900 rounded-r-full px-4 text-white py-3'>Search</button>
            </div>

            {/* Notification */}
            {notification && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {notification}
                </div>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.length > 0 ? (
                    filteredServices.map((provider) => (
                        <div key={provider.id} className="bg-white rounded-lg shadow-lg p-6">
                            <img
                                src={provider.image || 'assets/images/home.jpg'}
                                alt="Service Provider"
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-xl font-semibold mt-4">{provider.name}</h3>
                            <p className="text-gray-600">{provider.category}</p>
                            <p className="text-gray-800 font-bold mt-2">{provider.price}</p>
                            <p className="text-gray-800 font-bold mt-2">{provider.phone}</p>
                            <p className="text-gray-600">Working Hours: {provider.workingHours}</p>
                            <button
                                onClick={() => handleBookNow(provider)}
                                className={`bg-yellow-500 text-white px-4 py-2 mt-4 rounded hover:bg-yellow-600 transition ${provider.admin === userId ? "hidden" : "flex"}`}
                            >
                                Book Now
                            </button>
                        </div>
                    ))
                ) : (
                    <h1 className="col-span-full text-center text-2xl font-semibold text-gray-500">No Products Found</h1>
                )}
            </div>

            {/* Booking Confirmation Modal */}
            {isBookingOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
                        <h2 className="text-2xl font-bold mb-4">Payment & Booking Confirmation</h2>
                        <h2 className="text-lg font-bold mb-4 text-red-600">A 10% of Total amount shall be deducted from the Deal. (Company Policy)</h2>
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
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
