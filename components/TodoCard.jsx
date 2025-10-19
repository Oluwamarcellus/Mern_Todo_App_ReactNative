import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import useThemedColor from "../Hooks/useThemedColor";

import { toggleTodoCompletion, deleteTodo } from "../lib/appwrite";

const TodoCard = ({ todo, setTodos }) => {
  const [Colors] = useThemedColor();

  //Toggle todo completion with debounce
  let debounce;
  const handleToggle = async () => {
    try {
      // The debounce logic prevents multiple rapid toggle calls
      // when user taps quickly
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(async () => {
        const res = await toggleTodoCompletion(todo.$id, !todo.completed);
        setTodos((prev) => prev.map((p) => (p.$id === todo.$id ? res : p)));
      }, 500);
    } catch (error) {
      Alert.alert("Error", "Failed to toggle todo completion");
      console.error("Error toggling todo completion:", error);
    }
  };

  // Handle todo deletion
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.$id);
      setTodos((prev) => prev.filter((p) => p.$id !== todo.$id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete todo");
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.surface }]}>
      {/** Completed Indicator */}
      <TouchableOpacity onPress={handleToggle}>
        <View
          style={[
            styles.completedBar,
            { backgroundColor: todo.completed ? Colors.accent : "#334155" },
          ]}
        >
          <Ionicons
            name={todo.completed ? "checkmark" : ""}
            size={15}
            color={Colors.textPrimary}
          />
        </View>
      </TouchableOpacity>

      {/** Todo Title & Actions */}
      <View
        style={{
          gap: 20,
        }}
      >
        <Text>
          <Text
            style={{
              color: todo.completed ? Colors.textSecondary : Colors.textPrimary,
              fontSize: 18,
              textDecorationLine: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
          </Text>
        </Text>
        <View style={styles.btnsContainer}>
          <TouchableOpacity>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor: Colors.secondary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="edit" size={15} color={"#F8FAFC"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor: Colors.delete,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="delete" size={15} color={"#F8FAFC"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 25,
    marginVertical: 12,
    gap: 20,
  },
  completedBar: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
