import Task from "@/model/Task";
import { View, Text, StyleSheet } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { AntDesign } from "@expo/vector-icons";
import database from "@/db";

type Props = {
  task: Task;
};

function TaskListItem({ task }: Props) {
  const onDelete = async () => {
    await database.write(async () => {
      await task.markAsDeleted();
    });
  };

  return (
    <View style={styles.contentTask}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={styles.task}>
          {task.task}
        </Text>
        <Text style={styles.date}>{task.createdAt.toDateString()}</Text>
      </View>
      {/* <AntDesign name="edit" size={18} color="gray" /> */}
      <AntDesign name="delete" size={18} color="gray" onPress={onDelete} />
    </View>
  );
}

const enhance = withObservables(["task"], ({ task }: Props) => ({
  //task,
  task: task.observe(),
}));

const EnhanceTaskListItem = enhance(TaskListItem);
export default EnhanceTaskListItem;

const styles = StyleSheet.create({
  contentTask: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 15,
    borderRadius: 6,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    fontWeight: "700",
    color: "gray",
  },
});
