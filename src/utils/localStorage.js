const STORAGE_KEYS = {
  USER: 'taskTracker_user',
  TASKS: 'taskTracker_tasks'
};

export const saveUserToStorage = (username) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, username);
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const getUserFromStorage = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
  }
};

// Task management
export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const getTasksFromStorage = () => {
  try {
    const tasksJson = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error getting tasks from localStorage:', error);
    return [];
  }
};

export const clearAllStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};