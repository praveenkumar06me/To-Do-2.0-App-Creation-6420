import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiList, FiCheck, FiClock } = FiIcons;

const FilterTabs = ({ filter, onFilterChange }) => {
  const tabs = [
    { id: 'all', label: 'All Tasks', icon: FiList },
    { id: 'pending', label: 'Pending', icon: FiClock },
    { id: 'completed', label: 'Completed', icon: FiCheck }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
            filter === tab.id
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={tab.icon} className="text-lg" />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterTabs;