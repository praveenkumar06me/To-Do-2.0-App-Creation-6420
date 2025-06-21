import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../context/TaskContext';
import { format } from 'date-fns';

const { FiCheck, FiEdit2, FiTrash2, FiFlag, FiSave, FiX } = FiIcons;

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toggleTask, deleteTask, editTask, setPriority } = useTask();

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      editTask(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50'
  };

  const priorityIcons = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500'
  };

  return (
    <motion.div
      className={`p-4 rounded-xl border-l-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 ${
        priorityColors[task.priority]
      } ${task.completed ? 'opacity-75' : ''}`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={() => toggleTask(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.completed && <SafeIcon icon={FiCheck} className="text-sm" />}
        </motion.button>

        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
              />
              <motion.button
                onClick={handleEdit}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiSave} />
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiX} />
              </motion.button>
            </div>
          ) : (
            <div>
              <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.text}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiFlag} className={priorityIcons[task.priority]} />
                  <span className="capitalize">{task.priority}</span>
                </div>
                <span>Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}</span>
                {task.completedAt && (
                  <span>Completed: {format(new Date(task.completedAt), 'MMM dd, yyyy')}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-2">
            <select
              value={task.priority}
              onChange={(e) => setPriority(task.id, e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <motion.button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiEdit2} />
            </motion.button>
            
            <motion.button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiTrash2} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskItem;