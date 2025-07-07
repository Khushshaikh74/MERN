import React from 'react'
import {Analytics} from '../components/Analytics'

const Home = () => {
  return (
    <>
      {/* Hero Section 1 */}
      <main className="bg-gray-50">
        <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div className="space-y-4">
            <p className="text-lg text-blue-600 font-medium">
              We are the World Best IT Company
            </p>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to Code Connect
            </h1>
            <p className="text-gray-700 leading-relaxed">
              Are you ready to take your business to the next level with
              cutting-edge IT solutions? Look no further! At Code Connect, we
              specialize in providing innovative IT services and solutions
              tailored to meet your unique needs.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="/contact">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Connect Now
                </button>
              </a>
              <a href="/services">
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Learn More
                </button>
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            <img
              src="/images/home.png"
              alt="coding together"
              className="w-full max-w-sm object-contain"
            />
          </div>
        </section>
      </main>

      {/* Analytics Section */}
      <Analytics/>

      {/* Hero Section 2 */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left image */}
          <div className="flex justify-center">
            <img
              src="/images/design.png"
              alt="coding together"
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* Right content */}
          <div className="space-y-4">
            <p className="text-lg text-blue-600 font-medium">
              We are here to help you
            </p>
            <h1 className="text-4xl font-bold text-gray-900">Get Started Today</h1>
            <p className="text-gray-700 leading-relaxed">
              Ready to take the first step towards a more efficient and secure IT
              infrastructure? Contact us today for a free consultation and let's
              discuss how Code Connect can help your business thrive in the
              digital age.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="/contact">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Connect Now
                </button>
              </a>
              <a href="/services">
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
