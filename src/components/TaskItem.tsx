import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Task} from '../contexts/AppContextProvider';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  darkMode: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  darkMode,
}) => {
  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.taskContent} onPress={onToggle}>
        <View style={[styles.checkbox, task.completed && styles.checked]} />
        <Text
          style={[
            styles.title,
            task.completed && styles.completedText,
            darkMode && styles.darkText,
          ]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#333',
    borderBottomColor: '#444',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  darkText: {
    color: '#fff',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: '#FF3B30',
  },
});

export default TaskItem;
