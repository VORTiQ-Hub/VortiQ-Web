'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'

const faqs = [
  {
    question: "What is the primary purpose of this automation system?",
    answer: "This system allows users to remotely monitor and control appliances in schools, colleges, and industries, enabling off-site access to ensure devices are properly managed from anywhere."
  },
  {
    question: "Who can use this system?",
    answer: "The system is designed for users in educational and industrial settings. It supports both admins (with full control and device management capabilities) and regular users (who can monitor and control their assigned devices)."
  },
  {
    question: "Can users control appliances from any location?",
    answer: "Yes, users can control and monitor appliances remotely from any location with internet access."
  },
  {
    question: "Is internet required for this system to function?",
    answer: "Yes, internet is needed to sync data with Firebase, although local communication between ESP32 devices can function without Wi-Fi using the ESP-NOW protocol."
  },
  {
    question: "What sensors are used in the system, and what do they measure?",
    answer: "The system includes several sensors: BMP180/BMP280 for pressure and temperature, DHT22 for humidity and temperature, ACS712 for current usage, and MQ135 for air quality."
  },
  {
    question: "What is the role of the ESP32 microcontroller in the system?",
    answer: "The ESP32 is the main control unit, collecting sensor data, processing it, and either sending it to Firebase or communicating with other ESP32 modules using ESP-NOW."
  },
  {
    question: "What is ESP-NOW, and why is it used here?",
    answer: "ESP-NOW is a peer-to-peer communication protocol for ESP devices that enables them to connect and send data without Wi-Fi. This ensures reliable, low-latency communication within the organization."
  },
  {
    question: "How does the DWIN display work within the system?",
    answer: "The DWIN display serves as a local control panel for on-site users, allowing them to interact with and control appliances directly at the premises."
  },
  {
    question: "What are the different user roles in this system?",
    answer: "The system includes two main roles: admins and regular users. Admins can manage users and devices, while regular users have limited access to control only their assigned appliances."
  },
  {
    question: "How does Firebase Authentication ensure data security?",
    answer: "Firebase Authentication provides secure login with unique credentials, restricting access to authorized users only. Admins have additional permissions to manage users and devices."
  },
  {
    question: "Can an admin assign devices to users?",
    answer: "Yes, admins can assign specific appliances to users, granting each user control over only their assigned devices."
  },
  {
    question: "How does the system ensure data security and privacy?",
    answer: "By using ESP-NOW or LoRa, the system minimizes exposure to external networks. Firebase Authentication further secures user data, ensuring that only authorized users have access to specific devices."
  },
  {
    question: "Is user data stored securely in Firebase?",
    answer: "Yes, all data (appliance states, user information, access logs) is stored securely in Firebase's real-time database, which ensures safe, instant data updates."
  },
  {
    question: "What happens if there is a communication disruption within ESP-NOW or LoRa?",
    answer: "The system can send alert notifications for any detected disruptions, allowing admins to take action to resolve connectivity issues."
  },
  {
    question: "What can users monitor and control using the system?",
    answer: "Users can monitor real-time data for appliance status, temperature, humidity, air quality, and power consumption. They can also remotely turn appliances on or off."
  },
  {
    question: "Are there notifications for critical conditions?",
    answer: "Yes, the system sends alerts for critical readings, such as high power consumption or poor air quality, to notify users and admins."
  },
  {
    question: "Can the system operate over large distances?",
    answer: "For larger facilities, the system can switch from ESP-NOW to LoRa communication, which extends the range across floors or separate buildings."
  },
  {
    question: "What should I do if I can't control an appliance remotely?",
    answer: "Check your internet connection first. If the issue persists, an admin may need to verify if the ESP module for that device is functioning correctly."
  },
  {
    question: "What can I do if the DWIN display doesn't respond?",
    answer: "Ensure that the display is powered on and properly connected. If the issue continues, an admin may need to check the ESP32 module for that appliance."
  },
  {
    question: "How can I reset a device if it's not responding?",
    answer: "The system may support a reset option through the DWIN display or user portal. Admins also have the ability to troubleshoot or reset devices directly through the admin portal."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(-1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <main className="flex-grow p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
          
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                <Button
                  className="w-full p-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex justify-between items-center text-white"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
                </Button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-800">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
