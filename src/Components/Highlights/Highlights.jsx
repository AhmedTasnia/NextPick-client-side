import React from "react";

const Highlights = () => {
  const members = [
    {
      name: "Sarah L.",
      role: "Top Recommender",
      contributions: 45,
      avatar: "https://i.postimg.cc/fyHsDXVZ/shutterstock-648907024.webp",
    },
    {
      name: "James K.",
      role: "Most Queries Posted",
      contributions: 30,
      avatar: "https://i.postimg.cc/x8ZZ6Pkk/ey-Jid-WNr-ZXQi-Oi-Jjb250-ZW50-Lmhzd3-N0-YXRp-Yy5jb20i-LCJr-ZXki-Oi-Jna-WZc-L3-Bs-YXlc-Lz-Bi-N2-Y0-ZTli-LWY1-OWMt-NDAy-NC05-Zj-A2.webp",
    },
    {
      name: "Mina P.",
      role: "Best Rated Recommendations",
      contributions: 25,
      avatar: "https://i.postimg.cc/NF2DjvMM/images-2.jpg",
    },
  ];

  return (
    <section className="bg-[#F7F9FA] dark:bg-[#1e293b] py-16 px-4 md:px-10 noto-serif-Regular">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          data-aos="fade-up"
        >
          🏆 Community Highlights
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Celebrating the members who make NextPick a better place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="rounded-full w-20 h-20 object-cover mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700"
              />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h4>
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">
                {member.role}
              </p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                {member.contributions} Contributions
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
