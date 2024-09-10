import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Today's Task</Text>
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
      <FlatList
        data={tasks}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: 'black',
    marginBottom: -15,
    padding: 5,
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
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
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
  },
  delete: {
    color: 'red',
  },
});
