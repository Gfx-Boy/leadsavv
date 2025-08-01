import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import axios from "axios";

export function UserInfoPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = sessionStorage.getItem("token"); // Get token from sessionStorage
      await axios.put(
        "http://31.97.41.27:5005/api/users/profile",
        { firstName, lastName, purpose },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );

      // Redirect to the dashboard or home page after successful update
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred while updating your profile. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-red-500/20">
      <div className="text-center mb-6 md:mb-8">
        <div className="bg-red-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Welcome to Lead Savvy</h2>
        <p className="text-sm sm:text-base text-gray-400">Tell us a bit about yourself</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="group">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
            placeholder="First Name"
            required
          />
        </div>

        <div className="group">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="group relative">
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200 appearance-none"
            required
          >
            <option value="">Select Purpose</option>
            <option value="sales">Sales Management</option>
            <option value="marketing">Lead Generation</option>
            <option value="crm">Customer Relationship</option>
            <option value="analytics">Business Analytics</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500/60" size={20} />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-200"
        >
          Continue to Dashboard
        </button>

        {error && <p className="text-center text-sm text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}