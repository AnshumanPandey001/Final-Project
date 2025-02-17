import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FundraiserDetails = ({ cards }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const fundraiser = cards[index];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!fundraiser) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold">Fundraiser not found</h2>
        <button
          className="bg-[#1963A0] text-white px-6 py-3 mt-4 rounded-full"
          onClick={() => navigate("/home")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const imagesLength = fundraiser.displayPhotos.length;

  // ✅ Fix: Always call useEffect in the same order
  useEffect(() => {
    let interval;
    // Only start interval if there are multiple images
    if (imagesLength > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
      }, 2000); // Auto-switch images every 2 seconds
    }

    // Cleanup interval on unmount or when imagesLength changes
    return () => clearInterval(interval);
  }, [imagesLength]); // Depend only on imagesLength

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesLength) % imagesLength);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/home")}
        className="text-[#1963A0] mb-4"
      >
        &larr; Back to Home
      </button>

      {/* Fundraiser Image Slideshow */}
      <div className="relative w-full h-72">
        {imagesLength > 0 ? (
          <>
            <img
              src={typeof fundraiser.displayPhotos[currentImageIndex] === "string"
                ? fundraiser.displayPhotos[currentImageIndex]
                : URL.createObjectURL(fundraiser.displayPhotos[currentImageIndex])}
              alt="Fundraiser"
              className="w-full h-72 object-cover rounded-lg transition-opacity duration-500 ease-in-out"
            />

            {/* Navigation Buttons (Show only if multiple images) */}
            {imagesLength > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                >
                  &#9664;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                >
                  &#9654;
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-72 bg-gray-300 flex items-center justify-center rounded-lg">
            <span className="text-white font-semibold">No Image</span>
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mt-6">{fundraiser.fundraiserName}</h2>
      <p className="text-lg text-[#14b8a6] mt-2">{fundraiser.causeType}</p>

      {/* Fundraiser details */}
      <div className="mt-6">
        <p className="font-semibold mt-4">Fundraiser Name:</p>
        <p>{fundraiser.fundraiserName}</p>

        <p className="font-semibold mt-4">Beneficiary Name:</p>
        <p>{fundraiser.name}</p>

        <p className="font-semibold mt-4">Age:</p>
        <p>{fundraiser.age}</p>

        <p className="font-semibold mt-4">Location:</p>
        <p>{fundraiser.location}</p>

        <p className="font-semibold mt-4">Amount Raised:</p>
        <p>${fundraiser.amount}</p>

        <p className="font-semibold mt-4">Story:</p>
        <p>{fundraiser.story}</p>
      </div>
    </div>
  );
};

export default FundraiserDetails;
