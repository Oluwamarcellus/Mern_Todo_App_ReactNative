import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useThemedColor } from "../context/ThemeContest";

const TodoEmpty = () => {
  const { Colors } = useThemedColor();

  return (
    <View style={[styles.container, { backgroundColor: Colors.surface }]}>
      <MaterialIcons
        name="format-list-bulleted-add"
        size={250}
        color={Colors.textSecondary}
        style={{ opacity: 0.5 }}
      />
      <Text
        style={{
          color: Colors.textSecondary,
          fontSize: 20,
          marginVertical: 20,
        }}
      >
        List is empty!
      </Text>
    </View>
  );
};

export default TodoEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingRight: 35,
    marginTop: 20,
    borderRadius: 15,
  },
});
