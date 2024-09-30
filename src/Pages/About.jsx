// About.js
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">About Us</h1>

      <motion.div
        className="mb-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Our mission is to provide exceptional services that meet the needs of our clients. We strive for excellence in every project we undertake and are committed to building lasting relationships with our clients and partners.
        </p>
      </motion.div>

      <motion.div
        className="mb-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Integrity: We adhere to the highest standards of integrity in all our actions.</li>
          <li>Innovation: We strive to innovate and improve continuously.</li>
          <li>Customer Satisfaction: We put our customers at the heart of everything we do.</li>
        </ul>
      </motion.div>

      <motion.div
        className="mb-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Story</h2>
        <p className="text-lg text-gray-700">
          Founded in 2020, our company has grown rapidly, thanks to the trust and support of our clients. Our team comprises dedicated professionals who are passionate about their work. We have worked on numerous projects across various sectors and have established a reputation for excellence.
        </p>
      </motion.div>

      <motion.div
        className="mb-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-gray-700 mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mb-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Achievements</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Over 500 successful projects delivered.</li>
          <li>Awarded "Best Service Provider" in 2022.</li>
          <li>Expanded our services to 5 different cities.</li>
        </ul>
      </motion.div>
    </div>
  );
};

// Sample data for team members
const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'CEO',
    bio: 'Alice is an experienced leader with over 10 years in the industry.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'CTO',
    bio: 'Bob specializes in technology and innovation, ensuring we stay ahead.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Carol Williams',
    role: 'Marketing Director',
    bio: 'Carol drives our marketing efforts and customer engagement strategies.',
    image: 'https://via.placeholder.com/150',
  },
  // Add more team members as needed
];

export default About;
