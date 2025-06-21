import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  loading: true,
  error: null
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [user, setUser] = useState(null);
  const [questUser, setQuestUser] = useState(null);

  useEffect(() => {
    // Check for Quest user in localStorage first
    const savedQuestUser = localStorage.getItem('questUser');
    if (savedQuestUser) {
      try {
        const parsedUser = JSON.parse(savedQuestUser);
        setQuestUser(parsedUser);
        setUser(parsedUser); // Use Quest user as main user
        fetchTasks();
        return;
      } catch (error) {
        console.error('Error parsing saved Quest user:', error);
        localStorage.removeItem('questUser');
      }
    }

    // Get initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchTasks();
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!questUser) { // Only use Supabase auth if no Quest user
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchTasks();
        } else {
          dispatch({ type: 'LOAD_TASKS', payload: [] });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [questUser]);

  const handleSetQuestUser = (userData) => {
    console.log('Setting Quest User:', userData);
    setQuestUser(userData);
    setUser(userData);
    
    // Save to localStorage for persistence
    localStorage.setItem('questUser', JSON.stringify(userData));
    
    // Clear any errors
    dispatch({ type: 'SET_ERROR', payload: null });
    
    // Load tasks after Quest login
    fetchTasks();
  };

  const fetchTasks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data, error } = await supabase
        .from('tasks_todo2024')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match frontend format
      const transformedTasks = data.map(task => ({
        id: task.id,
        text: task.text,
        completed: task.completed,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        completedAt: task.completed_at
      }));

      dispatch({ type: 'LOAD_TASKS', payload: transformedTasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addTask = async (text, priority = 'medium') => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const taskData = {
        text,
        priority,
        user_id: user.id || user.userId || 'quest-user',
        completed: false
      };

      const { data, error } = await supabase
        .from('tasks_todo2024')
        .insert([taskData])
        .select()
        .single();

      if (error) throw error;

      // Transform and add to local state
      const transformedTask = {
        id: data.id,
        text: data.text,
        completed: data.completed,
        priority: data.priority,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        completedAt: data.completed_at
      };

      dispatch({ type: 'ADD_TASK', payload: transformedTask });
    } catch (error) {
      console.error('Error adding task:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const toggleTask = async (id) => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const task = state.tasks.find(t => t.id === id);
      const newCompleted = !task.completed;

      const { data, error } = await supabase
        .from('tasks_todo2024')
        .update({
          completed: newCompleted,
          completed_at: newCompleted ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedTask = {
        id: data.id,
        text: data.text,
        completed: data.completed,
        priority: data.priority,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        completedAt: data.completed_at
      };

      dispatch({ type: 'UPDATE_TASK', payload: transformedTask });
    } catch (error) {
      console.error('Error toggling task:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const deleteTask = async (id) => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const { error } = await supabase
        .from('tasks_todo2024')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      console.error('Error deleting task:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const editTask = async (id, text) => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data, error } = await supabase
        .from('tasks_todo2024')
        .update({ text })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedTask = {
        id: data.id,
        text: data.text,
        completed: data.completed,
        priority: data.priority,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        completedAt: data.completed_at
      };

      dispatch({ type: 'UPDATE_TASK', payload: transformedTask });
    } catch (error) {
      console.error('Error editing task:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const setPriority = async (id, priority) => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data, error } = await supabase
        .from('tasks_todo2024')
        .update({ priority })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedTask = {
        id: data.id,
        text: data.text,
        completed: data.completed,
        priority: data.priority,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        completedAt: data.completed_at
      };

      dispatch({ type: 'UPDATE_TASK', payload: transformedTask });
    } catch (error) {
      console.error('Error updating priority:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Supabase auth methods (kept for backward compatibility)
  const signUp = async (email, password) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing up:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clear Quest user data
      setQuestUser(null);
      localStorage.removeItem('questUser');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      dispatch({ type: 'LOAD_TASKS', payload: [] });
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    user,
    questUser,
    setQuestUser: handleSetQuestUser,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setPriority,
    signUp,
    signIn,
    signOut,
    refetch: fetchTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};