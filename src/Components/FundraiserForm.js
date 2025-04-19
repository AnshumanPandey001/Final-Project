import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FundraiserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    beneficiarytype: "", 
    individualorgroup: "", 
    causetype: "", 
    displayPhotos: [], 
    name: "", 
    age: "", 
    gender: "", 
    relationship: "", 
    residence: "", 
    mobilenumber: "", 
    hospitalname: "", 
    location: "", 
    city: "",
    amount: "", 
    fundraisername: "", 
    beneficiaryname: "",
    story: "", 
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    console.log("User Name from localStorage:", userName); // Debugging

    if (userName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log("isLoggedIn:", isLoggedIn); // Debugging

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // For handling multiple photos
      if (name === "displayPhotos") {
        setFormData({
          ...formData,
          displayPhotos: [...formData.displayPhotos, ...Array.from(files)],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle delete photo
  const handleDeletePhoto = (index) => {
    const updatedPhotos = formData.displayPhotos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      displayPhotos: updatedPhotos,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userName = localStorage.getItem("userName");
    if (!userName) {
      toast.error("You must be logged in to create a fundraiser.");
      navigate("/login");
      return;
    }

    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append regular form fields to FormData
    formDataToSend.append("beneficiarytype", formData.beneficiarytype);
    formDataToSend.append("individualorgroup", formData.individualorgroup);
    formDataToSend.append("causetype", formData.causetype);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("relationship", formData.relationship);
    formDataToSend.append("residence", formData.residence);
    formDataToSend.append("mobilenumber", formData.mobilenumber);
    formDataToSend.append("hospitalname", formData.hospitalname);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("fundraisername", formData.fundraisername);
    formDataToSend.append("beneficiaryname", formData.beneficiaryname);
    formDataToSend.append("story", formData.story);

    // Check if the photos exist and append them
    if (formData.displayPhotos.length > 0) {
      formData.displayPhotos.forEach((photo) => {
        formDataToSend.append("displayPhotos", photo);
      });
    }

    // Handle the DisplayPhotosPath field (assuming it needs to be set manually after upload)
    // Note: This should ideally come from the backend response after file upload
    formDataToSend.append("DisplayPhotosPath", "uploads/your-photo-path");

    try {
      const response = await fetch("http://localhost:5271/api/Fundraiser", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        toast.error("There was an error submitting the form.");
      } else {
        toast.success("🚀 Success! Fundraiser created.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Reset the form
        setFormData({
          beneficiarytype: "",
          individualorgroup: "",
          causetype: "",
          displayPhotos: [],
          name: "",
          age: "",
          gender: "",
          relationship: "",
          residence: "",
          mobilenumber: "",
          hospitalname: "",
          location: "",
          city: "",
          amount: "",
          fundraisername: "",
          beneficiaryname: "",
          story: "",
        });

        // Reload the page after 3.5 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    } catch (error) {
      console.error("Error submitting fundraiser:", error);
      toast.error("Error occurred while submitting the fundraiser.");
    }
  };

  // If the user is not logged in, show a message and a login button
  if (!isLoggedIn) {
    return (
      <div
        className="flex items-center justify-end min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Background image
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Initial animation state (slide in from right)
          animate={{ opacity: 1, x: 0 }} // Animate to this state
          transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
          className="text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg mr-12" // Align to the right with margin
        >
          <motion.h2
            initial={{ scale: 0.8 }} // Initial scale
            animate={{ scale: 1 }} // Animate to full scale
            transition={{ delay: 0.3, duration: 0.5 }} // Delayed animation
            className="text-3xl font-semibold mb-6 text-[#14b8a6]"
          >
            Login to Start a New Campaign
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on click
            onClick={() => navigate("/login")}
            className="bg-[#14b8a6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f9c8e] transition duration-300"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // If the user is logged in, show the fundraiser form
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-12 max-w-3xl mx-auto bg-[#f9f7f7] shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#14b8a6]">
        Create Your Fundraiser
      </h2>
      <ToastContainer />

      {/* Beneficiary Type */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Beneficiary Type
          <select
            name="beneficiarytype"
            value={formData.beneficiarytype}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          >
            <option value="">Select Beneficiary Type</option>
            <option value="Myself">Myself</option>
            <option value="Friend">Friend</option>
            <option value="Relative">Relative</option>
          </select>
        </label>
      </div>

      {/* Individual or Group */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Individual or Group
          <select
            name="individualorgroup"
            value={formData.individualorgroup}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          >
            <option value="">Select Individual or Group</option>
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
        </label>
      </div>

      {/* Cause Type */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Cause Type
          <select
            name="causetype"
            value={formData.causetype}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          >
            <option value="">Select Cause Type</option>
            <option value="Medical">Medical</option>
            <option value="Education">Education</option>
            <option value="Natural Disaster">Natural Disaster</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      {/* Display Photos */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Display Photos (Upload multiple images includes Profile Photo,Documents)
          <input
            type="file"
            name="displayPhotos"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="block w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6] cursor-pointer"
          />
        </label>

        {/* Preview of selected images */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {formData.displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative w-32 h-32 overflow-hidden rounded-lg"
            >
              <img
                src={URL.createObjectURL(photo)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDeletePhoto(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full focus:outline-none hover:bg-red-600"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Name(Beneficiary)
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Age */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Age
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Gender
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Relationship */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Relationship (Put NA if nothing)
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Residence */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Residence
          <input
            type="text"
            name="residence"
            value={formData.residence}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Mobile Number */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Mobile Number
          <input
            type="text"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Hospital Name */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Hospital Name
          <input
            type="text"
            name="hospitalname"
            value={formData.hospitalname}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* City */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Amount
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Fundraiser Name */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Fundraiser Name
          <input
            type="text"
            name="fundraisername"
            value={formData.fundraisername}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Beneficiary Name */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Beneficiary Name
          <input
            type="text"
            name="beneficiaryname"
            value={formData.beneficiaryname}
            onChange={handleChange}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          />
        </label>
      </div>

      {/* Story */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Tell Your Story
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            required
          ></textarea>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[#14b8a6] text-white p-4 rounded-lg font-semibold hover:bg-[#0f9c8e] transition duration-300"
        >
          Submit Fundraiser
        </button>
      </div>
    </form>
  );
};

export default FundraiserForm;