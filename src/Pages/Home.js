import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-grow flex items-center justify-center">
        {/* Main Content */}
        <section className="text-center p-6 bg-white bg-opacity-80 rounded-lg shadow-lg mx-4 my-8 max-w-3xl w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn">
          <h1 className="text-3xl font-bold text-[#1963A0] mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            Explore various fundraising campaigns and contribute to the cause that matters to you.
          </h1>

          {/* Button styled with your provided CSS */}
          <button className="bg-white text-[#1963A0] px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#1963A0] hover:text-white transition duration-300">
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
