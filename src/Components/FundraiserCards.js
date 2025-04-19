import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const FundraiserCards = () => {
    const [fundraisers, setFundraisers] = useState([]);
    const [donationTotals, setDonationTotals] = useState({});
    const [imageIndices, setImageIndices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

    // Handle navigation state from PaymentPage
    useEffect(() => {
        if (location.state?.fundraiser && location.state?.refresh) {
            const updatedFundraiser = location.state.fundraiser;
            console.log("Received updated fundraiser from navigation:", updatedFundraiser);
            setFundraisers(prev =>
                prev.map(f =>
                    f.id === updatedFundraiser.id ? { ...f, raisedAmount: updatedFundraiser.raisedAmount } : f
                ) || [updatedFundraiser] // Fallback if prev is empty
            );
            setDonationTotals(prev => ({
                ...prev,
                [updatedFundraiser.id]: parseFloat(updatedFundraiser.raisedAmount || 0),
            }));
        }
    }, [location.state]);

    // Listen for payment success events
    useEffect(() => {
        const handlePaymentSuccess = (event) => {
            const { fundraiserId, amount } = event.detail;
            console.log("Payment success event received:", { fundraiserId, amount });
            setDonationTotals(prev => ({
                ...prev,
                [fundraiserId]: (prev[fundraiserId] || 0) + amount,
            }));
        };

        window.addEventListener('paymentSuccess', handlePaymentSuccess);
        return () => window.removeEventListener('paymentSuccess', handlePaymentSuccess);
    }, []);

    // Fetch initial data with delay to allow mock updates to take precedence
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch fundraisers
                const fundraisersResponse = await fetch("http://localhost:5271/api/Fundraiser");
                if (!fundraisersResponse.ok) {
                    throw new Error(`Failed to fetch fundraisers: ${fundraisersResponse.statusText}`);
                }
                const fundraisersData = await fundraisersResponse.json();
                console.log("Fetched fundraisers data:", fundraisersData);
                setFundraisers(Array.isArray(fundraisersData) ? fundraisersData : []);

                // Fetch donations
                const totals = {};
                await Promise.all(
                    fundraisersData.map(async (fundraiser) => {
                        try {
                            const donationsResponse = await fetch(
                                `http://localhost:5271/api/Payments/fundraiser/${fundraiser.id}?t=${Date.now()}`
                            );
                            if (!donationsResponse.ok) {
                                throw new Error(`Failed to fetch donations for ${fundraiser.id}: ${donationsResponse.statusText}`);
                            }
                            const donationsData = await donationsResponse.json();
                            const total = Array.isArray(donationsData)
                                ? donationsData.reduce((sum, payment) => sum + (payment.amount || 0), 0)
                                : 0;
                            totals[fundraiser.id] = total;
                        } catch (err) {
                            console.error(`Error fetching donations for fundraiser ${fundraiser.id}:`, err);
                            totals[fundraiser.id] = 0;
                        }
                    })
                );

                // Merge with existing donation totals to preserve mock payments
                setDonationTotals(prev => ({
                    ...prev,
                    ...totals,
                }));
            } catch (err) {
                console.error("Fetch error:", err);
                setError(`Error loading fundraisers: ${err.message}`);
                // Fallback with a default fundraiser if fetch fails
                setFundraisers([{ id: "temp", title: "Test Fundraiser", amount: 3998, raisedAmount: "0", beneficiaryName: "aman", location: "andheri" }]);
            } finally {
                setLoading(false);
            }
        };

        // Delay fetch to allow navigation state to apply first
        const delay = setTimeout(fetchData, 1000);
        return () => clearTimeout(delay);
    }, []);

    // Image carousel effect
    useEffect(() => {
        if (fundraisers.length === 0) return;

        if (imageIndices.length !== fundraisers.length) {
            setImageIndices(fundraisers.map(() => 0));
        }

        const intervals = fundraisers.map((fundraiser, index) => {
            const images = fundraiser.displayPhotosPath ? fundraiser.displayPhotosPath.split(",") : [];
            if (images.length > 1) {
                return setInterval(() => {
                    setImageIndices(prev => {
                        const newIndices = [...prev];
                        newIndices[index] = (newIndices[index] + 1) % images.length;
                        return newIndices;
                    });
                }, 3000);
            }
            return null;
        });

        return () => intervals.forEach(interval => interval && clearInterval(interval));
    }, [fundraisers]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (fundraisers.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">No fundraisers available.</p>
                <Link
                    to="/create-fundraiser"
                    className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Create New Fundraiser
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {fundraisers.map((fundraiser, index) => {
                const raisedAmount = donationTotals[fundraiser.id] || parseFloat(fundraiser.raisedAmount) || 0;
                const goalAmount = fundraiser.amount || 1;
                const raisedPercentage = Math.min((raisedAmount / goalAmount) * 100, 100).toFixed(0);
                const images = fundraiser.displayPhotosPath ? fundraiser.displayPhotosPath.split(",") : [];

                return (
                    <Link
                        to={`/fundraiser-details/${fundraiser.id}`}
                        key={fundraiser.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={images[imageIndices[index]] || placeholderImage}
                                alt={fundraiser.title || "Fundraiser"}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => (e.target.src = placeholderImage)}
                            />
                            {images.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                    {imageIndices[index] + 1}/{images.length}
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative w-12 h-12">
                                    <svg className="w-full h-full" viewBox="0 0 36 36">
                                        <circle className="stroke-gray-200" strokeWidth="3" fill="none" cx="18" cy="18" r="16" />
                                        <circle
                                            className="stroke-green-500"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeDasharray="100"
                                            strokeDashoffset={100 - raisedPercentage}
                                            strokeLinecap="round"
                                            cx="18"
                                            cy="18"
                                            r="16"
                                            transform="rotate(-90 18 18)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                        {raisedPercentage}%
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Raised</span>
                                        <span>Goal</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">₹{raisedAmount.toLocaleString()}</span>
                                        <span className="font-bold text-gray-600">₹{goalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-teal-600 truncate mb-1">
                                {fundraiser.beneficiaryName || fundraiser.title || "Untitled Fundraiser"}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                {fundraiser.story || "No description available"}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="truncate">{fundraiser.location || "Location not specified"}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default FundraiserCards;