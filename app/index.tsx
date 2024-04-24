import { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TasksList from "@/components/TasksList";
import database from "../db";
import Task from "@/model/Task";

export default function HomeScreen() {
  const [task, setTask] = useState("");

  const createTask = async () => {
    const tasksCollection = database.get<Task>("tasks");

    if (!task) return;

    await database.write(async () => {
      await tasksCollection.create((t) => {
        t.task = task;
      });
    });

    setTask("");
  };

  const onTest = async () => {
    const tasksCollection = database.get<Task>("tasks");

    await database.write(async () => {
      const tasks = await tasksCollection.query().fetch();
      const task = tasks[0];
      task.update((updatedTask) => {
        updatedTask.task = "Tarea actualiza";
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TasksList />
      <View style={styles.containerInputButton}>
        <TextInput
          placeholder="Add a task..."
          style={styles.input}
          value={task}
          onChangeText={setTask}
        />
        <Pressable style={styles.button} onPress={createTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>

        <Button title="Test update" onPress={onTest} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e4e4",
    paddingTop: 45,
  },
  containerInputButton: {
    padding: 10,
  },
  input: {
    backgroundColor: "#ccc",
    borderRadius: 6,
    marginVertical: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF5733",
    marginVertical: 5,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
