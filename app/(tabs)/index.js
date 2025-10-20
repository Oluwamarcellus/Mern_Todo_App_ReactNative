import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoCard from "../../components/TodoCard";
import { addTodo, getTodos } from "../../lib/appwrite";
import useThemedColor from "./../../Hooks/useThemedColor";

export default function Index() {
  const [Colors] = useThemedColor();
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoCompleted, setTodoCompleted] = useState(0);

  /** TODO Header Metrics */
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const completionPercentage =
    totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  /** Handles Todo Add */
  const TodoAdd = async () => {
    Keyboard.dismiss();
    if (!title.trim()) {
      Alert.alert("Error", "Todo title cannot be empty");
    } else {
      try {
        const res = await addTodo(title);
        setTitle("");
        setTodos((prev) => [res, ...prev]);
      } catch (error) {
        Alert.alert("Error", "Failed to add todo");
        console.error("Error adding todo:", error);
      }
    }
  };

  useEffect(() => {
    // Fetch todos from database when component mounts
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        setTodos(res);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.bgPrimary, Colors.bgSecondary]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
        {/** HEADER SECTION */}
        <View style={styles.headerContainer}>
          {/** HEADER TITLE */}
          <View style={styles.header}>
            <View
              style={[styles.headerIcon, { backgroundColor: Colors.primary }]}
            >
              <Ionicons name="flash-outline" size={30} color={"#F8FAFC"} />
            </View>
            <View>
              <View style={styles.headerTitleWrapper}>
                <Text
                  style={[styles.headerTitle, { color: Colors.textPrimary }]}
                >
                  Today&apos;s Tasks
                </Text>
                <MaterialIcons
                  name="add-task"
                  color={Colors.textPrimary}
                  size={24}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.headerDescription,
                    { color: Colors.textSecondary },
                  ]}
                >
                  {totalTodos > 0
                    ? `${completedTodos} of ${totalTodos} completed`
                    : "No Tasks"}
                </Text>
              </View>
            </View>
          </View>

          {/** HEADER PROGRESS BAR */}
          <View style={styles.barContainer}>
            <View
              style={[styles.barWrapper, { backgroundColor: Colors.surface }]}
            >
              <View
                style={{
                  backgroundColor: Colors.accent,
                  width: `${completionPercentage}%`,
                  height: "100%",
                  borderRadius: 10,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: Colors.accent,
                  fontSize: 18,
                }}
              >
                {completionPercentage}%
              </Text>
            </View>
          </View>

          {/** HEADER TODO ADD */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputFieldWrapper,
                {
                  borderColor: Colors.outline,
                  backgroundColor: Colors.surface,
                },
              ]}
            >
              <TextInput
                placeholder="What needs to be done?"
                placeholderTextColor={Colors.textSecondary}
                style={[
                  {
                    color: Colors.textPrimary,
                  },
                  styles.inputField,
                ]}
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={TodoAdd}
              />
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={TodoAdd}>
              <View
                style={[
                  styles.inputButtonWrapper,
                  { backgroundColor: Colors.surface },
                ]}
              >
                <Ionicons name="add" size={25} color={Colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/** TODO LIST SECTION */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TodoCard todo={item} setTodos={setTodos} />
          )}
          contentContainerStyle={{
            paddingTop: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    gap: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 30,
  },
  headerDescription: {
    fontSize: 20,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barWrapper: {
    width: "85%",
    height: 13,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  inputFieldWrapper: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 20,
    height: 60,
  },
  inputField: {
    fontSize: 18,
    height: "100%",
    paddingHorizontal: 20,
  },
  inputButtonWrapper: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
