import React, { useState, useEffect } from "react";

const EditProfile = () => {
  // Accordion toggles
  const [showProfileDetails, setShowProfileDetails] = useState(true);
  const [showPANDetails, setShowPANDetails] = useState(false);

  // Profile data
  const [user, setUser] = useState(null);

  // Avatar upload & preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    // ─────────────────────────────────────────────────────────
    // Fetch or load user data here (dummy data for demonstration)
    // ─────────────────────────────────────────────────────────
    const dummyUser = {
      firstName: "anshu",
      lastName: "",
      email: "anshumanpandey84338@gmail.com",
      countryCode: "91",
      phoneNumber: "8433803195",
      avatarUrl: "", // or an image URL if user already has one
      panCardNumber: "",
      panName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    };
    setUser(dummyUser);

    // If there's already an avatarUrl, set it as preview
    // setPreviewUrl(dummyUser.avatarUrl);
  }, []);

  // Toggle accordions
  const toggleProfileDetails = () => setShowProfileDetails(!showProfileDetails);
  const togglePANDetails = () => setShowPANDetails(!showPANDetails);

  // Handle file selection & preview
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show local preview
    }
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // (Optional) Save profile data (placeholder)
  const handleSave = () => {
    // Example: create FormData to send file + fields to backend
    // const formData = new FormData();
    // formData.append("avatar", selectedFile);
    // formData.append("firstName", user.firstName);
    // ... etc.
    alert("Profile saved (UI only)!");
  };

  if (!user) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {/* Profile details accordion */}
      <div className="border rounded-md mb-4">
        {/* Accordion header */}
        <button
          onClick={toggleProfileDetails}
          className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-semibold flex justify-between items-center"
        >
          <span>Profile details</span>
          <span className="text-2xl font-bold">
            {showProfileDetails ? "-" : "+"}
          </span>
        </button>

        {/* Accordion content */}
        {showProfileDetails && (
          <div className="p-4 space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="border rounded p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="border rounded p-2"
                />
              </div>
            </div>

            {/* Registered Email */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">
                Registered Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* Phone number */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">
                Phone number
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="91"
                  value={user.countryCode}
                  onChange={(e) =>
                    handleInputChange("countryCode", e.target.value)
                  }
                  className="w-16 border rounded-l p-2"
                />
                <input
                  type="text"
                  placeholder="enter"
                  value={user.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="flex-1 border rounded-r p-2"
                />
              </div>
            </div>

            {/* Change Profile Picture */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Change Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <label className="bg-[#B13C4F] text-white px-3 py-2 rounded cursor-pointer">
                  Choose file
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {/* Preview (image or placeholder letter) */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
                    {user.firstName
                      ? user.firstName.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PAN details accordion */}
      <div className="border rounded-md mb-4">
        {/* Accordion header */}
        <button
          onClick={togglePANDetails}
          className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-semibold flex justify-between items-center"
        >
          <span>PAN details</span>
          <span className="text-2xl font-bold">
            {showPANDetails ? "-" : "+"}
          </span>
        </button>

        {/* Accordion content */}
        {showPANDetails && (
          <div className="p-4 space-y-4">
            {/* PAN card number */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">
                PAN card number
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={user.panCardNumber}
                onChange={(e) => handleInputChange("panCardNumber", e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* Name as in PAN */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">
                Name as in PAN
              </label>
              <input
                type="text"
                value={user.panName}
                onChange={(e) => handleInputChange("panName", e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={user.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={user.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={user.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">Country</label>
              <select
                value={user.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Select a country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                {/* Add more countries as needed */}
              </select>
            </div>

            {/* Pincode */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                value={user.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                className="border rounded p-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-[#B13C4F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#9f3445]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
