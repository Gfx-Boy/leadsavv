import { useState } from "react";
import { Mail, Lock, UserPlus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noEmails, setNoEmails] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading to true when signup starts
    try {
      const response = await axios.post("https://api.leadsavvyai.com/api/signup", {
        email,
        username,
        password,
        noEmails,
      });
      console.log(response.data);
      setMessage("Signup successful! Please check your email for the verification code.");
      // Delay before redirecting to verification page
      setTimeout(() => {
        navigate("/verify", { state: { email } });
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error("There was an error signing up!", error);
      // Display the error message from the server response
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Use the server-provided error message
      } else {
        setMessage("An unexpected error occurred. Please try again."); // Fallback message
      }
    } finally {
      setLoading(false); // Set loading to false when signup is complete
    }
  };

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-red-500/20 transform hover:scale-[1.01] transition-all duration-300">
      <div className="text-center mb-6 md:mb-8">
        <div className="bg-red-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 transform hover:rotate-12 transition-transform duration-300">
          <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Create Account</h2>
        <p className="text-sm sm:text-base text-gray-400">Join Lead Savvy today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="group">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500/60 group-focus-within:text-red-500 transition-colors duration-200"
              size={20}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-red-500/20 rounded-lg px-10 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
              placeholder="Email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-red-500/20 rounded-lg px-10 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
              placeholder="Password"
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
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-200"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}