import React from "react";

const FundraiserCards = ({ cards }) => {
  const handleCardClick = (card) => {
    // Navigate to a detailed view page or show a modal with card details
    console.log("Card clicked", card);
    // You can redirect to a detailed page or display a modal here
  };

  return (
    <div className="p-6 md:p-12">
      <h2 className="text-2xl font-semibold mb-6">Fundraiser Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg bg-white overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(card)} // Make the card clickable
          >
            {/* Display Images Side by Side */}
            <div className="flex">
              <img
                src={card.images?.[0] || "https://via.placeholder.com/150"}
                alt="Before"
                className="w-1/2 h-32 object-cover"
              />
              <img
                src={card.images?.[1] || "https://via.placeholder.com/150"}
                alt="After"
                className="w-1/2 h-32 object-cover"
              />
            </div>
            {/* Fundraiser Details */}
            <div className="p-4">
              <h3 className="font-bold text-lg">{card.fundraiserName || "No Name"}</h3>
              <p className="text-sm text-gray-600 mb-2">{card.causeType || "No Cause Specified"}</p>
              <p className="text-gray-800 text-sm mb-4">{card.story || "No Story Provided"}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-green-600 text-lg">
                    {card.percentageRaised || 0}%
                  </span>
                  <p className="text-gray-500 text-sm">Raised</p>
                </div>
                <div>
                  <span className="font-bold text-gray-800 text-lg">
                    ${card.amountRaised || 0}
                  </span>
                  <p className="text-gray-500 text-sm">Raised</p>
                </div>
              </div>
            </div>
            {/* Footer Section */}
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600">
                For every ${card.matchAmount || 100} you donate, {card.matchingPlatform || "Milaap"} will contribute ${card.matchContribution || 8} on your behalf.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundraiserCards;
