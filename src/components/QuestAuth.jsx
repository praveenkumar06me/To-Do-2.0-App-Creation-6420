import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../context/TaskContext';
import { questConfig } from '../config/questConfig';

const { FiCheckSquare, FiStar, FiUser, FiMail, FiLogIn } = FiIcons;

const QuestAuth = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { setQuestUser, error } = useTask();

  const handleQuestLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;

    setLoading(true);
    
    try {
      // Simulate Quest user data structure
      const questUserData = {
        id: `quest-${Date.now()}`,
        userId: `quest-${Date.now()}`,
        username: username.trim(),
        email: email.trim(),
        name: username.trim(),
        loginMethod: 'quest',
        createdAt: new Date().toISOString()
      };

      // Set Quest user in context
      setQuestUser(questUserData);
      
      // Optional: You can make an API call to Quest here if needed
      console.log('Quest Login Success:', questUserData);
      
    } catch (error) {
      console.error('Quest login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-2xl w-16 h-16 mx-auto mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiCheckSquare} className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome to To Do 2.0
          </h1>
          <p className="text-gray-600">
            Your modern task management experience
          </p>
          <motion.div
            className="mt-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <SafeIcon icon={FiStar} className="text-yellow-500 text-2xl" />
          </motion.div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Quest Login Form */}
        <form onSubmit={handleQuestLogin} className="space-y-6">
          <div className="relative">
            <SafeIcon 
              icon={FiUser} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          <div className="relative">
            <SafeIcon 
              icon={FiMail} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading || !username.trim() || !email.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg disabled:opacity-50"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <SafeIcon icon={FiLogIn} className="text-xl" />
                Get Started with Quest
              </>
            )}
          </motion.button>
        </form>

        {/* Quest Integration Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Powered by QuestLabs
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-purple-600">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <span>Quest ID: {questConfig.USER_ID.slice(-12)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestAuth;