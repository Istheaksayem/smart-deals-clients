import React from 'react';
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-pink-100 via-purple-50 to-cyan-100">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Deal Your <span className="text-primary">Products</span><br />
            In A <span className="text-primary">Smart</span> Way!
          </h1>
          <p className="py-4 text-gray-600">
            SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
          </p>

          {/* Search Box */}
          <div className="flex justify-center mb-6">
            <div className="join w-full max-w-md shadow-lg">
              <input
                className="input input-bordered join-item w-full"
                placeholder="Search for Products, Categories..."
              />
              <button className="btn join-item bg-purple-600 hover:bg-purple-700 text-white">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button className="btn btn-primary text-white rounded-xl">
              Watch All Products
            </button>
            <button className="btn btn-outline border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl">
              Post an Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
