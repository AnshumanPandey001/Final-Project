import React from "react";
import { Link } from "react-router-dom";

const FundraiserCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {cards.map((card, index) => (
        <Link
          to={`/fundraiser-details/${index}`} // Routes to details page
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative">
            {/* Display image(s) */}
            {card.displayPhotos.length > 0 ? (
              <img
                src={URL.createObjectURL(card.displayPhotos[0])}
                alt="Fundraiser"
                className="w-full h-64 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-xl">
                <span className="text-white font-semibold">No Image</span>
              </div>
            )}

            {/* Overlay with amount to raise */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-semibold text-lg truncate">{card.fundraiserName}</h3>
              <p className="text-white text-sm mt-1">{card.causeType}</p>
              <p className="text-white text-lg mt-2 font-bold">${card.amount}</p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 bg-white rounded-b-xl">
            <h3 className="font-bold text-xl text-[#14b8a6]">{card.name}</h3>
            <p className="text-gray-600 mt-2 text-sm">{card.story.slice(0, 100)}...</p>
            <p className="text-gray-500 text-sm mt-2">{card.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FundraiserCards;
