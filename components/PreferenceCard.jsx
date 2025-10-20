import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import useThemedColor from "./../Hooks/useThemedColor";

const PreferenceCard = ({ title, name, accent }) => {
  const [value, setValue] = useState();

  const [Colors] = useThemedColor();
  return (
    <View style={styles.container}>
      <View style={styles.iconTextContainer}>
        <View style={[styles.iconWrapper, { backgroundColor: accent }]}>
          <Ionicons name={name} color="#fff" size={16} />
        </View>

        <Text style={{ color: Colors.textPrimary, fontSize: 20 }}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={setValue}
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
