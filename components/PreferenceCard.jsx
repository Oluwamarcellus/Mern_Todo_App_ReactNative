import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useThemedColor } from "../context/ThemeContest";

const PreferenceCard = ({ title, name, accent, switching }) => {
  const { Colors } = useThemedColor();

  let switchVal = false;
  let switchFn = () => {};

  if (switching) switchVal = switching.value;
  if (switching) switchFn = switching.fn;
  return (
    <View style={styles.container}>
      <View style={styles.iconTextContainer}>
        <View style={[styles.iconWrapper, { backgroundColor: accent }]}>
          <Ionicons name={name} color="#fff" size={16} />
        </View>

        <Text style={{ color: Colors.textPrimary, fontSize: 20 }}>{title}</Text>
      </View>
      <Switch
        value={switchVal}
        onValueChange={switchFn}
        trackColor={{ true: accent }}
      />
    </View>
  );
};

export default PreferenceCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTextContainer: {
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
