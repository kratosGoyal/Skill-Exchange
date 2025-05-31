import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
            Swap Skills, <span className="text-blue-400">Learn & Thrive</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl">
            Become a part of a network where professionals exchange expertise instead of currency. 
            Gain new abilities and form valuable relationships.
          </p>
          
          <div className="mt-10 w-full max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Find skills or services..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-4 py-4 border-0 rounded-xl bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 placeholder-blue-200/70 text-white shadow-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-lg shadow-lg bg-white text-blue-900 hover:bg-blue-50 transition-colors">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/skillExchange" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors">
              Explore Skills
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">1,000+</p>
              <p className="text-blue-200 mt-1">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">750+</p>
              <p className="text-blue-200 mt-1">Skill Trades</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-blue-200 mt-1">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4.9/5</p>
              <p className="text-blue-200 mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
