import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import useThemedColor from "../../Hooks/useThemedColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [Colors] = useThemedColor();
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

        {/** SETTINGS SECTION */}
        <View style={[styles.settingsContainer, { marginTop: 50 }]}></View>
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
});
