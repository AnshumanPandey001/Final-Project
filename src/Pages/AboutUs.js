import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
        {/* Left Content Section */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What we do?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our crowdfunding platform is designed to connect innovators and supporters, making fundraising simple and accessible. With a user-friendly interface, secure transactions, and multiple crowdfunding models, we empower individuals and organizations to bring their ideas to life. Our commitment to transparency and efficiency ensures that every contribution makes a meaningful impact.
          </p>
        </div>
        
        {/* Right Video Section */}
        <div className="md:w-1/2 p-6 flex justify-center">
          <video controls className="w-full rounded-lg shadow-lg border border-gray-300">
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
