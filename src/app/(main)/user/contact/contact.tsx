import React from "react";

const dummyData = [
  {
    rank: 1,
    name: "Dr. Peter Attia",
    category: "Medicine",
    trustScore: "94%",
    trend: "up",
    followers: "1.2M+",
    verifiedClaims: 203,
  },
  {
    rank: 2,
    name: "Dr. Rhonda Patrick",
    category: "Nutrition",
    trustScore: "91%",
    trend: "up",
    followers: "960K+",
    verifiedClaims: 156,
  },
  {
    rank: 3,
    name: "Dr. Chris Palmer",
    category: "Mental Health",
    trustScore: "90%",
    trend: "up",
    followers: "180K+",
    verifiedClaims: 76,
  },
  {
    rank: 4,
    name: "Andrew Huberman",
    category: "Neuroscience",
    trustScore: "89%",
    trend: "up",
    followers: "4.2M+",
    verifiedClaims: 127,
  },
  {
    rank: 5,
    name: "Dr. Dominic D’Agostino",
    category: "Nutrition",
    trustScore: "89%",
    trend: "down",
    followers: "290K+",
    verifiedClaims: 112,
  },
  {
    rank: 6,
    name: "Dr. Gabrielle Lyon",
    category: "Medicine",
    trustScore: "88%",
    trend: "up",
    followers: "380K+",
    verifiedClaims: 84,
  },
  {
    rank: 7,
    name: "Dr. David Sinclair",
    category: "Longevity",
    trustScore: "87%",
    trend: "up",
    followers: "1.1M+",
    verifiedClaims: 145,
  },
];

const InfluencerLeaderboard = () => {
  return (
    <div className=" text-black min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Influencer Trust Leaderboard</h1>
      <p className="mb-6 text-gray-400">
        Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency.
        Updated daily using AI-powered analysis.
      </p>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold">1,234</h2>
          <p className="text-gray-400">Active Influencers</p>
        </div>
        <div className="p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold">25,431</h2>
          <p className="text-gray-400">Claims Verified</p>
        </div>
        <div className="p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold">85.7%</h2>
          <p className="text-gray-400">Average Trust Score</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Influencer</th>
              <th className="p-4">Category</th>
              <th className="p-4">Trust Score</th>
              <th className="p-4">Trend</th>
              <th className="p-4">Followers</th>
              <th className="p-4">Verified Claims</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr
                key={index}
                
              >
                <td className="p-4">#{item.rank}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.trustScore}</td>
                <td className="p-4">
                  <span
                    className={`${
                      item.trend === "up"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.trend === "up" ? "⬆" : "⬇"}
                  </span>
                </td>
                <td className="p-4">{item.followers}</td>
                <td className="p-4">{item.verifiedClaims}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfluencerLeaderboard;
