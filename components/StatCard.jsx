import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useThemedColor } from "../context/ThemeContest";

const StatCard = ({ accent, name, val, title }) => {
  const { Colors } = useThemedColor();
  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: Colors.bgPrimary, borderLeftColor: accent },
      ]}
    >
      <View style={[styles.cardIconContainer, { backgroundColor: accent }]}>
        <Ionicons name={name} size={20} color={"#fff"} />
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ color: Colors.textPrimary, fontSize: 35 }}>{val}</Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderLeftWidth: 4,
  },
  cardIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
