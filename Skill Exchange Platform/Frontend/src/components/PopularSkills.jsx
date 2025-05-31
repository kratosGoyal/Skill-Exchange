import { Code, Brush, TrendingUp, Users, Star, ArrowUpRight, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const skillIcons = {
  "Web Development": <Code className="w-6 h-6" />, 
  "Graphic Design": <Brush className="w-6 h-6" />, 
  "Digital Marketing": <TrendingUp className="w-6 h-6" />,
  "Content Writing": <Pencil className="w-6 h-6" />,
};

const skillColors = {
  "Web Development": { bg: "from-blue-500 to-indigo-600", text: "text-blue-600" },
  "Graphic Design": { bg: "from-purple-500 to-pink-600", text: "text-purple-600" },
  "Digital Marketing": { bg: "from-green-500 to-teal-600", text: "text-green-600" },
  "Content Writing": { bg: "from-yellow-500 to-orange-600", text: "text-yellow-600" },
};

const PopularSkills = ({ skills }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Popular Skills</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after skills in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${skillColors[skill.skill]?.bg || "from-gray-400 to-gray-600"}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${skillColors[skill.skill]?.text || "text-gray-600"} bg-gray-100`}>
                    {skillIcons[skill.skill] || <Code className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#facc15" />
                    <span className="font-semibold">{skill.count}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{skill.skill}</h3>
                <p className="text-gray-600 mb-4">{skill.count} requests</p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
              
              <div className="absolute bottom-6 right-6">
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/skills" className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors duration-200">
            View All Skills
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

PopularSkills.propTypes = {
  skills: PropTypes.array.isRequired,
};

export default PopularSkills;
