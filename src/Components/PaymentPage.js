import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const CheckoutForm = () => {
  const { fundraiserId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [upiQRCode, setUpiQRCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fundraiser, setFundraiser] = useState(null);
  const [donationTotal, setDonationTotal] = useState(0);

  const validFundraiserIds = [34, 35, 38, 36, 37, 40, 39, 41, 42, 45, 43, 44, 46, 48, 47, 49, 50, 53, 51, 52, 55, 54, 56, 58, 57, 59, 61, 60, 62, 63, 65, 64, 66, 68, 67, 69, 70, 72, 71, 74, 73, 75, 77, 76, 78, 80, 79, 81, 82, 84, 83, 85, 86, 88, 87, 90, 89, 91, 93, 92, 94, 95, 96, 97, 99, 98, 100];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userName = localStorage.getItem("userName");
        setIsLoggedIn(!!userName);

        const id = parseInt(fundraiserId);
        console.log("Fetched fundraiserId from URL:", fundraiserId, "Parsed ID:", id, "Location:", location.pathname, "Search:", location.search);

        if (!fundraiserId || isNaN(id) || !validFundraiserIds.includes(id)) {
          setError("Fundraiser ID is missing or invalid. Redirecting to fundraisers list.");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        const fundraiserResponse = await fetch(
          `http://localhost:5271/api/Fundraiser/${fundraiserId}`
        );
        if (!fundraiserResponse.ok) {
          throw new Error(`Failed to fetch fundraiser: ${fundraiserResponse.statusText}`);
        }
        const fundraiserData = await fundraiserResponse.json();
        setFundraiser(fundraiserData);

        const donationsResponse = await fetch(
          `http://localhost:5271/api/Payments/fundraiser/${fundraiserId}`
        );
        let total = 0;
        if (donationsResponse.ok) {
          const donationsData = await donationsResponse.json();
          total = donationsData.totalRaised || donationsData.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
        }
        setDonationTotal(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fundraiserId, navigate, location.pathname, location.search]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK Loaded");
    script.onerror = () => setError("Failed to load Razorpay SDK. Please check your internet connection and refresh.");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleRazorpayPayment = async (retries = 2) => {
    setLoading(true);
    setError(null);

    const id = parseInt(fundraiserId);
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      setLoading(false);
      return;
    }
    if (!id || !validFundraiserIds.includes(id)) {
      setError("Invalid fundraiser ID. Please use a valid ID.");
      setLoading(false);
      return;
    }
    if (!window.Razorpay) {
      setError("Razorpay SDK failed to load. Please refresh the page.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5271/api/Payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Amount: parseFloat(amount) * 100,
          FundraiserId: id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Razorpay order creation failed:", errorText, "Status:", response.status);
        if (retries > 0) {
          console.log(`Retrying (${retries} attempts left)...`);
          return handleRazorpayPayment(retries - 1);
        }
        throw new Error(`Failed to create Razorpay order: ${errorText} (Status: ${response.status})`);
      }

      const paymentResult = await response.json();
      console.log("Razorpay order response:", paymentResult);
      if (!paymentResult.success || !paymentResult.orderId) {
        throw new Error(paymentResult.message || "Invalid response from payment creation");
      }

      const options = {
        key: "rzp_test_fV1ncfkihewzJ3",
        amount: (parseFloat(amount) * 100).toString(),
        currency: "INR",
        name: "Crowdfunding Platform",
        description: `Donation for Fundraiser #${fundraiserId}`,
        order_id: paymentResult.orderId,
        handler: async (response) => {
          setLoading(true);
          try {
            console.log("Razorpay payment response:", response);
            const verificationResponse = await fetch(
              "http://localhost:5271/api/Payments/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  PaymentId: response.razorpay_payment_id,
                  OrderId: response.razorpay_order_id,
                  Signature: response.razorpay_signature,
                  Amount: parseFloat(amount) * 100,
                  FundraiserId: id,
                }),
              }
            );

            const verificationText = await verificationResponse.text(); // Log raw response
            console.log("Verification response (raw):", verificationText, "Status:", verificationResponse.status);
            const verificationResult = await verificationResponse.json();
            console.log("Verification response (parsed):", verificationResult);

            if (verificationResult.success) {
              setSuccess(true);
              setError(null);
              const newTotal = donationTotal + (parseFloat(amount) * 100);
              setDonationTotal(newTotal);
              window.dispatchEvent(
                new CustomEvent("paymentSuccess", {
                  detail: { fundraiserId: id, amount: parseFloat(amount) * 100 },
                })
              );
              const updatedDonations = await fetch(
                `http://localhost:5271/api/Payments/fundraiser/${fundraiserId}`
              );
              if (updatedDonations.ok) {
                const data = await updatedDonations.json();
                setDonationTotal(data.totalRaised || newTotal);
              }
            } else {
              setError(`Payment verification failed: ${verificationResult.message || verificationText}`);
              setSuccess(false);
            }
          } catch (verificationError) {
            console.error("Verification error details:", verificationError);
            setError(`Verification error: ${verificationError.message}`);
            setSuccess(false);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "Donor",
          email: localStorage.getItem("userEmail") || "donor@example.com",
          contact: localStorage.getItem("userPhone") || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError(`Payment failed: ${response.error.description}`);
        console.error("Payment failure:", response.error);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "An error occurred while processing the payment.");
      console.error("Payment error:", err);
      setLoading(false);
    }
  };

  const handleUPIPayment = () => {
    const id = parseInt(fundraiserId);
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!id || !validFundraiserIds.includes(id)) {
      setError("Invalid fundraiser ID. Please use a valid ID.");
      return;
    }

    const formattedAmount = parseFloat(amount).toFixed(2);
    setUpiQRCode(
      `upi://pay?pa=your-merchant-id@upi&pn=Crowdfunding+Platform&am=${formattedAmount}&cu=INR&tn=Donation+for+Fundraiser+${fundraiserId}`
    );

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5271/api/Payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            PaymentId: `UPI_${Date.now()}`,
            Amount: parseFloat(amount) * 100,
            FundraiserId: id,
            Status: "pending",
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error: ${errorText} (Status: ${response.status})`);
        }
        const result = await response.json();
        if (result.success) {
          setSuccess(true);
          setError(null);
          const newTotal = donationTotal + (parseFloat(amount) * 100);
          setDonationTotal(newTotal);
          window.dispatchEvent(
            new CustomEvent("paymentSuccess", {
              detail: { fundraiserId: id, amount: parseFloat(amount) * 100 },
            })
          );
          const updatedDonations = await fetch(
            `http://localhost:5271/api/Payments/fundraiser/${fundraiserId}`
          );
          if (updatedDonations.ok) {
            const data = await updatedDonations.json();
            setDonationTotal(data.totalRaised || newTotal);
          }
        } else {
          setError("UPI payment recording failed: " + result.message);
        }
      } catch (err) {
        setError("Error recording UPI payment: " + err.message);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Support Fundraiser #{fundraiserId || "N/A"}
        </h2>
        <div className="text-red-500 text-sm mb-4">{error || "Please log in to make a payment."}</div>
        <button
          onClick={() => (error ? navigate(-1) : navigate("/login"))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {error ? "Go Back" : "Login"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Support Fundraiser #{fundraiserId}
      </h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Donation Amount (INR)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
                setAmount(value);
              }
            }}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            min="1"
            step="1"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setPaymentMethod("razorpay");
              setUpiQRCode("");
              setError(null);
            }}
            className={`px-4 py-2 rounded-full font-medium ${
              paymentMethod === "razorpay"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Razorpay
          </button>
          <button
            onClick={() => {
              setPaymentMethod("upi");
              handleUPIPayment();
            }}
            className={`px-4 py-2 rounded-full font-medium ${
              paymentMethod === "upi"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            UPI (Google Pay)
          </button>
        </div>
        {paymentMethod === "razorpay" && (
          <button
            onClick={handleRazorpayPayment}
            disabled={!amount || loading || parseInt(amount) <= 0}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded mt-4 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : `Pay ₹${amount || "0"}`}
          </button>
        )}
        {paymentMethod === "upi" && upiQRCode && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Scan this QR code with your UPI app:</p>
            <div className="flex justify-center mt-2">
              <QRCodeCanvas value={upiQRCode} size={200} level="H" includeMargin={true} />
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">
              Amount: ₹{parseFloat(amount).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Note: Please contact support to confirm UPI payments.
            </p>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && (
          <div className="mt-4 text-center">
            <p className="text-green-600 text-sm font-semibold">
              Thank you! Your payment of ₹{amount} was successful.
            </p>
            <button
              onClick={() => navigate(`/fundraiser-details/${fundraiserId}`)} // Updated to return to details
              className="text-blue-600 text-sm hover:underline mt-2"
            >
              Return to Fundraiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;