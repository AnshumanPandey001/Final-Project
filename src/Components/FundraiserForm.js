import React, { useState } from "react";

const FundraiserCards = () => {
  const [beneficiaryType, setBeneficiaryType] = useState(""); // Myself, Friend, Relative
  const [individualOrGroup, setIndividualOrGroup] = useState(""); // Individual or Group
  const [causeType, setCauseType] = useState(""); // Medical, Education, etc.
  const [formData, setFormData] = useState({
    displayPhoto: null,
    name: "",
    age: "",
    year: "",
    gender: "",
    relationship: "",
    residence: "",
    mobileNumber: "",
    hospitalName: "",
    location: "",
    city: "",
    ailment: "",
    amount: "",
    fundraiserName: "",
    story: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto bg-[#f9f7f7] shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#14b8a6]">Create Your Fundraiser</h2>

      {/* Beneficiary Type */}
      <div className="mb-6">
        <p className="font-semibold text-lg text-[#14b8a6]">This fundraiser will benefit:</p>
        <div className="flex flex-wrap gap-6 mt-4">
          {["Myself", "My Friend", "My Relative"].map((type) => (
            <label key={type} className="flex items-center text-[#4A4A4A] space-x-2">
              <input
                type="radio"
                name="beneficiaryType"
                value={type}
                checked={beneficiaryType === type}
                onChange={(e) => setBeneficiaryType(e.target.value)}
                className="mr-2"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Individual or Group */}
      <div className="mb-6">
        <p className="font-semibold text-lg text-[#14b8a6]">Is this for an individual or a group?</p>
        <div className="flex flex-wrap gap-6 mt-4">
          {["Individual", "Group"].map((option) => (
            <label key={option} className="flex items-center text-[#4A4A4A] space-x-2">
              <input
                type="radio"
                name="individualOrGroup"
                value={option}
                checked={individualOrGroup === option}
                onChange={(e) => setIndividualOrGroup(e.target.value)}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Beneficiary Details */}
      {beneficiaryType === "My Friend" && (
        <div className="mb-6">
          <h3 className="font-bold text-xl text-[#14b8a6] mb-4">Beneficiary Details</h3>
          <label className="block text-[#4A4A4A] mb-2">
            Display Photo
            <input
              type="file"
              name="displayPhoto"
              onChange={handleChange}
              className="block w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Age
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Year
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Gender
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Mobile Number
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
        </div>
      )}

      {beneficiaryType === "My Relative" && (
        <div className="mb-6">
          <h3 className="font-bold text-xl text-[#14b8a6] mb-4">Beneficiary Details</h3>
          <label className="block text-[#4A4A4A] mb-2">
            Display Photo
            <input
              type="file"
              name="displayPhoto"
              onChange={handleChange}
              className="block w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Relationship (e.g., Brother, Sister, etc.)
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Age
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Residence
            <input
              type="text"
              name="residence"
              value={formData.residence}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
          <label className="block text-[#4A4A4A] mb-2">
            Mobile Number
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
            />
          </label>
        </div>
      )}

      {/* Cause Details */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-[#14b8a6] mb-4">Cause Details</h3>
        <label className="block text-[#4A4A4A] mb-2">
          I am raising funds for:
          <select
            name="causeType"
            value={causeType}
            onChange={(e) => setCauseType(e.target.value)}
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
          >
            <option value="">Select Cause</option>
            <option value="Medical">Medical</option>
            <option value="Education">Education</option>
            <option value="Natural Disaster">Natural Disaster</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      {/* Fundraiser Story */}
      <div className="mb-6">
        <label className="block text-[#4A4A4A] mb-2">
          Tell your story:
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-3 border-2 border-[#14b8a6] rounded-lg focus:ring-2 focus:ring-[#14b8a6]"
          ></textarea>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="bg-[#14b8a6] text-white p-4 rounded-lg font-semibold hover:bg-[#0f9c8e]">
          Submit Fundraiser
        </button>
      </div>
    </div>
  );
};

export default FundraiserCards;
