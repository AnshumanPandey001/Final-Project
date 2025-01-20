import React from "react";

const Donate = () => {
  return (
    <main className="min-h-screen flex items-center justify-center py-8 bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-8 text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold text-indigo-600 mb-6">Donate</h2>
        <p className="text-lg text-gray-600 mb-6">
          We're thrilled by your willingness to help! Our fundraiser will be
          live soon.
        </p>
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <p className="text-xl font-semibold text-gray-800">
            Stay tuned and make a difference with your generosity! 🌟
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Your support is what drives us forward. Thank you for believing in us!
        </p>
        <div className="mt-8">
          <a
            href="/Home"
            className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
};

export default Donate;
