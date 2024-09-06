import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [layouts, setLayouts] = useState([{ id: 1, task: '' }]);

  const addTask = () => {
    setLayouts([...layouts, { id: layouts.length + 1, task: '' }]);
  };

  const updateTask = (id, text) => {
    setLayouts(layouts.map(layout => layout.id === id ? { ...layout, task: text } : layout));
  };

  const deleteTask = (id) => {
    if (layouts.length === 1) {
      setLayouts([{ id: 1, task: '' }]);
    } else {
      setLayouts(layouts.filter(layout => layout.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>YOUR TODAY'S TASK</Text>
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={styles.scrollView}>

        {layouts.map(layout => (
          <View key={layout.id} style={styles.wrapBox}>
            <View style={styles.wrapButton}>
              <View style={styles.button}>
                <Button title="ADD" onPress={addTask} color="rgb(255, 186, 186)" />
              </View>
              <View style={styles.button}>
                <Button title="DEL" onPress={() => deleteTask(layout.id)} color="rgb(255, 186, 186)" />
              </View>
            </View>

            <View style={styles.wrapTextInput}>
              <TextInput style={styles.input} placeholder='What task do you want to do?' value={layout.task} onChangeText={(text)  => updateTask(layout.id, text)} multiline={true} numberOfLines={4} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },

  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  wrapBox: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgb(255, 217, 217)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },

  wrapButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  button: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },

  wrapTextInput: {
    marginTop: 10,
    width: '100%',
  },
  
  input: {
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    
  },
});
