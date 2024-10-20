import React from 'react';

const Header: React.FC = () => (
  <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center py-18 px-5 md:px-0 min-h-95 flex justify-center items-center flex-col ">
    <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold mt-20 ">Energy Management Solutions</h1>
    <p className="mt-4 text-xl">Optimized services for efficient energy usage</p>
    <p className="mt-4 text-lg max-w-4xl mb-10">
      Take control of your institute’s energy consumption with our advanced IoT automation system. Enjoy unified control over lighting, fans, and computer systems, customize automation based on your preferences, monitor energy usage in real-time, and access it all remotely via your mobile device.
    </p>
  </header>
);

export default Header;

