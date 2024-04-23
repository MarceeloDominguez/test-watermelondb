import Task from "@/model/Task";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  task: Task;
};

export default function TaskListItem({ task }: Props) {
  return (
    <View style={styles.contentTask}>
      <Text numberOfLines={2} style={styles.task}>
        {task.task}
      </Text>
      <Text style={styles.date}>{task.createdAt.toDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTask: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 15,
    borderRadius: 6,
    gap: 5,
  },
  task: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: "700",
  },
});
