import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FundraiserDetails = ({ cards }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Fix: fundraiser abhi yahan fetch karo, `if (!fundraiser)` ke andar nahi
  const fundraiser = cards[index] || null;

  const images = fundraiser?.displayPhotos || [];
  const imagesLength = images.length;

  // ✅ Fix: Hook hamesha same order me chalega, koi bhi if/return ke andar nahi hai
  useEffect(() => {
    if (imagesLength <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
    }, 2000);

    return () => clearInterval(interval);
  }, [imagesLength]); // ✅ Dependency correct hai

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

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imagesLength);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button onClick={() => navigate("/home")} className="text-[#1963A0] mb-4">
        &larr; Back to Home
      </button>

      {/* Fundraiser Image Slideshow */}
      <div className="relative w-full h-72">
        {imagesLength > 0 ? (
          <>
            <img
              src={typeof images[currentImageIndex] === "string"
                ? images[currentImageIndex]
                : URL.createObjectURL(images[currentImageIndex])}
              alt="Fundraiser"
              className="w-full h-72 object-cover rounded-lg transition-opacity duration-500 ease-in-out"
            />

            {imagesLength > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                  &#9664;
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
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

      {/* Fundraiser Details */}
      <div className="mt-6 space-y-4">
        <p><span className="font-semibold">Fundraiser Name:</span> {fundraiser.fundraiserName || "N/A"}</p>
        <p><span className="font-semibold">Beneficiary Name:</span> {fundraiser.beneficiaryName || "N/A"}</p>
        <p><span className="font-semibold">Age:</span> {fundraiser.age || "N/A"}</p>
        <p><span className="font-semibold">Location:</span> {fundraiser.location || "N/A"}</p>
        <p><span className="font-semibold">Amount Raised:</span> ${fundraiser.amount || "0"}</p>
        <p><span className="font-semibold">Story:</span> {fundraiser.story || "No story available."}</p>
      </div>
    </div>
  );
};

export default FundraiserDetails;
