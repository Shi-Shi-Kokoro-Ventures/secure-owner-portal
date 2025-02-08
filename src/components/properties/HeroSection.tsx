
import React from "react";

export const HeroSection = () => {
  return (
    <div className="relative h-[400px] bg-gradient-to-r from-gray-900 to-gray-600 bg-gradient-to-r">
      <div className="absolute inset-0 bg-black/40" />
      <img
        src="/lovable-uploads/0c444ea3-9b98-43c4-9d34-0d162072adf2.png"
        alt="Luxury interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Home</h1>
        <p className="text-xl text-gray-200 max-w-2xl text-center">
          Explore our curated selection of premium properties available for rent
        </p>
      </div>
    </div>
  );
};
