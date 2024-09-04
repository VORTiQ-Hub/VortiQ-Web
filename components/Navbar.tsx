import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => (
  <nav className="bg-white shadow-md py-4">
    <ul className="flex justify-center space-x-8">
      <li><Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold">Home</Link></li>
      <li><Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold">About</Link></li>
      <li><Link href="/services" className="text-gray-700 hover:text-blue-600 font-semibold">Services</Link></li>
      <li><Link href="/contact" className="text-gray-700 hover:text-blue-600 font-semibold">Contact</Link></li>
    </ul>
  </nav>
);

export default Navbar;
