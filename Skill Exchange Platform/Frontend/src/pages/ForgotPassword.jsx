import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Handle email submission to send OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending the email as a JSON body
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message); // Show success message
        setIsOtpSent(true); // Set OTP sent to true
      } else {
        toast.error(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Error sending OTP");
    }
  };

  // Handle OTP submission
  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     toast.error(`Invalid OTP: ${error.response?.data?.message || error.message}`);
  //   }
  // };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email,otp, newPassword });
      toast.success(response.data.message);
      navigate("/login"); // Redirect to login page after successful reset
    } catch (error) {
      toast.error(`Error resetting password: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>

        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium">
              Send OTP
            </button>
          </form>
        ) : (
          <div>
            <form >
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                required
              />
            </form>

            {otp && (
              <form onSubmit={handlePasswordReset}>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
