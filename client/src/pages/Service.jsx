import React from 'react';
import { useAuth } from '../store/Auth';

const Service = () => {
  const { services } = useAuth();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-12 drop-shadow-md">
          Our Services
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300 border border-blue-100"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {service.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>

              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Category:</span> {service.category}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Duration:</span> {service.duration}
              </div>

              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm shadow-sm">
                  ₹{service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
