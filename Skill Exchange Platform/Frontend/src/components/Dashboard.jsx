import { useState, useEffect } from "react";
import { BarChart2, MessageSquare, Clock, Star, CheckCircle, TrendingUp } from "lucide-react";

const SkillExchangeDashboard = (prop) => {
  const [stats, setStats] = useState({
    skillsExchanged: 4,
    activeExchanges: prop.requests.length,
    rating: 4.9,
    messages: 0,
    recentActivity: [],
  });

  

  return (
    <div className="bg-gray-50 p-4 pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-gray-600 font-medium text-sm">Skills Exchanged</h2>
              <div className="bg-blue-50 p-2 rounded-md">
                <BarChart2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.skillsExchanged}</h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-gray-600 font-medium text-sm">Active Exchanges</h2>
              <div className="bg-blue-50 p-2 rounded-md">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.activeExchanges}</h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-gray-600 font-medium text-sm">Rating</h2>
              <div className="bg-blue-50 p-2 rounded-md">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.rating}</h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-gray-600 font-medium text-sm">Messages</h2>
              <div className="bg-blue-50 p-2 rounded-md">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.messages}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          {stats.recentActivity.map((activity, index) => (
            <div key={index} className="p-6 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${activity.status === "Completed" ? "bg-green-100" : "bg-yellow-100"}`}>
                  {activity.status === "Completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{activity.title}</h3>
                  <p className="text-gray-500 text-sm">with {activity.partner}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium mr-4 ${activity.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {activity.status}
                </span>
                <span className="text-gray-500 text-sm">{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillExchangeDashboard;