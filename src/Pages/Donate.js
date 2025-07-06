import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await fetch("http://localhost:5271/api/Fundraiser");
        if (!response.ok) throw new Error("Failed to fetch fundraisers");

        const data = await response.json();

        const processedData = data.map((fundraiser) => ({
          ...fundraiser,
          displayPhotos: fundraiser.displayPhotosPath
            ? fundraiser.displayPhotosPath
                .split(",")
                .map((path) => `http://localhost:5271/${path.trim().replace(/\\/g, "/")}`)
            : [],
        }));

        setFundraisers(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFundraisers();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl font-semibold mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold mt-6">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Fundraisers</h2>

      {fundraisers.length === 0 ? (
        <p className="text-center text-gray-600">No fundraisers available.</p>
      ) : (
        <div className="space-y-8">
          {fundraisers.map((fundraiser) => (
            <div key={fundraiser.id} className="bg-white shadow-md hover:shadow-lg transition-shadow p-6 rounded-xl flex flex-col">
              {/* Image */}
              <img
                src={fundraiser.displayPhotos[0] || "https://via.placeholder.com/300"}
                alt={fundraiser.fundraiserName}
                className="w-full h-64 object-cover rounded-xl"
              />

              {/* Fundraiser Name & Type */}
              <h3 className="text-2xl font-bold mt-4 text-gray-900">{fundraiser.fundraiserName}</h3>
              <p className="text-[#14b8a6] font-semibold text-lg"> {fundraiser.causeType} </p>

              {/* Fundraiser Details (Horizontal Row) */}
              <div className="flex flex-wrap mt-4 gap-6 text-base text-gray-700">
                <div className="flex-1"><strong>Beneficiary Name:</strong> {fundraiser.beneficiaryName || "N/A"}</div>
                <div className="flex-1"><strong>Age:</strong> {fundraiser.age || "N/A"}</div>
                <div className="flex-1"><strong>Gender:</strong> {fundraiser.gender || "N/A"}</div>
                <div className="flex-1"><strong>Relationship:</strong> {fundraiser.relationship || "N/A"}</div>
                <div className="flex-1"><strong>Residence:</strong> {fundraiser.residence || "N/A"}</div>
                <div className="flex-1"><strong>Mobile Number:</strong> {fundraiser.mobileNumber || "N/A"}</div>
                <div className="flex-1"><strong>Hospital Name:</strong> {fundraiser.hospitalName || "N/A"}</div>
                <div className="flex-1"><strong>Location:</strong> {fundraiser.location || "N/A"}</div>
                <div className="flex-1"><strong>City:</strong> {fundraiser.city || "N/A"}</div>
                <div className="flex-1"><strong>Amount Raised:</strong> ₹ {fundraiser.amount || "0"}</div>
              </div>

              {/* Story */}
              <p className="mt-4 text-gray-800"><strong>Story:</strong> {fundraiser.story || "No story available."}</p>

              {/* Donate Button */}
              <button
        className="bg-[#14b8a6] text-white px-6 py-3 mt-6 rounded-full w-full"
        onClick={() => navigate("fundraiser-details", { state: { fundraiser } })}
      >
        Donate
      </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Donate;
