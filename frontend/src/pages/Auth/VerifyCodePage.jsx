import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import axios from "axios";

export function VerifyCodePage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // Message with type (success or error)
  const [loading, setLoading] = useState(false); // Track loading state
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Retrieve email from location state

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when verification starts
    try {
      const response = await axios.post("https://api.leadsavvyai.com/api/verify-email", {
        email,
        verificationCode,
      });
      console.log(response.data);
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      setMessage({ text: "Email verified successfully!", type: "success" }); // Success message
      // Delay before redirecting to the welcome page
      setTimeout(() => {
        navigate("/welcome");
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error("There was an error verifying the email!", error);
      setMessage({ text: "Invalid verification code. Please try again.", type: "error" }); // Error message
    } finally {
      setLoading(false); // Set loading to false when verification is complete
    }
  };

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-red-500/20">
      <div className="text-center mb-6 md:mb-8">
        <div className="bg-red-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <KeyRound className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Verify Email</h2>
        <p className="text-sm sm:text-base text-gray-400">
          Enter the verification code sent to <span className="text-white font-semibold">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4 sm:space-y-6">
        <div className="group">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200 text-center text-xl sm:text-2xl tracking-wider"
            placeholder="Enter code"
            maxLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        {message.text && (
          <p
            className={`text-center text-sm mt-2 ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}