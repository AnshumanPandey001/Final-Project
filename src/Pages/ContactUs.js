import React, { useState, useEffect } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // To control the popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulating form submission
      console.log("Form Submitted", formData);
      setSuccess("Thank you for reaching out! We'll get back to you soon.");
      setError("");
      setFormData({ name: "", email: "", message: "" });
      setShowPopup(true); // Show the popup when form is submitted
    } else {
      setError("All fields are required.");
      setSuccess("");
    }
  };

  // Fade-in effect for the popup success message
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false); // Hide the popup after 5 seconds
      }, 2000); // Popup stays for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <main className="min-h-screen flex items-center justify-center py-8 bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-8">
        <h2 className="text-4xl font-bold text-indigo-600 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 text-center mb-6">
          Have questions? Fill out the form below, and we'll get back to you as
          soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              className="block text-lg font-semibold text-gray-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              className="block text-lg font-semibold text-gray-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              className="block text-lg font-semibold text-gray-700 mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              placeholder="Write your message here"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Success/Error Messages */}
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs mx-auto animate__animated animate__fadeIn animate__delay-1s">
            <p className="text-center text-green-500 font-semibold">{success}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContactUs;
