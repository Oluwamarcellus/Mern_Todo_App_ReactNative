import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useState } from "react";

import useThemedColor from "../Hooks/useThemedColor";
import { toggleTodoCompletion, deleteTodo, updateTodo } from "../lib/appwrite";

const TodoCard = ({ todo, setTodos }) => {
  const [Colors] = useThemedColor();
  const [editingId, setEditingId] = useState("");
  const [newTitle, setNewTitle] = useState(todo.title);

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

  //Handle todo edit
  const handleEdit = async () => {
    if (newTitle.trim() === todo.title.trim() || !newTitle.trim()) {
      setEditingId("");
      return;
    }
    try {
      const res = await updateTodo(todo.$id, newTitle);
      setTodos((prev) => prev.map((p) => (p.$id === todo.$id ? res : p)));
      setEditingId("");
    } catch (error) {
      Alert.alert("Error", "Failed to edit todo");
      console.error("Error editing todo:", error);
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
          flex: 1,
        }}
      >
        {editingId === todo.$id ? (
          <>
            <View
              style={[
                styles.editContainer,
                {
                  borderColor: Colors.primary,
                  backgroundColor: Colors.bgPrimary,
                },
              ]}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: Colors.textPrimary,
                  padding: 15,
                  fontSize: 18,
                }}
                value={newTitle}
                onChangeText={setNewTitle}
                onSubmitEditing={handleEdit}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 15,
              }}
            >
              <TouchableOpacity onPress={handleEdit}>
                <View
                  style={[
                    styles.editBtn,
                    {
                      backgroundColor: Colors.accent,
                    },
                  ]}
                >
                  <Ionicons name="checkmark" size={15} color={"#F8FAFC"} />
                  <Text
                    style={{
                      color: Colors.textPrimary,
                      fontSize: 16,
                    }}
                  >
                    Save
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditingId("")}>
                <View
                  style={[
                    styles.editBtn,
                    {
                      backgroundColor: Colors.secondary,
                    },
                  ]}
                >
                  <Ionicons name="close" size={15} color={"#F8FAFC"} />
                  <Text
                    style={{
                      color: Colors.textPrimary,
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text
                style={{
                  color: todo.completed
                    ? Colors.textSecondary
                    : Colors.textPrimary,
                  fontSize: 18,
                  textDecorationLine: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Text>
            </View>
            <View style={styles.btnsContainer}>
              <TouchableOpacity onPress={() => setEditingId(todo.$id)}>
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
          </>
        )}
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
  editContainer: {
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
  },
  editBtn: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 2,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
