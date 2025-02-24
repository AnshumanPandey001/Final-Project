import React, { useState } from "react";

const reviews = [
  {
    name: "Riddhi K Shah",
    username: "@RiddhiKShah",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "I've had an incredible experience with Crowdfund as a first-time fundraiser. They have been patient, competent, and efficient. That led me to leave them a tip-amount that someone else would have had to set up a small fundraiser. I believe in this move and I think it's brilliant."
  },
  {
    name: "John Doe",
    username: "@JohnDoe",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "Crowdfund made it super easy for me to raise funds for my project. The platform is user-friendly, and the support team was always there to help. Highly recommend it!"
  },
  {
    name: "John Doe",
    username: "@JohnDoe",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "Crowdfund made it super easy for me to raise funds for my project. The platform is user-friendly, and the support team was always there to help. Highly recommend it!"
  },
  {
    name: "Sophia Patel",
    username: "@SophiaPatel",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "The best crowdfunding platform I have ever used! The features are great, and I was able to reach my goal faster than expected. Will use it again."
  },
  {
    name: "Swet Patel",
    username: "@SophiaPatel",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "The best crowdfunding platform I have ever used! The features are great, and I was able to reach my goal faster than expected. Will use it again."
  },
  {
    name: "Riddhi K Shah",
    username: "@RiddhiKShah",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    review:
      "I've had an incredible experience with Crowdfund as a first-time fundraiser. They have been patient, competent, and efficient. That led me to leave them a tip-amount that someone else would have had to set up a small fundraiser. I believe in this move and I think it's brilliant."
  },
];

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const toggleReviews = () => {
    setShowAllReviews((prevState) => !prevState);
  };

  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        What people are saying about <span className="text-[#1963A0]">Crowdfund</span>
      </h2>
      
      {!showAllReviews ? (
        <div className="flex justify-center items-center">
          <button
            onClick={prevReview}
            className="text-gray-600 hover:text-gray-900 text-lg px-4"
          >
            &larr; Prev
          </button>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-4 flex">
            <div className="w-1/3 flex flex-col items-center">
              <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-20 h-20 rounded-full border-2 border-gray-300"
              />
              <h3 className="mt-2 text-lg font-semibold">{reviews[currentIndex].name}</h3>
              <p className="text-sm text-gray-500">{reviews[currentIndex].username}</p>
            </div>
            <div className="w-2/3 text-left px-4 flex items-center">
              <p className="text-gray-700">{reviews[currentIndex].review}</p>
            </div>
          </div>
          <button
            onClick={nextReview}
            className="text-gray-600 hover:text-gray-900 text-lg px-4"
          >
            Next &rarr;
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md max-w-xs mx-4 my-4 flex flex-col items-center"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full border-2 border-gray-300"
              />
              <h3 className="mt-2 text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.username}</p>
              <p className="text-gray-700 mt-2">{review.review}</p>
            </div>
          ))}
        </div>
      )}
      
      <p
        onClick={toggleReviews}
        className="mt-4 text-blue-600 cursor-pointer hover:underline"
      >
        {showAllReviews ? "Show less reviews" : "See all reviews"}
      </p>
    </section>
  );
};

export default ReviewSection;
