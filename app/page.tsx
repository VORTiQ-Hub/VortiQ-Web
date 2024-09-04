import React from 'react';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';

const services = [
  { title: 'Solar Panels', description: 'Efficient solar panel installations', icon: '/images/solar-panel.png' },
  { title: 'Energy Audits', description: 'Comprehensive energy audits for optimization', icon: '/images/energy-audit.png' },
  { title: 'Battery Storage', description: 'Reliable energy storage solutions', icon: '/images/battery.png' },
];

export default function Home() {
    return (    
    <div className="bg-gray-100 min-h-screen">l
        <Header />
        <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
            ))}
        </div>
        </section>
    </div>
    );
}
