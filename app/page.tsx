"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import hero from "@/public/img/hero.png";
import user from "@/public/img/user.svg";
import flex from "@/public/img/flex.svg";
import archi from "@/public/img/archi.svg";
import remoted from "@/public/img/remoted.svg";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer/Footer";
import monitoring from "@/public/img/monitoring.svg";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const features = [
  { 
    title: "Remote Control", 
    description: "Manage appliances from anywhere in the world",
    icon: remoted
  },
  { 
    title: "Real-Time Monitoring", 
    description: "Check device status and power usage instantly",
    icon: monitoring
  },
  { 
    title: "User Management", 
    description: "Admins can easily add and manage users and devices",
    icon: user
  },
  { 
    title: "Flexible Communication", 
    description: "Uses ESP-NOW or LoRa for reliable device communication",
    icon: flex
  },
]

const benefits = [
  "Reduce energy waste by remotely turning off forgotten devices",
  "Improve safety with real-time monitoring of air quality and temperature",
  "Increase efficiency with centralized control of all appliances",
  "Enhance security with detailed access logs and user permissions",
]

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <Image
          src={hero}
          alt="IoT Automation System"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">IoT-Based Unified Automation System for Institutes</h1>
          <p className="text-xl mb-8">Empower your institution with smart, efficient, and secure appliance control</p>
          <Link href="/FAQ">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-center gap-4">
                    <Image src={feature.icon} alt={feature.title} width={100} height={100} className="bg-gray-500 rounded-xl" />
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits for Institutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={archi}
              alt="System Architecture"
              width={8000}
              height={8000}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</span>
                <p className="text-gray-300">Devices communicate using ESP-NOW or LoRa protocols for reliable, low-latency data exchange.</p>
              </li>
              <li className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</span>
                <p className="text-gray-300">A central ESP module connects to Firebase, securely relaying data to the cloud database.</p>
              </li>
              <li className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</span>
                <p className="text-gray-300">Users access the system through a web application, with separate portals for admins and regular users.</p>
              </li>
              <li className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</span>
                <p className="text-gray-300">Real-time updates allow instant control and monitoring of connected appliances.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Modernize Your Institution?</h2>
          <p className="text-xl mb-8">Join the future of smart, efficient, and secure appliance management.</p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Request a Demo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}