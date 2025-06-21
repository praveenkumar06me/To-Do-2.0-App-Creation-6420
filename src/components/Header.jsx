import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../context/TaskContext';

const { FiCheckSquare, FiStar, FiLogOut, FiUser, FiTarget } = FiIcons;

const Header = () => {
  const { user, questUser, signOut } = useTask();
  const [showGetStartedToggle, setShowGetStartedToggle] = useState(false);

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut();
    }
  };

  const displayUser = questUser || user;
  const userDisplayName = displayUser?.email || displayUser?.name || displayUser?.username || 'Quest User';

  return (
    <motion.div
      className="text-center mb-8"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-2xl mr-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiCheckSquare} className="text-white text-3xl" />
          </motion.div>
          <div className="text-left">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              To Do 2.0
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Organize your life with style and efficiency
            </p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowGetStartedToggle(!showGetStartedToggle)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle Get Started Guide"
            >
              <SafeIcon icon={FiTarget} />
              <span className="hidden sm:inline">Guide</span>
            </motion.button>

            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">Welcome back</p>
              <p className="font-medium text-gray-700">{userDisplayName}</p>
              {questUser && (
                <p className="text-xs text-purple-600">Quest User</p>
              )}
            </div>

            <motion.button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiLogOut} />
              <span className="hidden sm:inline">Sign Out</span>
            </motion.button>
          </div>
        )}

        <motion.div
          className="ml-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <SafeIcon icon={FiStar} className="text-yellow-500 text-2xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;