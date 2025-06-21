import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../context/TaskContext';

const { FiPlus, FiFlag } = FiIcons;

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const { addTask } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim(), priority);
      setText('');
      setPriority('medium');
    }
  };

  const priorityColors = {
    high: 'text-red-500 border-red-200',
    medium: 'text-yellow-500 border-yellow-200',
    low: 'text-green-500 border-green-200'
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`px-4 py-4 border-2 rounded-xl focus:outline-none transition-colors duration-300 ${priorityColors[priority]}`}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <motion.button
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiPlus} className="text-xl" />
            Add Task
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default TaskInput;