import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemedColor from "./../../Hooks/useThemedColor";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { addTodo } from "../../lib/appwrite";
import { useState } from "react";

export default function Index() {
  const [Colors] = useThemedColor();
  const [title, setTitle] = useState("");

  /** Handles Todo Add */
  const TodoAdd = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Todo title cannot be empty");
    } else {
      try {
        await addTodo(title);
        setTitle("");
        Alert.alert("Success", "Todo added successfully");
      } catch (error) {
        Alert.alert("Error", "Failed to add todo");
        console.error("Error adding todo:", error);
      }
    }
  };

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
              <Ionicons
                name="flash-outline"
                size={30}
                color={Colors.textPrimary}
              />
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
                  2 of 7 completed
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
                  width: "29%",
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
                29%
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
