import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferenceCard from "../../components/PreferenceCard";
import StatCard from "../../components/StatCard";
import { useThemedColor } from "../../context/ThemeContest";
import { useRefetch } from "../../context/TodoContest";
import { useUser } from "../../context/UserContest";
import { getTodos, resetUserTodos } from "../../lib/appwrite";

export default function Index() {
  const [todoTotal, setTodosTotal] = useState(0);
  const [todoCompleted, setTodoCompleted] = useState(0);
  const [todoActive, setTodoActive] = useState(0);

  const { Colors, toggleTheme, theme } = useThemedColor();
  const user = useUser();
  const isFocused = useIsFocused();
  const { setShouldRefetch } = useRefetch();
  const navigation = useNavigation();

  const isDark = theme === "dark";

  const reset = async () => {
    await resetUserTodos(user.$id);
    setShouldRefetch(true);
    navigation.navigate("index");
  };

  const handleReset = async () => {
    if (!user) {
      Alert.alert("Error", "Session Lost");
      return;
    }
    try {
      Alert.alert(
        "EMPTY TODOS",
        "Are you suure you want to remove all todos?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            style: "destructive",
            onPress: reset,
          },
        ]
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    // Fetch todos from database
    const fetchTodos = async () => {
      if (!user) {
        Alert.alert("Error", "Session Lost");
        return;
      }
      try {
        const res = await getTodos(user.$id);
        setTodosTotal(res.length);
        setTodoCompleted(res.filter((todo) => todo.completed).length);
        setTodoActive(res.filter((todo) => !todo.completed).length);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    if (isFocused) {
    }
    fetchTodos();
  }, [isFocused, user]);

  return (
    <LinearGradient
      colors={[Colors.bgPrimary, Colors.bgSecondary]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
        {/** HEADER SECTION */}
        <View style={styles.header}>
          <View
            style={[styles.headerIcon, { backgroundColor: Colors.primary }]}
          >
            <Ionicons name="settings" size={30} color={"#F8FAFC"} />
          </View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "500",
              color: Colors.textPrimary,
            }}
          >
            Settings
          </Text>
        </View>

        {/** SETTINGS STATS */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container, { backgroundColor: Colors.surface }]}>
            <Text style={{ color: Colors.textPrimary, fontSize: 28 }}>
              Progress Stats
            </Text>
            <StatCard
              name={"list"}
              title={"Total Todos"}
              val={todoTotal}
              accent={Colors.primary}
            />
            <StatCard
              name={"checkmark-done-circle-sharp"}
              title={"Completed"}
              val={todoCompleted}
              accent={Colors.accent}
            />
            <StatCard
              name={"alarm"}
              title={"Active"}
              val={todoActive}
              accent={Colors.secondary}
            />
          </View>

          {/** SETTINGS PREFERENCES */}
          <View style={[styles.container, { backgroundColor: Colors.surface }]}>
            <Text style={{ color: Colors.textPrimary, fontSize: 28 }}>
              Preferences
            </Text>

            <PreferenceCard
              name={"moon"}
              title={"Dark Mode"}
              accent={Colors.primary}
              switching={{ value: isDark, fn: toggleTheme }}
            />
            <PreferenceCard
              name={"notifications"}
              title={"Notifications"}
              accent={Colors.secondary}
            />
            <PreferenceCard
              name={"logo-buffer"}
              title={"Todo Persist"}
              accent={Colors.accent}
            />
          </View>

          {/** DELETE ALL TODO */}
          <View style={[styles.container, { backgroundColor: Colors.surface }]}>
            <Text style={{ color: Colors.delete, fontSize: 22 }}>
              Danger Zone
            </Text>

            <TouchableOpacity onPress={handleReset}>
              <View style={styles.resetContainer}>
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: Colors.delete },
                  ]}
                >
                  <Ionicons name="trash-bin" color="#fff" size={16} />
                </View>

                <Text style={{ color: Colors.textPrimary, fontSize: 20 }}>
                  Reset App
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    marginTop: 40,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderRadius: 20,
    marginTop: 30,
    padding: 25,
    gap: 30,
    paddingBottom: 40,
  },

  resetContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
