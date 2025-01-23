import React, {useState, createContext, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types';

type ContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  filter: 'all' | 'completed' | 'pending';
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const AppContext = createContext<ContextType>({
  tasks: [],
  addTask: () => {},
  toggleTask: () => {},
  deleteTask: () => {},
  filter: 'all',
  setFilter: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTasks();
    loadDarkMode();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const loadDarkMode = async () => {
    try {
      const stored = await AsyncStorage.getItem('darkMode');
      if (stored) {
        setDarkMode(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading dark mode:', error);
    }
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task,
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Error saving dark mode:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        filter,
        setFilter,
        darkMode,
        toggleDarkMode,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
