import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemedColor from "../../Hooks/useThemedColor";
import PreferenceCard from "../../components/PreferenceCard";
import StatCard from "../../components/StatCard";
import { getTodos } from "../../lib/appwrite";

export default function Index() {
  const [todoTotal, setTodosTotal] = useState(0);
  const [todoCompleted, setTodoCompleted] = useState(0);
  const [todoActive, setTodoActive] = useState(0);

  const [Colors] = useThemedColor();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Fetch todos from database when component mounts
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
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
  }, [isFocused]);

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
          <View
            style={[styles.statsContainer, { backgroundColor: Colors.surface }]}
          >
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
          <View
            style={[styles.statsContainer, { backgroundColor: Colors.surface }]}
          >
            <Text style={{ color: Colors.textPrimary, fontSize: 28 }}>
              Preferences
            </Text>

            <PreferenceCard
              name={"moon"}
              title={"Dark Mode"}
              accent={Colors.primary}
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
  statsContainer: {
    borderRadius: 20,
    marginTop: 30,
    padding: 25,
    gap: 30,
    paddingBottom: 40,
  },
});
