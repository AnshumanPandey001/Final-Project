import React from "react";
import FundraiserCards from "../Components/FundraiserCards"; // Import FundraiserCards to display the cards

const Home = ({ cards }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1F7FA] to-[#ffffff] flex flex-col">
      {/* Hero Section */}
      <header className="flex-grow bg-[#1963A0] py-16 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Support a Cause, Make a Difference
        </h1>
        <p className="text-lg mb-8 px-4 sm:px-8 max-w-2xl mx-auto">
          Explore various fundraising campaigns and contribute to the cause that matters to you.
        </p>

        {/* Call-to-Action Button */}
        <div className="flex justify-center">
          <button className="bg-white text-[#1963A0] px-8 py-4 rounded-full font-bold shadow-md hover:bg-[#1963A0] hover:text-white transition duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </header>

      {/* Fundraiser Cards Section */}
      <section className="py-12 bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#1963A0] mb-8">
          Explore Fundraisers
        </h2>

        {/* Display Fundraiser Cards */}
        <div className="container mx-auto px-4">
          <FundraiserCards cards={cards} />
        </div>
      </section>

      
    </div>
  );
};

export default Home;
