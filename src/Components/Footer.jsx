import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Home Services</h3>
          <p className="text-gray-300">
            Your trusted partner for a wide range of home services, including cleaning, plumbing, electrical work, gardening, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-yellow-500 transition-colors duration-300">Home</a>
            </li>
            <li>
              <a href="#services" className="hover:text-yellow-500 transition-colors duration-300">Services</a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-500 transition-colors duration-300">About Us</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-500 transition-colors duration-300">Contact Us</a>
            </li>
            <li>
              <a href="#profile" className="hover:text-yellow-500 transition-colors duration-300">Profile</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884l7.197 7.197 7.197-7.197a1.5 1.5 0 00-.354-2.44L11.528.952a1.5 1.5 0 00-1.106 0L2.357 3.445a1.5 1.5 0 00-.354 2.44z" />
              </svg>
              123 Home Street, City, Country
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.707 20.293l-6.39-6.39A9.073 9.073 0 0018 10C18 4.477 13.523 0 8 0S-2 4.477-2 10s4.477 10 10 10a9.073 9.073 0 003.903-.683l6.39 6.39a1 1 0 001.414-1.414zM4 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
              </svg>
              +123 456 7890
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.003 5.884l7.197 7.197 7.197-7.197a1.5 1.5 0 00-.354-2.44L11.528.952a1.5 1.5 0 00-1.106 0L2.357 3.445a1.5 1.5 0 00-.354 2.44z" />
              </svg>
              info@homeservices.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Home Services. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#facebook" className="text-yellow-500 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.896 2H5.102A3.103 3.103 0 002 5.102v13.795A3.103 3.103 0 005.102 22H12V14.008h-2.27v-2.733H12v-2.029c0-2.268 1.384-3.53 3.426-3.53.975 0 1.83.072 2.075.104v2.406h-1.424c-1.122 0-1.339.533-1.339 1.315v1.735h2.679l-.349 2.733H15.74V22h3.156A3.104 3.104 0 0022 18.896V5.102A3.103 3.103 0 0018.896 2z" />
            </svg>
          </a>
          <a href="#twitter" className="text-yellow-500 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.633 7.997c.013.2.013.4.013.6 0 6.147-4.675 13.224-13.224 13.224-2.625 0-5.072-.768-7.133-2.08a9.258 9.258 0 006.809-1.877c-2.278-.044-4.195-1.546-4.857-3.604.318.056.63.088.954.088.467 0 .921-.065 1.355-.183-2.356-.476-4.132-2.56-4.132-5.057 0-.022 0-.044.002-.066a4.998 4.998 0 002.265.634 4.944 4.944 0 01-1.54-6.596A13.991 13.991 0 0012.1 6.91a5.485 5.485 0 01-.122-1.126c0-2.737 2.226-4.963 4.964-4.963 1.428 0 2.715.604 3.622 1.57A9.698 9.698 0 0023.423 2c-.396 1.234-1.236 2.258-2.32 2.91A9.8 9.8 0 0024 4.87a10.334 10.334 0 01-2.367 2.127z" />
            </svg>
          </a>
          <a href="#linkedin" className="text-yellow-500 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.23 0H1.771C.794 0 0 .774 0 1.729v20.542C0 23.226.794 24 1.771 24H22.23C23.207 24 24 23.226 24 22.271V1.729C24 .774 23.207 0 22.23 0zM7.106 20.452H3.585V9h3.521v11.452zM5.346 7.769c-1.123 0-2.032-.925-2.032-2.065 0-1.139.91-2.065 2.032-2.065 1.122 0 2.032.926 2.032 2.065 0 1.14-.91 2.065-2.032 2.065zm15.106 12.683h-3.524v-5.497c0-1.31-.028-3.002-1.83-3.002-1.832 0-2.114 1.43-2.114 2.908v5.591h-3.524V9h3.379v1.561h.048c.471-.892 1.624-1.83 3.341-1.83 3.573 0 4.232 2.352 4.232 5.415v6.306z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
