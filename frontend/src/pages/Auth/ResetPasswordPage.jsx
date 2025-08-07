import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import axios from "axios";

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email from the previous page (PasswordResetOTPPage)
  const email = location.state?.email;

  // Check if the email is being passed correctly
  if (!email) {
    console.error("Email is missing. Ensure it is passed from the previous page.");
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post("https://api.leadsavvyai.com/api/reset-password", {
        email,
        newPassword,
      });
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful reset
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to reset password. Please try again.");
      setMessage("");
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-red-500/20">
      <div className="text-center mb-6 md:mb-8">
        <div className="bg-red-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Reset Password</h2>
        <p className="text-sm sm:text-base text-gray-400">Enter your new password</p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6">
        <div className="group">
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500/60 group-focus-within:text-red-500 transition-colors duration-200"
              size={20}
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black/50 border border-red-500/20 rounded-lg px-10 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
              placeholder="New password"
              required
            />
          </div>
        </div>

        <div className="group">
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500/60 group-focus-within:text-red-500 transition-colors duration-200"
              size={20}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black/50 border border-red-500/20 rounded-lg px-10 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
              placeholder="Confirm new password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p className="text-center text-sm text-green-500 mt-2">{message}</p>}
        {error && <p className="text-center text-sm text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}