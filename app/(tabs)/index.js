import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemedColor from "./../../Hooks/useThemedColor";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [Colors] = useThemedColor();

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
              <Ionicons name="flash-outline" size={30} color={"#9ab6c7ff"} />
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
});
