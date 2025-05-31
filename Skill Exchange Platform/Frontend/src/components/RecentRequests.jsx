import { Calendar, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecentRequests = ({ requests }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Requests</h2>
            <p className="mt-2 text-xl text-gray-600">
              Browse the latest skill exchange opportunities
            </p>
          </div>
          <Link to="/requests" className="mt-4 md:mt-0 inline-flex items-center text-blue-600 font-medium">
            View all requests <ArrowUpRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.map((request, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                <img src={request.image} alt={request.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(request.difficulty)}`}>
                  {request.difficulty}
                </span>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{request.title}</h3>
                
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Deadline: {request.date.slice(0, 10)}</span>
                </div>
                <div className="mt-4 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {request.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to={`/requests/${index}`} className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors duration-200">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

RecentRequests.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default RecentRequests;
