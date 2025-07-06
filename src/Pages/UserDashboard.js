import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  // Dummy data for preview
  const dummyUser = {
    name: "Anshu Pandey",
    latestContribution: "Rs.1000",
    impactAreas: "Health, Education",
    // Withdrawals data
    withdrawals: [
      {
        title: "Support for DV",
        imageText: "Help",
        raised: 3000,
        withdrawal: 1500,
      },
    ],
    // Fundraisers data
    fundraisers: [
      {
        imageText: "Care",
        title: "Fundraiser for Health Checkups",
        slug: "health-checkups-fundraiser",
        raised: 7500,
        goal: 10000,
        daysLeft: 12,
      },
      {
        imageText: "Edu",
        title: "Books for Underprivileged Kids",
        slug: "books-donation-drive",
        raised: 4000,
        goal: 8000,
        daysLeft: 8,
      },
    ],
  };

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("withdrawals");

  useEffect(() => {
    // For preview purposes, using dummy data:
    setUser(dummyUser);
  }, []);

  if (!user) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-600 text-2xl font-bold rounded-full">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user.name}'s Dashboard</h1>
            <p className="text-gray-600">
              Latest Contribution: {user.latestContribution || "None"}
            </p>
            <p className="text-gray-600">
              Impact Areas: {user.impactAreas || "None"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b flex space-x-6 text-lg">
        <button
          onClick={() => setActiveTab("withdrawals")}
          className={`pb-2 font-semibold ${
            activeTab === "withdrawals"
              ? "border-b-2 border-black text-red-600"
              : "text-red-600"
          }`}
        >
          My Withdrawals
        </button>
        <button
          onClick={() => setActiveTab("fundraisers")}
          className={`pb-2 font-semibold ${
            activeTab === "fundraisers"
              ? "border-b-2 border-black"
              : "text-gray-700"
          }`}
        >
          My Fundraisers
        </button>
      </div>

      {/* Content */}
      {activeTab === "withdrawals" ? (
        <div className="mt-4 bg-white shadow-md p-6 rounded-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-medium">Projects</th>
                <th className="py-2 px-4 border-b font-medium">Raised</th>
                <th className="py-2 px-4 border-b font-medium">Withdrawal</th>
              </tr>
            </thead>
            <tbody>
              {user.withdrawals.length > 0 ? (
                user.withdrawals.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-red-300 flex items-center justify-center rounded-md text-white font-semibold">
                          {item.imageText}
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">Rs.{item.raised}.00</td>
                    <td className="py-2 px-4 border-b">
                      Rs.{item.withdrawal}.00
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">
                    No withdrawals yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 bg-white shadow-md p-6 rounded-md">
          {user.fundraisers.length > 0 ? (
            user.fundraisers.map((fundraiser, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <div className="w-24 h-24 bg-red-300 flex items-center justify-center rounded-md text-white font-semibold">
                  {fundraiser.imageText}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{fundraiser.title}</h2>
                  <p className="text-gray-500">{fundraiser.slug}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-red-600">Raised: Rs.{fundraiser.raised}</p>
                    <p className="text-gray-600">Goal: Rs.{fundraiser.goal}</p>
                    <p className="text-gray-600">{fundraiser.daysLeft} days to go</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No fundraisers yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
