import React, { useState, useEffect } from 'react'
import { useAuth } from '../store/Auth'
import { toast } from 'react-toastify'

const Contact = () => {

  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: ""
  })

  //Geting user data
  const [userData, setUserData] = useState(true)
  const { user, API } = useAuth()

  // Inside your component
  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: ""
      });
      setUserData(false); // Prevent it from running again
    }
  }, [userData, user]);


  const handleContactInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setContact({
      ...contact,
      [name]: value
    })
  }

  const handleContactForm = async (e) => {
  e.preventDefault();

  //connecting with backend
  try {
    const response = await fetch(`${API}/form/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    if (response.ok) {
      toast.success("Message sent successfully");
      setContact({
        username: "",
        email: "",
        message: ""
      });
    } else {
      toast.error("Error occurred while sending message");
    }
  } catch (error) {
    console.error("Contact Error:", error);
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <>
      <section className="bg-gray-200 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 capitalize">Contact Us</h1>
        </div>

        {/* Main Grid */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Image */}
          <div className="flex justify-center">
            <img
              src="/images/support.png"
              alt="We are always ready to help"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleContactForm} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
              <div>
                <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleContactInput}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleContactInput}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  required
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleContactInput}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg border border-gray-300 shadow-md"
          ></iframe>
        </div>
      </section>
    </>
  )
}

export default Contact
