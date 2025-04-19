import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FundraiserDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [fundraiser, setFundraiser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch fundraiser details
        const fundraiserResponse = await fetch(
          `http://localhost:5271/api/Fundraiser/${index}`
        );

        if (!fundraiserResponse.ok) {
          throw new Error("Failed to fetch fundraiser");
        }

        const fundraiserData = await fundraiserResponse.json();

        // Process images
        if (fundraiserData.displayPhotosPath) {
          fundraiserData.displayPhotos = fundraiserData.displayPhotosPath
            .split(",")
            .map(path => `http://localhost:5271/${path.replace(/\\/g, "/")}`);
        } else {
          fundraiserData.displayPhotos = [];
        }

        // Fetch donation total
        const donationsResponse = await fetch(
          `http://localhost:5271/api/Payments/fundraiser/${index}`
        );

        let total = 0;
        if (donationsResponse.ok) {
          const donationsData = await donationsResponse.json();
          total = Array.isArray(donationsData)
            ? donationsData.reduce((sum, payment) => sum + (payment.amount || 0), 0)
            : 0;
        }

        setFundraiser(fundraiserData);
        setDonationTotal(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [index]);

  // Image carousel effect
  useEffect(() => {
    if (!fundraiser?.displayPhotos || fundraiser.displayPhotos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % fundraiser.displayPhotos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fundraiser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const images = fundraiser?.displayPhotos || [];
  const goalAmount = fundraiser?.amount || 0;
  const raisedPercentage = Math.min((donationTotal / goalAmount) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Fundraisers
      </button>

      {/* Image Carousel */}
      <div className="relative rounded-lg overflow-hidden shadow-md mb-6">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]?.trim() || "https://via.placeholder.com/800x450?text=No+Image"}
              alt={fundraiser.fundraiserName}
              className="w-full h-64 md:h-80 object-cover"
              onError={(e) => e.target.src = "https://via.placeholder.com/800x450?text=Image+Not+Available"}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  ❮
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  ❯
                </button>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1}/{images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      {/* Fundraiser Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {fundraiser.fundraiserName}
          </h1>
          <p className="text-teal-600 font-medium">{fundraiser.causeType}</p>
        </div>

        {/* Donation Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Raised: ₹{donationTotal.toLocaleString()}</span>
            <span className="text-gray-600">Goal: ₹{goalAmount.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 text-right">
            {raisedPercentage.toFixed(1)}% of goal reached
          </p>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg border-b pb-1">Beneficiary Details</h3>
            <p><span className="font-medium">Name:</span> {fundraiser.beneficiaryName || "N/A"}</p>
            <p><span className="font-medium">Age:</span> {fundraiser.age || "N/A"}</p>
            <p><span className="font-medium">Gender:</span> {fundraiser.gender || "N/A"}</p>
            <p><span className="font-medium">Relationship:</span> {fundraiser.relationship || "N/A"}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg border-b pb-1">Hospital Details</h3>
            <p><span className="font-medium">Hospital:</span> {fundraiser.hospitalName || "N/A"}</p>
            <p><span className="font-medium">Location:</span> {fundraiser.location || "N/A"}</p>
            <p><span className="font-medium">City:</span> {fundraiser.city || "N/A"}</p>
            <p><span className="font-medium">Contact:</span> {fundraiser.mobileNumber || "N/A"}</p>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg border-b pb-1">Story</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {fundraiser.story || "No story provided."}
          </p>
        </div>

        <button
          onClick={() => {
            const id = parseInt(index); // Use index as fundraiserId since API uses it directly
            if (id && !isNaN(id)) {
              navigate(`/payment/${id}`, { state: { fundraiser } });
            } else {
              setError("Invalid fundraiser ID");
            }
          }}
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:bg-gray-400"
          disabled={!fundraiser || isNaN(parseInt(index))}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default FundraiserDetails;