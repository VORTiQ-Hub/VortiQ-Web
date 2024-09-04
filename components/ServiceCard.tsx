import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

export default ServiceCard;
