import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import StatsPanel from './components/StatsPanel';
import GetStartedQuest from './components/GetStartedQuest';
import HelpHub from './components/HelpHub';
import FeedbackButton from './components/FeedbackButton';
import QuestAuth from './components/QuestAuth';
import LoadingSpinner from './components/LoadingSpinner';
import { TaskProvider, useTask } from './context/TaskContext';
import './App.css';

const AppContent = () => {
  const [filter, setFilter] = useState('all');
  const [showGetStarted, setShowGetStarted] = useState(true);
  const { user, loading, error } = useTask();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <QuestAuth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {showGetStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GetStartedQuest />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <TaskInput />
          <FilterTabs filter={filter} onFilterChange={setFilter} />
          <TaskList filter={filter} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatsPanel />
        </motion.div>
      </div>

      {/* Help Hub - Always rendered for authenticated users */}
      <HelpHub />
      
      {/* Floating Feedback Button - Only visible after login */}
      <FeedbackButton />
    </div>
  );
};

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;