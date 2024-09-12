import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: Math.random().toString(), value: task }]);
      setTask('');
    }
  };

  const editTask = (taskKey) => {
    const taskToEdit = tasks.find(task => task.key === taskKey);
    setCurrentTask(taskToEdit);
    setTask(taskToEdit.value);
    setIsEditing(true);
  };

  const updateTask = () => {
    if (task.trim()) {
      setTasks(tasks.map(t => 
        t.key === currentTask.key ? { ...t, value: task } : t
      ));
      setTask('');
      setIsEditing(false);
      setCurrentTask(null);
    }
  };

  const removeTask = (taskKey) => {
    setTasks(tasks.filter(task => task.key !== taskKey));
  };

  const searchTasks = (text) => {
    setSearch(text);
    const filtered = tasks.filter(task => task.value.toLowerCase().includes(text.toLowerCase()));
    setFilteredTasks(filtered);
  };

  const displayedTasks = search ? filteredTasks : tasks;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Today's Task</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search task..."
          value={search}
          onChangeText={searchTasks}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="What task do you want to do?"
        value={task}
        onChangeText={setTask}
        multiline={true} 
        numberOfLines={4}
      />

      <TouchableOpacity 
        style={styles.customButton} 
        onPress={isEditing ? updateTask : addTask}
      >
        <Text style={styles.buttonText}>{isEditing ? "Update Task" : "Add Task"}</Text>
      </TouchableOpacity>

      {displayedTasks.length === 0 && search ? (
        <Text style={styles.noTaskText}>No matching task found.</Text>
      ) : (
        <FlatList
          data={displayedTasks}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <Text style={styles.taskText}>{item.value}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => editTask(item.key)}>
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTask(item.key)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderColor: '#007BFF',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  input: {
    borderColor: '#007BFF',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  customButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#b3d7ff',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  edit: {
    color: 'blue',
    marginRight: 10,
    padding: 10,
    fontSize: 18,
  },
  delete: {
    color: 'red',
    fontSize: 18,
  },
  noTaskText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});