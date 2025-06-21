import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { questConfig } from '../config/questConfig';
import { useTask } from '../context/TaskContext';

const { FiMessageSquare, FiX } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useTask();

  // Only show feedback button for authenticated users
  if (!user) return null;

  // Generate unique user ID based on authenticated user
  const uniqueUserId = user?.id || questConfig.USER_ID;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Share your feedback"
        >
          <SafeIcon 
            icon={FiMessageSquare} 
            className="text-xl group-hover:rotate-12 transition-transform duration-300" 
          />
        </motion.button>
        
        {/* Tooltip */}
        <motion.div
          className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          Share Feedback
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </motion.div>
      </motion.div>

      {/* Feedback Workflow Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            
            {/* Modal Container */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SafeIcon icon={FiX} className="text-xl" />
                </button>
                
                {/* Feedback Workflow Component */}
                <div className="p-6">
                  <FeedbackWorkflow
                    uniqueUserId={uniqueUserId}
                    questId={questConfig.QUEST_FEEDBACK_QUESTID}
                    isOpen={isOpen}
                    accent={questConfig.PRIMARY_COLOR}
                    onClose={handleClose}
                    showBackground={false}
                    style={{ 
                      maxHeight: '70vh',
                      overflow: 'auto',
                      background: 'transparent'
                    }}
                  >
                    <FeedbackWorkflow.ThankYou />
                  </FeedbackWorkflow>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackButton;