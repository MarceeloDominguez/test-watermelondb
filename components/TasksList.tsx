import { View, Text, FlatList, StyleSheet } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import database from "../db";
import Task from "@/model/Task";
import { withObservables } from "@nozbe/watermelondb/react";
import { Q } from "@nozbe/watermelondb";

type Props = {
  tasks: Task[];
};

function TasksList({ tasks }: Props) {
  // const [tasks, setTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const tasksCollection = database.get<Task>("tasks");
  //     const tasks = await tasksCollection.query().fetch();

  //     setTasks(tasks);
  //   };

  //   fetchTasks();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Task</Text>
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <TaskListItem task={item} />}
      />
    </View>
  );
}

const enhance = withObservables([], () => ({
  tasks: database.get<Task>("tasks").query(Q.sortBy("created_at", Q.desc)),
}));

const EnhanceTasksList = enhance(TasksList);
export default EnhanceTasksList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  contentContainerStyle: {
    padding: 10,
  },
});
