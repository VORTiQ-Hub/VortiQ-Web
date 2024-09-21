import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 font-sans">
      <div className="container mx-auto flex flex-wrap justify-between px-10">
        <div className="footer-section mb-8 w-full md:w-1/3">
          <h3 className="text-lg mb-5">Address</h3>
          <p>123 Street, New York, USA</p>
          <p>+012 345 67890</p>
          <p>info@example.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white text-xl hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white text-xl hover:text-blue-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white text-xl hover:text-blue-400">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="text-white text-xl hover:text-blue-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section mb-8 w-full md:w-1/3">
          <h3 className="text-lg mb-5">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">Our Services</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">Terms & Condition</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-400">Support</a>
            </li>
          </ul>
        </div>

        <div className="footer-section mb-8 w-full md:w-1/3">
          <h3 className="text-lg mb-5">Newsletter</h3>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-2/3 rounded-l-lg border-none"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
              SignUp
            </button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom border-t border-gray-700 text-center py-3">
        <p>&copy; Your Site Name, All Right Reserved.</p>
        <p>
          Designed By <a href="#" className="hover:text-blue-400">HTML Codex</a>,
          Distributed By <a href="#" className="hover:text-blue-400">ThemeWagon</a>
        </p>
      </div>
    </footer>
  );
};
