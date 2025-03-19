import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FundraiserCards = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [imageIndices, setImageIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await fetch("http://localhost:5271/api/Fundraiser");
        if (!response.ok) throw new Error(`HTTP error! Status: ₹{response.status}`);

        const data = await response.json();
        setFundraisers(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching fundraisers:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFundraisers();
  }, []);

  useEffect(() => {
    if (fundraisers.length === 0) return;

    if (imageIndices.length !== fundraisers.length) {
      setImageIndices(fundraisers.map(() => 0));
    }

    const intervals = fundraisers.map((card, index) => {
      const images = card.displayPhotosPath ? card.displayPhotosPath.split(",") : [];
      if (images.length > 1) {
        return setInterval(() => {
          setImageIndices((prev) => {
            const newIndices = [...prev];
            newIndices[index] = (newIndices[index] + 1) % images.length;
            return newIndices;
          });
        }, 2000);
      }
      return null;
    });

    return () => intervals.forEach((id) => id && clearInterval(id));
  }, [fundraisers, imageIndices]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading fundraisers...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : fundraisers.length === 0 ? (
        <p className="text-center text-gray-500">No fundraisers available.</p>
      ) : (
        fundraisers.map((card, index) => {
          const raisedAmount = card.amount ?? 0;
          const goalAmount = card.goalAmount ?? 1000;
          const raisedPercentage = Math.min((raisedAmount / goalAmount) * 100, 100).toFixed(0);
          const images = card.displayPhotosPath ? card.displayPhotosPath.split(",") : [];

          return (
            <Link
              to={`/fundraiser-details/${card.id}`}
              key={card.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image Carousel */}
              <div className="relative">
                <img
                  src={images[imageIndices[index]] || placeholderImage}
                  alt="Fundraiser"
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </div>

              {/* Progress Circle & Raised Amount */}
              <div className="p-4 flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle className="stroke-gray-200" strokeWidth="3" fill="none" cx="18" cy="18" r="16" />
                    <circle
                      className="stroke-green-500"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={Math.PI * 32}
                      strokeDashoffset={(Math.PI * 32 * (100 - raisedPercentage)) / 100}
                      strokeLinecap="round"
                      cx="18"
                      cy="18"
                      r="16"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-800">
                    {`${raisedPercentage}%`}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Raised</p>
                  <p className="font-bold text-lg text-black">₹{raisedAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Fundraiser Details */}
              <div className="p-4 bg-white rounded-b-xl">
                <h3 className="font-bold text-xl text-[#14b8a6] capitalize">
                  {card.name.length > 20 ? card.name.slice(0, 17) + "..." : card.beneficiaryName}
                </h3>
                <p className="text-gray-600 mt-2 text-sm truncate">
                  {card.story ? card.story.slice(0, 100) + "..." : "No description available"}
                </p>
                <p className="text-gray-500 text-sm mt-2 capitalize">
                  {card.location || "Location not specified"}
                </p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default FundraiserCards;
