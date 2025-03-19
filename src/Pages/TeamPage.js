import React from "react";
import introVideo from '../Images/intro-video.mp4';

const teamMembers = [
  { name: "Anshuman Pandey (Frontend)", image: "https://media.licdn.com/dms/image/v2/D4D03AQG1CqAXT22LPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714823551341?e=1745452800&v=beta&t=WVJEq1oW4TkfOE3jclqPXDqElMEmc1uJtnS77cFPJpo" },
  { name: "Anshuman Pandey (Backend)", image: "https://media.licdn.com/dms/image/v2/D4D03AQG1CqAXT22LPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714823551341?e=1745452800&v=beta&t=WVJEq1oW4TkfOE3jclqPXDqElMEmc1uJtnS77cFPJpo" },
  { name: "Anshuman Pandey", image: "https://media.licdn.com/dms/image/v2/D4D03AQG1CqAXT22LPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714823551341?e=1745452800&v=beta&t=WVJEq1oW4TkfOE3jclqPXDqElMEmc1uJtnS77cFPJpo" },
];

const TeamPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl font-bold">Hear it from our team on what Crowdfund means to them.</h2>
      <p className="text-gray-600 mt-2">
        Astrong team of employees who impact lives with the smallest of things we do within the organization.
      </p>

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-xl">
          {/* <div className="md:w-1/2 p-6 flex justify-center"> */}
          <video loop autoPlay className="w-full rounded-lg shadow-lg border border-gray-300">
            <source src={introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* </div> */}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12">Meet our awesome team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full border-4 border-pink-400 object-cover"
            />
            <p className="mt-2 font-medium">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
