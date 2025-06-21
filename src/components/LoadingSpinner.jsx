import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLoader } = FiIcons;

const LoadingSpinner = ({ message = 'Loading your tasks...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-2xl mb-4 inline-block"
        >
          <SafeIcon icon={FiLoader} className="text-white text-4xl" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">To Do 2.0</h2>
        <p className="text-gray-500">{message}</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;