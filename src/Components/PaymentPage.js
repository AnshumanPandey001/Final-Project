import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { QRCodeCanvas } from "qrcode.react";

const stripePromise = loadStripe("your_publishable_key_here");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate(); // For navigation
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [upiQRCode, setUpiQRCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card"); // Toggle between card and UPI
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    // Check if the user is logged in
    useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (!userName) {
            setIsLoggedIn(false); // User is not logged in
        } else {
            setIsLoggedIn(true); // User is logged in
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!amount || isNaN(amount) || amount <= 0) {
            setError("Please enter a valid amount.");
            setLoading(false);
            return;
        }

        if (paymentMethod === "card") {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                const response = await fetch("http://localhost:5000/api/payments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paymentMethodId: paymentMethod.id,
                        amount: amount * 100, // Convert to cents
                    }),
                });

                const paymentResult = await response.json();
                if (paymentResult.success) {
                    setSuccess(true);
                } else {
                    setError(paymentResult.message);
                }
                setLoading(false);
            }
        }
    };

    const handleUPIPayment = () => {
        setUpiQRCode(
            `upi://pay?pa=your-merchant-id@upi&pn=Merchant+Name&mc=0000&tid=12345&tr=123456789&tn=Payment+for+services&am=${amount}&cu=INR`
        );
    };

    // If user is not logged in, show login message
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Login Required
                    </h2>
                    <p className="text-gray-600">
                        Please log in to make a payment.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    // If user is logged in, show the payment form
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Support Our Cause
                </h2>

                {/* Amount Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Donation Amount (INR)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                {/* Payment Method Toggle */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => {
                            setPaymentMethod("card");
                            setUpiQRCode("");
                        }}
                        className={`px-4 py-2 rounded-full font-medium transition ${
                            paymentMethod === "card"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        Credit/Debit Card
                    </button>
                    <button
                        onClick={() => {
                            setPaymentMethod("upi");
                            handleUPIPayment();
                        }}
                        className={`px-4 py-2 rounded-full font-medium transition ${
                            paymentMethod === "upi"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        UPI (Google Pay)
                    </button>
                </div>

                {/* Card Payment */}
                {paymentMethod === "card" && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Card Details
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#424770",
                                                "::placeholder": { color: "#aab7c4" },
                                            },
                                            invalid: { color: "#9e2146" },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!stripe || loading || !amount}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : `Pay ₹${amount || "0"}`}
                        </button>
                    </form>
                )}

                {/* UPI Payment */}
                {paymentMethod === "upi" && upiQRCode && (
                    <div className="space-y-4 text-center">
                        <p className="text-sm text-gray-600">
                            Scan this QR code with your UPI app:
                        </p>
                        <div className="flex justify-center">
                            <QRCodeCanvas value={upiQRCode} size={200} level="H" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                            Amount: ₹{amount}
                        </p>
                    </div>
                )}

                {/* Feedback Messages */}
                {error && (
                    <p className="text-red-600 text-sm text-center">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 text-sm font-semibold text-center">
                        Thank you! Your payment was successful.
                    </p>
                )}
            </div>
        </div>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;