import React from 'react'
import { NavLink } from 'react-router-dom'
import { Analytics } from '../components/Analytics'
import { useAuth } from '../store/Auth'

const About = () => {
  const {user} = useAuth()
  return (
    <>
      <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12">
        <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <div className="space-y-4">
            <p className="text-xl text-gray-700">
              Welcome,
              <span className="font-semibold text-blue-600">
                {user ? ` ${user.username}` : ``}
              </span>{' '}
              to our website
            </p>

            <h1 className="text-4xl font-bold text-gray-900">Why Choose Us?</h1>

            <ul className="space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Expertise:</strong> Our team consists of experienced IT
                professionals who stay up-to-date with the latest industry
                trends.
              </li>
              <li>
                <strong>Customization:</strong> We tailor solutions to your
                business's unique needs and goals.
              </li>
              <li>
                <strong>Customer-Centric Approach:</strong> Your satisfaction is
                our priority. We offer dedicated support for your IT concerns.
              </li>
              <li>
                <strong>Affordability:</strong> We offer competitive pricing
                without compromising service quality.
              </li>
              <li>
                <strong>Reliability:</strong> Count on us for 24/7 IT
                reliability and support.
              </li>
            </ul>

            <div className="flex gap-4 pt-4">
              <NavLink to="/contact">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Connect Now
                </button>
              </NavLink>
              <NavLink to="/services">
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                Learn More
              </button>
              </NavLink>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <img
              src="/images/about.png"
              alt="coding buddies"
              className="w-full max-w-sm object-contain"
            />
          </div>
        </section>
      </main>

      <Analytics/>
    </>
  )
}

export default About
