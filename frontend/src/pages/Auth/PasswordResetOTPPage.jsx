import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { KeyRound } from "lucide-react";
import axios from "axios";

export function PasswordResetOTPPage() {
  const [code, setCode] = useState(""); // Verification code
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email; // Get email from the Forgot Password page

  // Debugging: Log the email passed to the Verify page
  useEffect(() => {
    console.log("Email passed to Verify page:", email);
  }, [email]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Please enter the verification code.");
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Debugging: Log the request body
      console.log("Request body:", { email, verificationCode: code });

      const response = await axios.post("https://api.leadsavvyai.com/api/verify-code", {
        email: email, // Ensure this is not undefined
        verificationCode: code, // Ensure this matches the backend field name
      });

      setMessage(response.data.message);
      setError("");
      setLoading(false);

      // Redirect to reset password page with email
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Error verifying code:", error);
      setError(error.response?.data?.message || "Invalid or expired verification code.");
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-red-500/20">
      <div className="text-center mb-6 md:mb-8">
        <div className="bg-red-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <KeyRound className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Enter Reset Code</h2>
        <p className="text-sm sm:text-base text-gray-400">
          Enter the code sent to <span className="text-red-500">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerifyCode} className="space-y-4 sm:space-y-6">
        <div className="group">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200 text-center text-xl sm:text-2xl tracking-wider"
            placeholder="Enter OTP"
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

        {message && <p className="text-center text-sm text-green-500 mt-2">{message}</p>}
        {error && <p className="text-center text-sm text-red-500 mt-2">{error}</p>}

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-200"
            >
              Resend
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}