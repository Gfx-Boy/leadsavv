import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, ChevronRight, Target, Zap } from 'lucide-react';

export function GetStartedPage() {
  const navigate = useNavigate();
  
  const features = [
    { icon: Target, title: 'Lead Tracking', description: 'Track and manage leads effortlessly' },
    { icon: Zap, title: 'Quick Actions', description: 'Streamline your workflow instantly' },
    { icon: Rocket, title: 'Growth Tools', description: 'Scale your business effectively' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl bg-black/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-red-500/20"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-left"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-red-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          >
            <Rocket className="w-8 h-8 text-red-500" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Lead Savvy
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8">
            Your all-in-one solution for managing leads and scaling your business to new heights.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/signup')}
            className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl px-6 py-3 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
          >
            Get Started
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-500/10 rounded-lg p-2">
                  <feature.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}