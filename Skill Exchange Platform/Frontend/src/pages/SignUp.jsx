import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRight, Mail, Lock, User, UserPlus } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res.data.message || "Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h2>
          <p className="text-gray-500">Join our community of skill exchangers</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>
          
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={20} /> Create Account
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
    </div>
    </div>
  );
};

export default Signup;

