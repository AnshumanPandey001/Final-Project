import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import FundraiserCards from "../Components/FundraiserCards"; 
import ReviewSection from "./Review";

const images = [
  "https://images.pexels.com/photos/29421579/pexels-photo-29421579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://img.freepik.com/free-photo/health-insurance-copyspace-background-idea-concept_1421-81.jpg?t=st=1738909392~exp=1738912992~hmac=b0da182aaa06c08e396fba6de3b4655a02c2b945fbf8ee778795e73a67ff2413&w=900",
  "https://images.pexels.com/photos/18148936/pexels-photo-18148936.jpeg",
  "https://images.pexels.com/photos/1667240/pexels-photo-1667240.jpeg",
  "https://images.pexels.com/photos/6010930/pexels-photo-6010930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://img.freepik.com/free-photo/arrangement-education-growth-concept_23-2148721288.jpg?t=st=1738908919~exp=1738912519~hmac=e43d53e0b420d38f344edf1cedd732bbea6deb5a3dd091039dbb3ea6ddc75c5c&w=1060",
  "https://images.pexels.com/photos/18107024/pexels-photo-18107024/free-photo-of-an-old-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

const Home = ({ cards }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  // Auto-change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1F7FA] to-[#ffffff] flex flex-col">
      {/* Hero Section with Image Slider */}
      <header className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images[currentImageIndex]}
            alt="Fundraiser"
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 focus:outline-none z-10"
        >
          &#9664;
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 focus:outline-none z-10"
        >
          &#9654;
        </button>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-40 px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate__animated animate__fadeIn">
            Support a Cause, Make a Difference
          </h1>
          <p className="text-lg mb-8 max-w-2xl">
            Explore various fundraising campaigns and contribute to the cause that matters to you.
          </p>

          {/* Call-to-Action Button */}
          <button
            onClick={() => navigate("/start-fundraiser")} // Navigate to the Fundraisers page
            className="bg-white text-[#1963A0] px-8 py-4 rounded-full font-bold shadow-md hover:bg-[#1963A0] hover:text-white transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Fundraiser Cards Section */}
      <section className="py-12 bg-white shadow-lg">
         {/* Search Box for Mobile View */}
      <div className="block sm:hidden py-4 px-6 bg-white shadow-lg mb-8">
        <input
          type="text"
          placeholder="Search Fundraisers..."
          className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#1963A0]"
        />
      </div>
        <h2 className="text-3xl font-semibold text-center text-[#1963A0] mb-8">
          Explore Fundraisers
        </h2>

        <div className="container mx-auto px-4">
          <FundraiserCards cards={cards} />
        </div>
      </section>
      
      {/* Review Section */}
      <ReviewSection />
    </div>
  );
};

export default Home;
