import React from 'react';
import { Link, useLoaderData } from 'react-router';

const ProductDetails = () => {
    const product =useLoaderData()
    console.log(product)

    const {title,
    image,
    price_min,
    price_max,
    category,
    condition,
    usage,
    description,
    seller_name,
    seller_image,
    seller_contact,
    email,
    location,
    created_at,
    status,} =product
    return (
       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image  & Description*/}
      <div>
        <img src={image} alt={title} className="rounded-2xl shadow-md" />
            <div className="border-t pt-3">
          <h2 className="font-semibold text-lg mb-2">Product Description</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Condition:</span> {condition}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Usage:</span> {usage}
          </p>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>

      {/* Details */}
      <div>
        <Link to="/" className="text-sm text-blue-500 underline mb-2 inline-block">
          ← Back To Products
        </Link>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-green-600 font-semibold mb-3">
          ${price_min} - {price_max}
        </p>
        <p className="text-gray-500 mb-4">Category: {category}</p>

    

        <div className="border-t pt-3 mt-4">
          <h2 className="font-semibold text-lg mb-2">Seller Information</h2>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={seller_image}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{seller_name}</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
          <p className="text-gray-600"> Location: {location}</p>
          <p className="text-gray-600"> Contact: {seller_contact}</p>
          <p className="text-sm mt-2">Status: <span className="text-yellow-600 font-semibold">{status}</span></p>
          <p className="text-sm text-gray-500 mt-1">
            Posted: {new Date(created_at).toLocaleDateString()}
          </p>
        </div>

        <button className="btn btn-primary w-full mt-5">
          I Want Buy This Product
        </button>
      </div>
    </div>
    );
};

export default ProductDetails;