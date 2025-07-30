import { Mail } from 'lucide-react';

export default function ForgotPassword({ onSubmit }) {
  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-red-500/20">
      <div className="text-center mb-6 md:mb-8">
        <div className="bg-red-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Forgot Password</h2>
        <p className="text-sm sm:text-base text-gray-400">Enter your email to reset your password</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
        <div className="group">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500/60 group-focus-within:text-red-500 transition-colors duration-200" size={20} />
            <input
              type="email"
              className="w-full bg-black/50 border border-red-500/20 rounded-lg px-10 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-200"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}