import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FundraiserCards = ({ cards }) => {
  const [imageIndices, setImageIndices] = useState([]);

  useEffect(() => {
    if (!cards.length) return; // Prevent running if no cards are available

    // Initialize indices to 0 for each card
    setImageIndices(cards.map(() => 0));

    const intervals = cards.map((card, index) => {
      if (card.displayPhotos.length > 1) {
        return setInterval(() => {
          setImageIndices((prev) => {
            const newIndices = [...prev];
            newIndices[index] = (newIndices[index] + 1) % card.displayPhotos.length;
            return newIndices;
          });
        }, 2000);
      }
      return null;
    });

    return () => {
      intervals.forEach((id) => id && clearInterval(id));
    };
  }, [cards]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {cards.map((card, index) => (
        <Link
          to={`/fundraiser-details/${card.id || index}`}
          key={card.id || index}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative">
            {/* Ensure images exist before rendering */}
            {card.displayPhotos.length > 0 && imageIndices.length > index ? (
              <img
                src={typeof card.displayPhotos[imageIndices[index]] === "string" 
                  ? card.displayPhotos[imageIndices[index]] 
                  : URL.createObjectURL(card.displayPhotos[imageIndices[index]])} 
                alt="Fundraiser"
                className="w-full h-64 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-xl">
                <span className="text-white font-semibold">No Image</span>
              </div>
            )}

            {/* Overlay with fundraiser details */}
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
