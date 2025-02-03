import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FundraiserDetails = ({ cards }) => {
  const { index } = useParams(); // Get the index from the URL
  const navigate = useNavigate();

  // Find the fundraiser card using the index
  const fundraiser = cards[index];

  if (!fundraiser) {
    // Handle case where the fundraiser doesn't exist (e.g., 404)
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/home")}
        className="text-[#1963A0] mb-4"
      >
        &larr; Back to Home
      </button>

      {/* Fundraiser Image */}
      {fundraiser.displayPhotos.length > 0 ? (
        <img
          src={URL.createObjectURL(fundraiser.displayPhotos[0])}
          alt="Fundraiser"
          className="w-full h-72 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-72 bg-gray-300 flex items-center justify-center rounded-lg">
          <span className="text-white font-semibold">No Image</span>
        </div>
      )}

      <h2 className="text-3xl font-bold mt-6">{fundraiser.fundraiserName}</h2>
      <p className="text-lg text-[#14b8a6] mt-2">{fundraiser.causeType}</p>

      {/* Fundraiser details */}
      <div className="mt-6">
        {/* Display the Name and Location */}
        <p className="font-semibold mt-4">Fundraiser Name:</p>
        <p>{fundraiser.fundraiserName}</p> {/* Show Fundraiser Name */}

        <p className="font-semibold mt-4">Beneficiary Name:</p>
        <p>{fundraiser.name}</p>

        <p className="font-semibold mt-4">Age:</p>
        <p>{fundraiser.age}</p>

        <p className="font-semibold mt-4">Location:</p>
        <p>{fundraiser.location}</p> {/* Show Location */}

        <p className="font-semibold mt-4">Amount Raised:</p>
        <p>${fundraiser.amount}</p>

        <p className="font-semibold mt-4">Story:</p>
        <p>{fundraiser.story}</p>
      </div>
    </div>
  );
};

export default FundraiserDetails;
