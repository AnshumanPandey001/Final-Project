import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FundraiserDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [fundraiser, setFundraiser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        const response = await fetch(`http://localhost:5271/api/Fundraiser/${index}`);
        
        if (!response.ok) {
          throw new Error("Fundraiser not found");
        }
        
        const data = await response.json();
        
        if (data.displayPhotosPath) {
          data.displayPhotos = data.displayPhotosPath
            .split(",")
            .map(path => `http://localhost:5271/${path.replace(/\\/g, "/")}`);
        } else {
          data.displayPhotos = [];
        }
  
        console.log("Processed Fundraiser Data:", data);
        setFundraiser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFundraiser();
  }, [index]);

  useEffect(() => {
    if (!fundraiser || !fundraiser.displayPhotos || fundraiser.displayPhotos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fundraiser.displayPhotos.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [fundraiser]);

  if (loading) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold">Error: {error}</h2>
        <button
          className="bg-[#1963A0] text-white px-6 py-3 mt-4 rounded-full"
          onClick={() => navigate("/home")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const images = fundraiser?.displayPhotos || [];
  const imagesLength = images.length;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imagesLength);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button onClick={() => navigate("/home")} className="text-[#1963A0] mb-4">
        &larr; Back to Home
      </button>

      <div className="relative w-full h-72">
        {imagesLength > 0 ? (
          <>
            <img
              src={images[currentImageIndex]?.trim() || "https://via.placeholder.com/300x200.png?text=No+Image"}
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

      <div className="mt-6 space-y-4">
        <p><span className="font-semibold">Fundraiser Name:</span> {fundraiser.fundraiserName || "N/A"}</p>
        <p><span className="font-semibold">Beneficiary Name:</span> {fundraiser.beneficiaryName || "N/A"}</p>
        <p><span className="font-semibold">Age:</span> {fundraiser.age || "N/A"}</p>
        <p><span className="font-semibold">Gender:</span> {fundraiser.gender || "N/A"}</p>
        <p><span className="font-semibold">Relationship:</span> {fundraiser.relationship || "N/A"}</p>
        <p><span className="font-semibold">Residence:</span> {fundraiser.residence || "N/A"}</p>
        <p><span className="font-semibold">Mobile Number:</span> {fundraiser.mobileNumber || "N/A"}</p>
        <p><span className="font-semibold">Hospital Name:</span> {fundraiser.hospitalName || "N/A"}</p>
        <p><span className="font-semibold">Location:</span> {fundraiser.location || "N/A"}</p>
        <p><span className="font-semibold">City:</span> {fundraiser.city || "N/A"}</p>
        <p><span className="font-semibold">Amount Raised:</span> ₹{fundraiser.amount || "0"}</p>
        <p><span className="font-semibold">Story:</span> {fundraiser.story || "No story available."}</p>
      </div>

      <button
        className="bg-[#14b8a6] text-white px-6 py-3 mt-6 rounded-full w-full"
        onClick={() => navigate("/PaymentPage", { state: { fundraiser } })}
      >
        Donate
      </button>
    </div>
  );
};

export default FundraiserDetails;
